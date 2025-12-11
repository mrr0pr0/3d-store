'use client';

import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { FiShoppingCart } from 'react-icons/fi';

export default function Header() {
  const { cart } = useCart();
  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex w-full justify-between items-center">
          <Link href="/" className="flex items-center space-x-2">
            <span className="font-bold text-xl text-primary">
              3D STORE
            </span>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
            <Link
              href="/"
              className="transition-colors hover:text-foreground/80 text-foreground/60 hover:underline decoration-primary decoration-2 underline-offset-4"
            >
              Home
            </Link>
            <Link
              href="/shop"
              className="transition-colors hover:text-foreground/80 text-foreground/60 hover:underline decoration-primary decoration-2 underline-offset-4"
            >
              Shop
            </Link>
            <Link
              href="/cart"
              className="transition-colors hover:text-foreground/80 text-foreground/60 hover:underline decoration-primary decoration-2 underline-offset-4 flex items-center gap-2"
            >
              <FiShoppingCart className="text-lg" />
              Cart
              {cartItemCount > 0 && (
                <span className="bg-primary text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {cartItemCount}
                </span>
              )}
            </Link>
          </nav>

          {/* Mobile cart icon */}
          <Link href="/cart" className="md:hidden relative">
            <FiShoppingCart className="text-2xl text-foreground/60 hover:text-foreground/80" />
            {cartItemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs">
                {cartItemCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}