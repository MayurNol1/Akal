import Link from "next/link";
import { auth } from "@/auth";
import { CartService } from "@/modules/cart/service";
import type { CartWithItems } from "@/modules/cart/types";
import { CartItems } from "@/components/cart/cart-items";
import { ShoppingBag, ArrowRight, ShieldCheck, Truck, Lock } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function CartPage() {
  const session = await auth();

  if (!session?.user?.id) {
    return (
      <div className="bg-background-dark min-h-screen flex items-center justify-center text-white p-6">
        <div className="max-w-md w-full bg-white/5 p-12 rounded-3xl border border-white/5 text-center space-y-8 animate-fade-in">
          <div className="h-20 w-20 bg-primary/10 rounded-full mx-auto flex items-center justify-center border border-primary/20">
             <ShoppingBag className="text-primary" size={32} />
          </div>
          <div className="space-y-4">
            <h1 className="text-3xl font-serif font-black uppercase tracking-widest">Identify Yourself</h1>
            <p className="text-zinc-500 text-sm leading-relaxed font-light tracking-wide">
              The sacred cart awaits your presence. Please sign in to verify your manifest journey.
            </p>
          </div>
          <Link
            href="/login"
            className="group flex items-center justify-center gap-3 w-full py-4 rounded-xl bg-primary text-background-dark text-xs font-black uppercase tracking-widest hover:bg-white transition-all duration-500 shadow-xl"
          >
            Enter Sanctuary
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    );
  }

  const cart = (await CartService.getCart(session.user.id)) as CartWithItems | null;
  const items = cart?.items ?? [];
  const subtotal = items.reduce((sum: number, item) => {
    const priceNumber = Number(item.product.price);
    return sum + priceNumber * item.quantity;
  }, 0);
  const shipping = items.length > 0 ? 15 : 0;
  const total = subtotal + shipping;

  return (
    <div className="bg-background-dark min-h-screen text-white">
      <main className="max-w-7xl mx-auto px-6 pt-32 pb-20">
        <div className="flex flex-col gap-12">
          {/* Header */}
          <div className="space-y-4 border-b border-white/5 pb-10">
            <nav className="flex gap-2 text-primary text-[10px] font-black uppercase tracking-[0.3em] mb-4 opacity-60">
              <Link href="/products" className="hover:opacity-100 transition-opacity">Sanctuary</Link>
              <span>/</span>
              <span className="text-white">Sacred Investment Cart</span>
            </nav>
            <h1 className="text-5xl md:text-6xl font-serif font-black tracking-tight leading-tight">
              Your <span className="text-primary">Selection</span>
            </h1>
            <p className="text-zinc-500 font-serif italic">Review your chosen spiritual tools before proceeding.</p>
          </div>

          {items.length === 0 ? (
            <div className="bg-white/5 border border-white/5 rounded-3xl py-32 flex flex-col items-center justify-center space-y-10 animate-fade-in">
               <div className="relative group">
                  <div className="absolute inset-0 bg-primary/10 blur-3xl rounded-full scale-150" />
                  <ShoppingBag className="text-zinc-800 relative z-10" size={80} strokeWidth={1} />
               </div>
               <div className="text-center space-y-4">
                  <p className="text-zinc-500 font-serif italic text-2xl tracking-widest">The vessel is currently empty.</p>
               </div>
               <Link
                 href="/products"
                 className="inline-flex items-center justify-center px-10 py-4 rounded-xl bg-primary text-background-dark text-xs font-black uppercase tracking-widest shadow-2xl hover:bg-white transition-colors duration-500"
               >
                 Observe Collection
               </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 xl:gap-24 items-start">
              <div className="lg:col-span-2">
                 {cart && <CartItems cart={cart} />}
                 
                 <div className="mt-12 p-8 rounded-2xl bg-primary/5 border border-primary/10 flex items-center justify-between group">
                    <div className="flex items-center gap-4">
                       <ShieldCheck className="text-primary" size={24} />
                       <span className="text-zinc-400 text-sm font-serif italic">Each item is energetically cleansed before shipment.</span>
                    </div>
                    <Link href="/products" className="text-primary text-[10px] font-black uppercase tracking-widest hover:text-white transition-colors underline decoration-2 underline-offset-8">
                       Continue Exploring
                    </Link>
                 </div>
              </div>

              <aside className="sticky top-32">
                 <div className="bg-white/5 border border-white/5 rounded-3xl p-10 space-y-10 shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-3xl rounded-full -mr-16 -mt-16" />
                    
                    <div className="space-y-8 relative z-10">
                       <h2 className="text-2xl font-serif font-black text-white">Sacred Investment</h2>
                       
                       <div className="space-y-6">
                          <div className="flex justify-between items-center text-sm">
                            <span className="text-zinc-500 font-bold uppercase tracking-widest">Subtotal</span>
                            <span className="text-white font-serif font-bold text-xl">${subtotal.toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between items-center text-sm">
                            <span className="text-zinc-500 font-bold uppercase tracking-widest">Sacred Transit</span>
                            <span className="text-primary font-serif font-bold text-xl">${shipping.toFixed(2)}</span>
                          </div>
                          
                          <div className="h-px bg-white/5 my-2" />
                          
                          <div className="flex justify-between items-end pt-2">
                            <div className="flex flex-col">
                               <span className="text-[10px] font-black uppercase tracking-widest text-primary">Total Contribution</span>
                               <span className="text-4xl font-serif font-black text-white tracking-tighter">${total.toFixed(2)}</span>
                            </div>
                          </div>
                       </div>

                       <div className="space-y-6">
                          <button className="w-full bg-primary hover:bg-white text-background-dark py-5 rounded-xl text-xs font-black uppercase tracking-widest transition-all transform hover:scale-[1.02] active:scale-95 shadow-xl flex items-center justify-center gap-3 group">
                            <span>Proceed to Payment</span>
                            <Lock size={16} className="group-hover:rotate-12 transition-transform" />
                          </button>
                          
                          <div className="flex flex-col gap-4 items-center">
                             <div className="flex items-center gap-2 text-zinc-600 text-[10px] font-black uppercase tracking-widest">
                               <ShieldCheck size={14} className="text-primary" />
                               <span>Secure Cosmic Encryption</span>
                             </div>
                          </div>
                       </div>
                       
                       <div className="p-5 rounded-xl bg-background-dark/50 border border-primary/10">
                          <div className="flex gap-4">
                             <Truck className="text-primary" size={20} />
                             <div className="flex flex-col gap-1">
                                <span className="text-white text-[10px] font-black uppercase tracking-widest">Arrival Prediction</span>
                                <span className="text-zinc-500 text-[10px] font-medium leading-relaxed">Auspicious delivery within 4-7 lunar cycles.</span>
                             </div>
                          </div>
                       </div>
                    </div>
                 </div>
              </aside>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
