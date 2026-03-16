import Link from "next/link";
import { auth } from "@/auth";
import { CartService } from "@/modules/cart/service";
import { ChevronLeft, ShieldCheck, Lock, Sparkles, MoveRight } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function CheckoutPage() {
  const session = await auth();

  if (!session?.user?.id) {
    return (
      <div className="bg-background-dark min-h-screen flex items-center justify-center text-white p-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(236,149,19,0.05),transparent_70%)]" />
        <div className="max-w-md w-full bg-white/2 p-12 rounded-3xl border border-white/5 text-center space-y-8 animate-fade-in relative z-10">
          <h1 className="text-3xl font-serif italic text-primary">Identity Required</h1>
          <p className="text-zinc-500 text-sm leading-relaxed font-light tracking-wide">
            To complete this manifestation, we must verify your presence in the sanctuary.
          </p>
          <Link
            href="/login"
            className="block w-full py-5 rounded-2xl bg-primary text-background-dark text-[10px] font-black uppercase tracking-widest hover:bg-white transition-all duration-500 shadow-2xl"
          >
            Sign In to Proceed
          </Link>
        </div>
      </div>
    );
  }

  const cart = await CartService.getCart(session.user.id);
  const items = cart?.items ?? [];
  const subtotal = items.reduce((sum: number, item: any) => {
    const priceNumber = Number(item.product.price);
    return sum + priceNumber * item.quantity;
  }, 0);

  return (
    <div className="bg-background-dark min-h-screen pb-40 text-white">
      <div className="h-32" />
      <div className="max-w-7xl mx-auto px-6 space-y-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-white/5 pb-10">
          <div className="space-y-4">
             <div className="h-px w-10 bg-primary" />
             <h1 className="text-5xl md:text-6xl font-serif font-black tracking-tight leading-tight">
               Final <span className="text-primary italic">Manifestation</span>
             </h1>
             <p className="text-zinc-600 text-[10px] font-black uppercase tracking-[0.45em]">The Transition Toward Possession</p>
          </div>
          <Link
            href="/cart"
            className="text-[10px] font-black uppercase tracking-widest text-zinc-500 hover:text-primary transition-colors flex items-center gap-3 group"
          >
            <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Vessel Returns
          </Link>
        </div>

        {items.length === 0 ? (
          <div className="bg-white/2 border border-white/5 rounded-3xl py-32 flex flex-col items-center justify-center space-y-10 animate-fade-in">
             <p className="text-zinc-700 font-serif italic text-2xl tracking-widest">Your vessel is empty.</p>
             <Link
               href="/products"
               className="inline-flex items-center justify-center px-12 py-5 rounded-2xl bg-primary text-background-dark text-[10px] font-black uppercase tracking-widest shadow-2xl hover:bg-white transition-all duration-500"
             >
               Explore Sacred Realms
             </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-20">
            <div className="lg:col-span-2 space-y-16">
               <div className="space-y-10">
                  <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-600 border-b border-white/5 pb-6">Vessel Manifest</h2>
                  <div className="space-y-8">
                    {items.map((item: any) => {
                      const priceNumber = Number(item.product.price);
                      const lineTotal = priceNumber * item.quantity;

                      return (
                        <div
                          key={item.id}
                          className="flex justify-between items-center group animate-fade-in"
                        >
                          <div className="space-y-2">
                            <h3 className="font-serif text-2xl text-white group-hover:text-primary transition-colors duration-500">{item.product.name}</h3>
                            <div className="flex items-center gap-3">
                               <span className="text-[9px] text-zinc-600 font-black uppercase tracking-widest">Ritual Quantity</span>
                               <span className="text-[11px] text-white font-bold">{item.quantity}</span>
                               <div className="h-px w-4 bg-white/5" />
                               <span className="text-[11px] text-zinc-400 font-serif italic">${priceNumber.toFixed(2)}</span>
                            </div>
                          </div>
                          <div className="text-right">
                             <p className="text-2xl font-serif font-black text-white tracking-widest">
                               ${lineTotal.toFixed(2)}
                             </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
               </div>

               {/* Trust Pillars */}
               <div className="grid grid-cols-1 md:grid-cols-3 gap-10 pt-16 border-t border-white/5">
                  <TrustPillar 
                    icon={<Lock size={20} className="text-primary/60" />} 
                    title="Secured Link" 
                    desc="Encrypted energy transit via sacred Stripe gateway."
                  />
                  <TrustPillar 
                    icon={<ShieldCheck size={20} className="text-primary/60" />} 
                    title="Ethical Dharma" 
                    desc="Pure origins and high-vibration fair trade."
                  />
                  <TrustPillar 
                    icon={<Sparkles size={20} className="text-primary/60" />} 
                    title="Divine Aura" 
                    desc="Artifacts are cleansed before departure."
                  />
               </div>
            </div>

            <aside className="space-y-10">
               <div className="bg-white/2 border border-white/5 rounded-3xl p-10 space-y-10 sticky top-32 shadow-2xl overflow-hidden group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-3xl rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-1000" />
                  
                  <div className="space-y-8 relative z-10">
                     <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-600 pb-5 border-b border-white/5">
                       Offering Summary
                     </h2>
                     <div className="space-y-5">
                        <div className="flex items-center justify-between text-[11px] font-black uppercase tracking-widest">
                          <span className="text-zinc-500">Ancient Value</span>
                          <span className="text-white">
                            ${subtotal.toFixed(2)}
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-zinc-600">
                          <span>Sacred Transit</span>
                          <span className="italic">Calculated at Ritual</span>
                        </div>
                     </div>
                  </div>

                  <div className="pt-10 border-t border-white/5 flex items-center justify-between relative z-10">
                    <div className="space-y-2">
                       <span className="text-[9px] font-black uppercase tracking-[0.5em] text-primary">Final Harvest</span>
                       <div className="text-5xl font-serif font-black text-white tracking-tight leading-none italic">
                         ${subtotal.toFixed(2)}
                       </div>
                    </div>
                  </div>

                  <div className="space-y-6 relative z-10">
                     <form action="/api/checkout" method="POST">
                        <button
                          type="submit"
                          className="w-full bg-primary text-background-dark py-6 rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-white transition-all duration-500 shadow-2xl flex items-center justify-center gap-3 active:scale-95"
                        >
                          Forge Payment
                          <MoveRight size={18} />
                        </button>
                     </form>
                     <p className="text-[9px] text-zinc-600 text-center font-bold uppercase tracking-[0.3em]">Identity Verification via Stripe</p>
                  </div>

                  <div className="p-6 rounded-2xl bg-black/40 border border-white/5 text-center relative z-10 group/inner hover:border-primary/20 transition-all">
                     <p className="text-[10px] text-zinc-500 italic leading-relaxed font-serif">
                        &ldquo;Your contribution sustains the guardians of ancient high-vibration crafts.&rdquo;
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
    <div className="space-y-5 group hover:bg-white/1 p-6 rounded-2xl transition-all border border-transparent hover:border-white/5">
       <div className="transition-transform duration-500 group-hover:scale-110">{icon}</div>
       <div className="space-y-2">
         <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-white">{title}</h4>
         <p className="text-xs text-zinc-600 leading-relaxed font-light">{desc}</p>
       </div>
    </div>
  );
}
