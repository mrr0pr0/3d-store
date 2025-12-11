'use client';

import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import CartItem from '@/components/CartItem';

export default function CartPage() {
  const { cart, getTotal, clearCart } = useCart();
  const total = getTotal();

  if (cart.length === 0) {
    return (
      <div className="space-y-8">
        <h1 className="text-4xl font-extrabold tracking-tight text-foreground">
          Shopping Cart
        </h1>
        <div className="text-center py-12 bg-card border border-border rounded-lg">
          <p className="text-muted-foreground text-lg mb-4">
            Your cart is empty
          </p>
          <Link
            href="/shop"
            className="inline-block bg-primary text-primary-foreground px-6 py-3 rounded-md hover:bg-primary/90 transition-colors font-medium"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-4xl font-extrabold tracking-tight text-foreground">
          Shopping Cart
        </h1>
        <button
          onClick={clearCart}
          className="text-sm text-destructive hover:underline"
        >
          Clear Cart
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {cart.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-card border border-border rounded-lg p-6 sticky top-20">
            <h2 className="text-xl font-bold text-foreground mb-4">
              Order Summary
            </h2>
            
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-muted-foreground">
                <span>Subtotal</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Shipping</span>
                <span>Calculated at checkout</span>
              </div>
              <div className="border-t border-border pt-3 flex justify-between text-lg font-bold text-foreground">
                <span>Total</span>
                <span className="text-primary">${total.toFixed(2)}</span>
              </div>
            </div>

            <Link
              href="/checkout"
              className="block w-full bg-primary text-primary-foreground text-center px-6 py-3 rounded-md hover:bg-primary/90 transition-colors font-medium"
            >
              Proceed to Checkout
            </Link>

            <Link
              href="/shop"
              className="block w-full text-center mt-3 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}