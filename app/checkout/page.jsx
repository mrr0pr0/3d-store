'use client';

import { useCart } from '@/context/CartContext';
import Link from 'next/link';
import { FiArrowLeft } from 'react-icons/fi';

export default function CheckoutPage() {
  const { cart, getTotal } = useCart();
  const total = getTotal();

  if (cart.length === 0) {
    return (
      <div className="space-y-8">
        <Link
          href="/cart"
          className="inline-flex items-center gap-2 text-primary hover:underline"
        >
          <FiArrowLeft />
          Back to Cart
        </Link>
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
      <Link
        href="/cart"
        className="inline-flex items-center gap-2 text-primary hover:underline"
      >
        <FiArrowLeft />
        Back to Cart
      </Link>

      <h1 className="text-4xl font-extrabold tracking-tight text-foreground">
        Checkout
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Checkout Form */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-card border border-border rounded-lg p-6">
            <h2 className="text-xl font-bold text-foreground mb-4">
              Shipping Information
            </h2>
            <form className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    className="w-full bg-background border border-border rounded-md px-4 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="John"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    className="w-full bg-background border border-border rounded-md px-4 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Doe"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full bg-background border border-border rounded-md px-4 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="john.doe@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Address
                </label>
                <input
                  type="text"
                  className="w-full bg-background border border-border rounded-md px-4 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="123 Main St"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    City
                  </label>
                  <input
                    type="text"
                    className="w-full bg-background border border-border rounded-md px-4 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="New York"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    State
                  </label>
                  <input
                    type="text"
                    className="w-full bg-background border border-border rounded-md px-4 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="NY"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    ZIP Code
                  </label>
                  <input
                    type="text"
                    className="w-full bg-background border border-border rounded-md px-4 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="10001"
                  />
                </div>
              </div>
            </form>
          </div>

          <div className="bg-card border border-border rounded-lg p-6">
            <h2 className="text-xl font-bold text-foreground mb-4">
              Payment Information
            </h2>
            <p className="text-muted-foreground text-sm">
              Payment processing will be implemented with Stripe integration.
            </p>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-card border border-border rounded-lg p-6 sticky top-20">
            <h2 className="text-xl font-bold text-foreground mb-4">
              Order Summary
            </h2>
            
            <div className="space-y-3 mb-6">
              {cart.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span className="text-muted-foreground">
                    {item.name} x {item.quantity}
                  </span>
                  <span className="text-foreground">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
              
              <div className="border-t border-border pt-3 flex justify-between text-muted-foreground">
                <span>Subtotal</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div className="border-t border-border pt-3 flex justify-between text-lg font-bold text-foreground">
                <span>Total</span>
                <span className="text-primary">${total.toFixed(2)}</span>
              </div>
            </div>

            <button
              className="block w-full bg-primary text-primary-foreground text-center px-6 py-3 rounded-md hover:bg-primary/90 transition-colors font-medium"
            >
              Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}