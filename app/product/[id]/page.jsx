'use client';

import { use, useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { FiShoppingCart, FiArrowLeft } from 'react-icons/fi';

export default function ProductPage({ params }) {
  const resolvedParams = use(params);
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProduct();
  }, [resolvedParams.id]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/products/${resolvedParams.id}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch product');
      }
      
      const data = await response.json();
      setProduct(data);
    } catch (err) {
      console.error('Error fetching product:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="mb-4 h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto"></div>
          <p className="text-muted-foreground">Loading product...</p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="space-y-8">
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 text-primary hover:underline"
        >
          <FiArrowLeft />
          Back to Shop
        </Link>
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold text-foreground">Product not found</h1>
          <p className="text-muted-foreground mt-2">
            The product you're looking for doesn't exist.
          </p>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product);
  };

  return (
    <div className="space-y-8">
      <Link
        href="/shop"
        className="inline-flex items-center gap-2 text-primary hover:underline"
      >
        <FiArrowLeft />
        Back to Shop
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Product Image */}
        <div className="aspect-square w-full bg-secondary rounded-lg relative overflow-hidden">
          {product.image ? (
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span className="text-9xl">📦</span>
            </div>
          )}
        </div>

        {/* Product Details */}
        <div className="space-y-6">
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight text-foreground">
              {product.name}
            </h1>
          </div>

          <div className="text-3xl font-bold text-primary">
            ${parseFloat(product.price).toFixed(2)}
          </div>

          <div className="prose prose-invert">
            <p className="text-muted-foreground leading-relaxed">
              {product.description}
            </p>
          </div>

          <button
            onClick={handleAddToCart}
            className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground px-6 py-4 rounded-md hover:bg-primary/90 transition-colors font-medium text-lg"
          >
            <FiShoppingCart />
            Add to Cart
          </button>

          <div className="border-t border-border pt-6 space-y-4">
            <h3 className="font-bold text-foreground">Product Features</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• High-quality 3D printed construction</li>
              <li>• Modern and minimalist design</li>
              <li>• Durable and long-lasting materials</li>
              <li>• Easy to assemble and maintain</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}