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
    <div className="space-y-8">
      {cart.items.map((item) => {
        const priceNumber = Number(item.product.price);
        const lineTotal = priceNumber * item.quantity;

        return (
          <div
            key={item.id}
            className="group relative flex flex-col md:flex-row gap-8 pb-12 border-b border-white/5 last:border-0"
          >
            <div className="relative h-48 w-full md:w-36 rounded-3xl overflow-hidden border border-white/5 bg-zinc-900 shadow-xl shrink-0">
               <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent pointer-events-none" />
               <Image
                 src={
                   item.product.imageUrl ||
                   "/images/rudraksha.png"
                 }
                 alt={item.product.name}
                 fill
                 className="object-cover transition-transform duration-700 group-hover:scale-110 opacity-90 group-hover:opacity-100"
               />
            </div>

            <div className="flex-1 flex flex-col justify-between py-2">
              <div className="space-y-4">
                <div className="flex justify-between items-start gap-4">
                  <div className="space-y-1">
                     <p className="text-[9px] font-bold uppercase tracking-[0.4em] text-zinc-600">Sacred Artifact</p>
                     <h3 className="font-serif italic text-2xl group-hover:text-gold transition-colors duration-500">
                       {item.product.name}
                     </h3>
                  </div>
                  <div className="text-right">
                     <p className="text-xl font-light text-white tracking-wider">
                       ${lineTotal.toFixed(2)}
                     </p>
                     <p className="text-[10px] text-zinc-600 font-bold uppercase tracking-[0.2em] mt-1">
                        ${priceNumber.toFixed(2)} / unit
                     </p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between mt-8">
                <div className="flex items-center gap-1 glass rounded-xl p-1 border border-white/5">
                  <button
                    type="button"
                    disabled={isPending || item.quantity <= 1}
                    onClick={() =>
                      handleUpdateQuantity(item.productId, item.quantity - 1)
                    }
                    className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-white/5 disabled:opacity-20 transition-colors"
                  >
                    <Minus size={14} className="text-zinc-500" />
                  </button>
                  <span className="text-xs font-bold w-8 text-center tracking-widest">
                    {item.quantity}
                  </span>
                  <button
                    type="button"
                    disabled={isPending}
                    onClick={() =>
                      handleUpdateQuantity(item.productId, item.quantity + 1)
                    }
                    className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-white/5 disabled:opacity-20 transition-colors"
                  >
                    <Plus size={14} className="text-zinc-500" />
                  </button>
                </div>

                <button
                  type="button"
                  disabled={isPending}
                  onClick={() => handleRemove(item.productId)}
                  className="group/remove flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-600 hover:text-red-400 transition-all duration-500"
                >
                  <Trash2 size={12} className="group-hover/remove:scale-110 transition-transform" />
                  Withdraw
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
