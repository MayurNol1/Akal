import Link from "next/link";
import { auth } from "@/auth";
import { CartService } from "@/modules/cart/service";
import { ChevronLeft, ShieldCheck, Lock, Sparkles } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function CheckoutPage() {
  const session = await auth();

  if (!session?.user?.id) {
    return (
      <div className="bg-black min-h-screen flex items-center justify-center text-white p-6">
        <div className="max-w-md w-full glass p-12 rounded-4xl border border-white/5 text-center space-y-8 animate-fade-in">
          <h1 className="text-3xl font-serif italic">Identity Required</h1>
          <p className="text-zinc-500 text-sm leading-relaxed font-light tracking-wide">
            To complete this manifestation, we must verify your presence in the sanctuary.
          </p>
          <Link
            href="/login"
            className="block w-full py-4 rounded-xl bg-white text-black text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-gold transition-all duration-500"
          >
            Sign In to Proceed
          </Link>
        </div>
      </div>
    );
  }

  const cart = await CartService.getCart(session.user.id);
  const items = cart?.items ?? [];
  const subtotal = items.reduce((sum: number, item) => {
    const priceNumber = Number(item.product.price);
    return sum + priceNumber * item.quantity;
  }, 0);

  return (
    <div className="bg-black min-h-screen pb-40 text-white">
      {/* Background Aesthetics */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(30,58,138,0.05),transparent_70%)] pointer-events-none -z-10" />

      <div className="h-32" />
      <div className="max-w-7xl mx-auto px-6 space-y-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-white/5 pb-10">
          <div className="space-y-4">
             <div className="h-px w-12 bg-gold/50" />
             <h1 className="text-5xl md:text-6xl font-serif italic tracking-tight gold-gradient leading-tight">
               Sacred <span className="text-white">Investment</span>
             </h1>
             <p className="text-zinc-600 text-[10px] font-bold uppercase tracking-[0.4em]">The Final Step Toward Manifestation</p>
          </div>
          <Link
            href="/cart"
            className="text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-500 hover:text-gold transition-colors flex items-center gap-3 group"
          >
            <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Back to Cart
          </Link>
        </div>

        {items.length === 0 ? (
          <div className="glass border border-white/5 rounded-4xl py-32 flex flex-col items-center justify-center space-y-10 animate-fade-in">
             <p className="text-zinc-600 font-serif italic text-2xl tracking-widest">Your vessel is empty.</p>
             <Link
               href="/products"
               className="inline-flex items-center justify-center px-10 py-4 rounded-xl bg-white text-black text-[10px] font-bold uppercase tracking-[0.2em] shadow-2xl hover:bg-gold transition-colors duration-500"
             >
               Explore Collections
             </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-20">
            <div className="lg:col-span-2 space-y-12">
               <div className="space-y-8">
                  <h2 className="text-[10px] font-bold uppercase tracking-[0.4em] text-zinc-500 border-b border-white/5 pb-4">Selected Artifacts</h2>
                  <div className="space-y-6">
                    {items.map((item) => {
                      const priceNumber = Number(item.product.price);
                      const lineTotal = priceNumber * item.quantity;

                      return (
                        <div
                          key={item.id}
                          className="flex justify-between items-center group"
                        >
                          <div className="space-y-1">
                            <h3 className="font-serif italic text-xl group-hover:text-gold transition-colors duration-500">{item.product.name}</h3>
                            <p className="text-[10px] text-zinc-600 font-bold uppercase tracking-[0.2em]">
                              Qty {item.quantity} · ${priceNumber.toFixed(2)} / unit
                            </p>
                          </div>
                          <div className="text-right">
                             <p className="text-lg font-light text-white tracking-widest leading-none">
                               ${lineTotal.toFixed(2)}
                             </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
               </div>

               {/* Trust Pillars */}
               <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-12 border-t border-white/5">
                  <TrustPillar 
                    icon={<Lock size={18} />} 
                    title="Secured Link" 
                    desc="Encrypted energy transit via Stripe."
                  />
                  <TrustPillar 
                    icon={<ShieldCheck size={18} />} 
                    title="Ethical Dharma" 
                    desc="Fair trade spiritual sourcing only."
                  />
                  <TrustPillar 
                    icon={<Sparkles size={18} />} 
                    title="High vibration" 
                    desc="Blessed before final fulfillment."
                  />
               </div>
            </div>

            <aside className="space-y-10">
               <div className="glass border border-white/5 rounded-4xl p-10 space-y-10 sticky top-32">
                  <div className="space-y-6">
                     <h2 className="text-[10px] font-bold uppercase tracking-[0.4em] text-zinc-600 pb-4 border-b border-white/5">
                       Manifestation Summary
                     </h2>
                     <div className="space-y-4">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-zinc-500 font-light tracking-wide">Investment Subtotal</span>
                          <span className="text-white font-medium tracking-wider">
                            ${subtotal.toFixed(2)}
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.2em] text-zinc-600">
                          <span>Ritual Shipping</span>
                          <span>Calculated at Fulfillment</span>
                        </div>
                     </div>
                  </div>

                  <div className="pt-8 border-t border-white/5 flex items-center justify-between">
                    <div className="space-y-1">
                       <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-gold">Total Harvest</span>
                       <div className="text-4xl font-light text-white tracking-widest leading-none">
                         ${subtotal.toFixed(2)}
                       </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                     <form action="/api/checkout" method="POST">
                        <button
                          type="submit"
                          className="w-full bg-white text-black py-5 rounded-xl text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-gold transition-all duration-500 shadow-2xl"
                        >
                          Manifest Payment
                        </button>
                     </form>
                     <p className="text-[9px] text-zinc-600 text-center font-bold uppercase tracking-[0.3em]">Redirecting to Secure Gateway</p>
                  </div>

                  <div className="p-4 rounded-2xl bg-zinc-900/50 border border-white/5 text-center">
                     <p className="text-[8px] text-zinc-500 italic leading-relaxed">
                        &ldquo;Your contribution supports the preservation of ancient high-vibration crafts.&rdquo;
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

function TrustPillar({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  return (
    <div className="space-y-4 group">
       <div className="text-gold/60 group-hover:text-gold transition-colors duration-500">{icon}</div>
       <div className="space-y-1">
         <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400">{title}</h4>
         <p className="text-[10px] text-zinc-600 leading-relaxed font-light">{desc}</p>
       </div>
    </div>
  );
}
