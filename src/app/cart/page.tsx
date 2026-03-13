import Link from "next/link";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import type { CartWithItems } from "@/modules/cart/types";
import { CartItems } from "@/components/cart/cart-items";
import { ShoppingBag, ArrowRight } from "lucide-react";

export const dynamic = "force-dynamic";

async function getCartForUser(userId: string): Promise<CartWithItems | null> {
  const cart = await prisma.cart.findUnique({
    where: { userId },
    include: {
      items: {
        include: {
          product: true,
        },
      },
    },
  });

  return cart as CartWithItems | null;
}

export default async function CartPage() {
  const session = await auth();

  if (!session?.user?.id) {
    return (
      <div className="bg-black min-h-screen flex items-center justify-center text-white p-6">
        <div className="max-w-md w-full glass p-12 rounded-4xl border border-white/5 text-center space-y-8 animate-fade-in">
          <div className="h-20 w-20 glass rounded-3xl mx-auto flex items-center justify-center border-white/10">
             <ShoppingBag className="text-gold/60" size={32} />
          </div>
          <div className="space-y-4">
            <h1 className="text-3xl font-serif italic">Identify Yourself</h1>
            <p className="text-zinc-500 text-sm leading-relaxed font-light tracking-wide">
              The sacred cart awaits your presence. Please sign in to verify your manifest journey.
            </p>
          </div>
          <Link
            href="/login"
            className="group flex items-center justify-between px-8 py-4 rounded-xl bg-white text-black text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-gold transition-all duration-500"
          >
            Enter Sanctuary
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    );
  }

  const cart = await getCartForUser(session.user.id);
  const items = cart?.items ?? [];
  const subtotal = items.reduce((sum, item) => {
    const priceNumber = Number(item.product.price);
    return sum + priceNumber * item.quantity;
  }, 0);

  return (
    <div className="bg-black min-h-screen pb-40 text-white">
      {/* Background Aesthetics */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(30,58,138,0.05),transparent_70%)] pointer-events-none -z-10" />
      
      <div className="h-32" />
      <div className="max-w-7xl mx-auto px-6 space-y-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-white/5 pb-10">
          <div className="space-y-4">
             <div className="h-px w-12 bg-gold/50" />
             <h1 className="text-5xl md:text-6xl font-serif italic tracking-tight gold-gradient leading-tight">
               Sacred <span className="text-white">Cart</span>
             </h1>
             <p className="text-zinc-600 text-sm font-bold uppercase tracking-[0.4em]">Artifacts Awaiting Manifestation</p>
          </div>
          <Link
            href="/products"
            className="text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-500 hover:text-gold transition-colors flex items-center gap-3 group"
          >
            Continue Exploring
            <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {items.length === 0 ? (
          <div className="glass border border-white/5 rounded-4xl py-32 flex flex-col items-center justify-center space-y-10 animate-fade-in">
             <div className="relative group">
                <div className="absolute inset-0 bg-gold/10 blur-2xl rounded-full scale-150 group-hover:scale-200 transition-transform duration-1000" />
                <ShoppingBag className="text-zinc-800 relative z-10" size={80} strokeWidth={0.5} />
             </div>
             <div className="text-center space-y-4">
                <p className="text-zinc-600 font-serif italic text-2xl tracking-widest">The vessel is currently empty.</p>
                <p className="text-zinc-700 text-[10px] font-bold uppercase tracking-[0.4em]">Begin your spiritual harvest</p>
             </div>
             <Link
               href="/products"
               className="inline-flex items-center justify-center px-10 py-4 rounded-xl bg-white text-black text-[10px] font-bold uppercase tracking-[0.2em] shadow-2xl hover:bg-gold transition-colors duration-500"
             >
               Observe Collection
             </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-20">
            <div className="lg:col-span-2 space-y-12">
               {cart && <CartItems cart={cart} />}
            </div>

            <aside className="space-y-10">
               <div className="glass border border-white/5 rounded-4xl p-10 space-y-10 sticky top-32">
                  <div className="space-y-6">
                     <h2 className="text-[10px] font-bold uppercase tracking-[0.4em] text-zinc-600 pb-4 border-b border-white/5">
                       Manifestation Summary
                     </h2>
                     <div className="space-y-4">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-zinc-500 font-light tracking-wide">Investment Value</span>
                          <span className="text-white font-medium tracking-wider">
                            ${subtotal.toFixed(2)}
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.2em] text-zinc-600">
                          <span>Sacred Transit</span>
                          <span>Calculated at Ritual</span>
                        </div>
                     </div>
                  </div>

                  <div className="pt-8 border-t border-white/5 flex items-center justify-between">
                    <div className="space-y-1">
                       <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-gold">Total Harvest</span>
                       <div className="text-3xl font-light text-white tracking-widest leading-none">
                         ${subtotal.toFixed(2)}
                       </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                     <Link
                       href="/checkout"
                       className="block w-full text-center bg-white text-black py-5 rounded-xl text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-gold transition-all duration-500 shadow-2xl"
                     >
                       Proceed to Sacred checkout
                     </Link>
                     <p className="text-[9px] text-zinc-600 text-center font-bold uppercase tracking-[0.3em]">Secure spiritual gateway</p>
                  </div>

                  {/* Trust Badge */}
                  <div className="p-4 rounded-2xl bg-zinc-900/50 border border-white/5 text-center">
                     <p className="text-[8px] text-zinc-500 italic leading-relaxed">
                        &ldquo;May your investment manifest pure energy in your life journey.&rdquo;
                     </p>
                  </div>
               </div>
            </aside>
          </div>
        )}
      </div>
    </div>
  );
}
