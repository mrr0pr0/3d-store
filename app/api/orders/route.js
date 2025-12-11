import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('user_id');

    if (!userId) {
      return NextResponse.json(
        { error: 'user_id is required' },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from('app_cbdf7_orders')
      .select(`
        *,
        order_items:app_cbdf7_order_items(
          *,
          product:app_cbdf7_products(*)
        )
      `)
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching orders:', error);
      return NextResponse.json(
        { error: 'Failed to fetch orders' },
        { status: 500 }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { user_id, items, shipping_address, payment_method } = body;

    if (!user_id || !items || items.length === 0) {
      return NextResponse.json(
        { error: 'Missing required fields: user_id, items' },
        { status: 400 }
      );
    }

    // Calculate total amount
    const total_amount = items.reduce((sum, item) => sum + (item.unit_price * item.quantity), 0);

    // Create order
    const { data: orderData, error: orderError } = await supabase
      .from('app_cbdf7_orders')
      .insert([
        {
          user_id,
          total_amount,
          shipping_address,
          payment_method,
          status: 'pending',
          payment_status: 'unpaid',
        },
      ])
      .select()
      .single();

    if (orderError) {
      console.error('Error creating order:', orderError);
      return NextResponse.json(
        { error: 'Failed to create order' },
        { status: 500 }
      );
    }

    // Create order items
    const orderItems = items.map((item) => ({
      order_id: orderData.id,
      product_id: item.product_id,
      quantity: item.quantity,
      unit_price: item.unit_price,
      subtotal: item.unit_price * item.quantity,
    }));

    const { error: itemsError } = await supabase
      .from('app_cbdf7_order_items')
      .insert(orderItems);

    if (itemsError) {
      console.error('Error creating order items:', itemsError);
      // Rollback order creation
      await supabase.from('app_cbdf7_orders').delete().eq('id', orderData.id);
      return NextResponse.json(
        { error: 'Failed to create order items' },
        { status: 500 }
      );
    }

    return NextResponse.json(orderData, { status: 201 });
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}