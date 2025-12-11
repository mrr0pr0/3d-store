import Link from 'next/link';
import Image from 'next/image';
import { products } from '@/data/placeholder';
import ProductCard from '@/components/ProductCard';

export default function HomePage() {
  const featuredProducts = products.slice(0, 3);

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="relative h-[400px] w-full overflow-hidden rounded-lg bg-muted">
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent z-10" />
        <div className="absolute inset-0 bg-secondary" />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background to-transparent p-8 z-20">
          <h1 className="text-4xl font-extrabold tracking-tight text-white lg:text-5xl drop-shadow-md">
            3D Store
          </h1>
          <p className="mt-2 text-xl text-muted-foreground">
            Modern furniture and decor for your space
          </p>
        </div>
      </div>

      <div className="h-4" />
      <Link href="/shop" className="text-sm text-primary hover:underline">
        Browse All Products &rarr;
      </Link>
      <div className="h-8" />

      {/* Intro Text */}
      <div className="prose prose-invert max-w-none">
        <p className="text-xl leading-relaxed text-muted-foreground">
          Welcome to <strong>3D Store</strong>, your destination for cutting-edge 3D printed furniture and home decor. 
          Explore our collection of{' '}
          <Link href="/shop?category=furniture" className="text-primary hover:underline">
            Furniture
          </Link>
          ,{' '}
          <Link href="/shop?category=lighting" className="text-primary hover:underline">
            Lighting
          </Link>
          , and{' '}
          <Link href="/shop?category=decor" className="text-primary hover:underline">
            Decor
          </Link>{' '}
          designed to transform your living space.
        </p>
      </div>

      {/* Featured Products */}
      <div>
        <h2 className="mb-6 text-2xl font-bold text-primary border-l-4 border-primary pl-4">
          Featured Products
        </h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>

      {/* Categories Section */}
      <div>
        <h2 className="mb-6 text-2xl font-bold text-primary border-l-4 border-primary pl-4">
          Shop by Category
        </h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { name: 'Furniture', href: '/shop?category=furniture', emoji: '🪑' },
            { name: 'Lighting', href: '/shop?category=lighting', emoji: '💡' },
            { name: 'Decor', href: '/shop?category=decor', emoji: '🎨' },
            { name: 'Accessories', href: '/shop?category=accessories', emoji: '📦' },
          ].map((category) => (
            <Link
              key={category.name}
              href={category.href}
              className="group overflow-hidden rounded-lg border border-border bg-card transition-colors hover:border-primary p-6 text-center"
            >
              <div className="text-5xl mb-3">{category.emoji}</div>
              <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                {category.name}
              </h3>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}