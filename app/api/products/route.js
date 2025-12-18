import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';

export async function GET(request) {
  try {
    const { data, error } = await supabase
      .from('app_cbdf7_products')
      .select('*');

    if (error) {
      console.error('Error fetching products:', error);
      return NextResponse.json(
        { error: 'Failed to fetch products' },
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
    const { name, description, price, model_url, thumbnail_url, category, stock_quantity } = body;

    if (!name || !price || !model_url) {
      return NextResponse.json(
        { error: 'Missing required fields: name, price, model_url' },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from('app_cbdf7_products')
      .insert([
        {
          name,
          description,
          price,
          model_url,
          thumbnail_url,
          category,
          stock_quantity: stock_quantity || 0,
        },
      ])
      .select();

    if (error) {
      console.error('Error creating product:', error);
      return NextResponse.json(
        { error: 'Failed to create product' },
        { status: 500 }
      );
    }

    return NextResponse.json(data[0], { status: 201 });
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}