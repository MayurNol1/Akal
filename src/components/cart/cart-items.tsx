"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import type { CartWithItems } from "@/modules/cart/types";
import { Trash2, Minus, Plus } from "lucide-react";

interface CartItemsProps {
  cart: CartWithItems;
}

export function CartItems({ cart }: CartItemsProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (quantity < 1) return;
    startTransition(async () => {
      await fetch("/api/cart/update", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId, quantity }),
      });
      router.refresh();
    });
  };

  const handleRemove = (productId: string) => {
    startTransition(async () => {
      await fetch("/api/cart/remove", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId }),
      });
      router.refresh();
    });
  };

  return (
    <div className="flex flex-col">
      {cart.items.map((item) => {
        const priceNumber = Number(item.product.price);
        const lineTotal = priceNumber * item.quantity;

        return (
          <div
            key={item.id}
            className="flex items-center justify-between py-8 border-b border-white/5 group"
          >
            <div className="flex items-center gap-8">
              <div className="relative h-24 w-24 rounded-full overflow-hidden ring-2 ring-primary/20 bg-background-dark p-1 shrink-0">
                <Image
                  src={item.product.imageUrl || "/images/rudraksha.png"}
                  alt={item.product.name}
                  fill
                  className="object-cover rounded-full p-2 contrast-110"
                />
              </div>

              <div className="flex flex-col space-y-1">
                <h3 className="text-white text-xl font-serif font-bold group-hover:text-primary transition-colors">
                  {item.product.name}
                </h3>
                <p className="text-zinc-500 text-xs font-medium uppercase tracking-widest">
                  Sacred Tool • #AK-{item.productId.slice(-4).toUpperCase()}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-12">
              <div className="flex items-center gap-4 text-white border border-primary/20 rounded-full px-4 py-1.5 bg-primary/5">
                <button
                  type="button"
                  disabled={isPending || item.quantity <= 1}
                  onClick={() => handleUpdateQuantity(item.productId, item.quantity - 1)}
                  className="text-primary hover:text-white transition-colors flex h-6 w-6 items-center justify-center cursor-pointer disabled:opacity-20"
                >
                  <Minus size={14} />
                </button>
                <span className="text-sm font-black w-6 text-center tabular-nums">
                  {item.quantity}
                </span>
                <button
                  type="button"
                  disabled={isPending}
                  onClick={() => handleUpdateQuantity(item.productId, item.quantity + 1)}
                  className="text-primary hover:text-white transition-colors flex h-6 w-6 items-center justify-center cursor-pointer disabled:opacity-20"
                >
                  <Plus size={14} />
                </button>
              </div>

              <div className="text-right min-w-[100px]">
                <p className="text-primary font-serif font-black text-2xl tracking-tight">
                  ${lineTotal.toFixed(2)}
                </p>
              </div>

              <button
                type="button"
                disabled={isPending}
                onClick={() => handleRemove(item.productId)}
                className="text-zinc-700 hover:text-red-400 transition-colors p-2"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
