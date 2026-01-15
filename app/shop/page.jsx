'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import ProductCard from '@/components/ProductCard';

export default function ShopPage() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get('category');

  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/products');
      
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      
      const data = await response.json();
      setProducts(data);
      setFilteredProducts(data);
    } catch (err) {
      console.error('Error fetching products:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const selectedCategory = categoryParam || 'all';

    if (selectedCategory === 'all') {
      setFilteredProducts(products);
      return;
    }

    setFilteredProducts(
      products.filter((product) => product.category === selectedCategory)
    );
  }, [categoryParam, products]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="mb-4 h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto"></div>
          <p className="text-muted-foreground">Loading products...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-4">Error: {error}</p>
          <button
            onClick={fetchProducts}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const selectedCategory = categoryParam || 'all';

  return (
    <div className="flex-1">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-primary">Shop</h1>
        <p className="text-muted-foreground mt-2">
          {selectedCategory === 'all'
            ? `Showing all ${filteredProducts.length} products`
            : `${filteredProducts.length} products in ${selectedCategory}`}
        </p>
      </div>
      {filteredProducts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground text-lg">
            No products found in this category.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}