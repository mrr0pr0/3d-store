'use client';

import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import { FiTrash2, FiPlus, FiMinus } from 'react-icons/fi';

export default function CartItem({ item }) {
  const { updateQuantity, removeFromCart } = useCart();

  return (
    <div className="flex gap-4 p-4 bg-card border border-border rounded-lg">
      <div className="w-24 h-24 bg-secondary rounded-md flex-shrink-0 relative overflow-hidden">
        {item.image ? (
          <Image
            src={item.image}
            alt={item.name}
            fill
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-3xl">📦</span>
          </div>
        )}
      </div>

      <div className="flex-1 flex flex-col justify-between">
        <div>
          <h3 className="font-bold text-foreground">{item.name}</h3>
          <p className="text-sm text-muted-foreground mt-1">
            ${item.price.toFixed(2)} each
          </p>
        </div>

        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center gap-2">
            <button
              onClick={() => updateQuantity(item.id, item.quantity - 1)}
              className="p-1 bg-secondary hover:bg-secondary/80 rounded transition-colors"
              aria-label="Decrease quantity"
            >
              <FiMinus className="text-foreground" />
            </button>
            <span className="w-8 text-center font-medium">{item.quantity}</span>
            <button
              onClick={() => updateQuantity(item.id, item.quantity + 1)}
              className="p-1 bg-secondary hover:bg-secondary/80 rounded transition-colors"
              aria-label="Increase quantity"
            >
              <FiPlus className="text-foreground" />
            </button>
          </div>

          <div className="flex items-center gap-4">
            <span className="font-bold text-primary">
              ${(item.price * item.quantity).toFixed(2)}
            </span>
            <button
              onClick={() => removeFromCart(item.id)}
              className="p-2 text-destructive hover:bg-destructive/10 rounded transition-colors"
              aria-label="Remove item"
            >
              <FiTrash2 />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}