'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import { FiShoppingCart } from 'react-icons/fi';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart(product);
  };

  return (
    <Link
      href={`/product/${product.id}`}
      className="group overflow-hidden rounded-lg border border-border bg-card transition-all hover:border-primary hover:shadow-lg hover:shadow-primary/20"
    >
      <div className="aspect-square w-full bg-muted relative flex items-center justify-center text-muted-foreground overflow-hidden">
        {product.image ? (
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full bg-secondary flex items-center justify-center">
            <span className="text-muted-foreground text-4xl">📦</span>
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors line-clamp-1">
          {product.name}
        </h3>
        <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
          {product.description}
        </p>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-xl font-bold text-primary">
            ${product.price.toFixed(2)}
          </span>
          <button
            onClick={handleAddToCart}
            className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition-colors text-sm font-medium"
          >
            <FiShoppingCart />
            Add to Cart
          </button>
        </div>
      </div>
    </Link>
  );
}