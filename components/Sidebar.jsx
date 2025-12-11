'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Sidebar() {
  const pathname = usePathname();

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/shop', label: 'Shop' },
    { href: '/cart', label: 'Cart' },
  ];

  const categories = [
    { href: '/shop?category=furniture', label: 'Furniture' },
    { href: '/shop?category=decor', label: 'Decor' },
    { href: '/shop?category=lighting', label: 'Lighting' },
    { href: '/shop?category=accessories', label: 'Accessories' },
  ];

  return (
    <aside className="hidden w-full flex-col md:flex border-r border-border min-h-[calc(100vh-3.5rem)] bg-card sticky top-14">
      <div className="py-6 pr-6 pl-4 lg:py-8">
        <h3 className="font-bold text-lg mb-4 text-primary border-b border-border pb-2">
          Navigation
        </h3>
        <nav className="flex flex-col space-y-2 text-sm">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`block p-2 rounded-md transition-colors ${
                pathname === item.href
                  ? 'bg-accent text-accent-foreground'
                  : 'hover:bg-accent/50 hover:text-accent-foreground'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <h3 className="font-bold text-lg mb-4 mt-8 text-primary border-b border-border pb-2">
          Categories
        </h3>
        <nav className="flex flex-col space-y-2 text-sm">
          {categories.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block p-2 hover:bg-accent/50 hover:text-accent-foreground rounded-md transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </aside>
  );
}