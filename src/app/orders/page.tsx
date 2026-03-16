import Link from "next/link";
import { auth } from "@/auth";
import { getOrdersForUser } from "@/modules/orders/service";
import { History, Sparkles, ChevronRight, User, MoveRight } from "lucide-react";

export const dynamic = "force-dynamic";

const statusMap: Record<string, string> = {
  PENDING: "Transcending",
  PAID: "Manifesting",
  SHIPPED: "Vibrating",
  DELIVERED: "Manifested",
  CANCELLED: "Returned to Source",
};

export default async function OrdersPage() {
  const session = await auth();

  if (!session?.user?.id) {
    return (
      <div className="bg-background-dark min-h-screen flex items-center justify-center text-white p-6">
        <div className="max-w-md w-full bg-white/5 p-12 rounded-[32px] border border-white/5 text-center space-y-8 animate-fade-in shadow-2xl">
          <div className="h-20 w-20 bg-primary/10 rounded-full mx-auto flex items-center justify-center border border-primary/20">
             <User className="text-primary" size={32} />
          </div>
          <div className="space-y-4">
            <h1 className="text-3xl font-serif font-black uppercase tracking-widest leading-tight">Identity Hidden</h1>
            <p className="text-zinc-500 text-sm leading-relaxed font-light tracking-wide max-w-xs mx-auto">
              We cannot reveal your manifestation history until you enter the sanctuary.
            </p>
          </div>
          <Link
            href="/login"
            className="group flex items-center justify-center gap-3 w-full py-5 rounded-xl bg-primary text-background-dark text-xs font-black uppercase tracking-[0.2em] hover:bg-white transition-all duration-700 shadow-xl"
          >
            Sign In to Verify
            <MoveRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    );
  }

  const orders = await getOrdersForUser(session.user.id);

  return (
    <div className="bg-background-dark min-h-screen pb-40 text-white">
      {/* Background Aesthetics */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(236,149,19,0.05),transparent_70%)] pointer-events-none -z-10" />

      <div className="h-32" />
      <div className="max-w-5xl mx-auto px-6 space-y-20">
        <div className="space-y-10">
           <div className="h-px w-16 bg-primary" />
           <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
              <div className="space-y-4">
                 <h1 className="text-5xl md:text-7xl font-serif font-black tracking-tighter leading-tight drop-shadow-2xl">
                   Spiritual <span className="text-primary italic">History</span>
                 </h1>
                 <p className="text-zinc-500 text-[10px] font-black uppercase tracking-[0.4em] ml-1">Reviewing Your Manifested Journey</p>
              </div>
              <div className="flex items-center gap-6 px-8 py-3 bg-white/2 border border-white/5 rounded-2xl text-[10px] font-black uppercase tracking-widest text-zinc-500">
                 <Sparkles size={16} className="text-primary/40" />
                 <span>Artifacts harmonized: <span className="text-white font-mono ml-2 tracking-normal">{orders.length}</span></span>
              </div>
           </div>
        </div>

        {orders.length === 0 ? (
          <div className="bg-white/2 border border-white/5 rounded-[40px] py-40 flex flex-col items-center justify-center space-y-12 animate-fade-in text-center px-10 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2" />
            <div className="h-28 w-28 bg-background-dark/50 rounded-full flex items-center justify-center border-2 border-white/5 mb-4 group overflow-hidden relative text-zinc-800">
               <History size={48} className="relative z-10" strokeWidth={0.5} />
               <div className="absolute inset-0 bg-primary/5 scale-0 group-hover:scale-100 transition-transform duration-1000" />
            </div>
            <div className="space-y-6">
               <p className="text-zinc-400 font-serif italic text-3xl tracking-widest leading-relaxed">Your journey is yet to be recorded.</p>
               <p className="text-zinc-600 text-[10px] font-black uppercase tracking-[0.5em]">No artifacts have been claimed</p>
            </div>
            <Link
              href="/products"
              className="px-12 py-5 rounded-xl bg-primary text-background-dark text-xs font-black uppercase tracking-[0.2em] shadow-2xl hover:bg-white transition-all duration-700 transform hover:scale-105"
            >
              Consult the Collection
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-10 animate-fade-in">
            {orders.map((order) => {
              const totalNumber = Number(order.total);
              const statusLabel = statusMap[order.status] || order.status;

              return (
                <Link
                  key={order.id}
                  href={`/orders/${order.id}`}
                  className="group block bg-white/2 border border-white/5 rounded-[32px] p-10 hover:border-primary/30 transition-all duration-1000 hover:shadow-primary/5 overflow-hidden relative shadow-xl"
                >
                  <div className="absolute inset-x-0 bottom-0 h-0.5 bg-linear-to-r from-transparent via-primary/20 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-1000" />
                  
                  <div className="flex flex-col md:flex-row justify-between gap-10 md:items-center relative z-10">
                    <div className="space-y-6">
                       <div className="flex items-center gap-6">
                          <span className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.3em]">Manifestation ID</span>
                          <span className="text-[10px] font-mono text-primary font-black bg-primary/5 px-3 py-1 rounded-lg border border-primary/20 tracking-normal shadow-inner">
                            #{order.id.slice(0, 12).toUpperCase()}
                          </span>
                       </div>
                       <h3 className="text-3xl font-serif font-black italic text-white group-hover:text-primary transition-all duration-700">
                          {order.items.length} Artifact{order.items.length === 1 ? "" : "s"} Synchronized
                       </h3>
                       <div className="flex items-center gap-8 text-[10px] font-black uppercase tracking-[0.25em] text-zinc-500">
                          <span className="flex items-center gap-2 italic">Timeline: <span className="text-zinc-400 not-italic ml-1">{order.createdAt.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}</span></span>
                          <div className="w-1.5 h-1.5 rounded-full bg-white/10" />
                          <span className="flex items-center gap-2 italic">Energy Total: <span className="text-white font-serif font-bold text-lg not-italic ml-1">${totalNumber.toFixed(2)}</span></span>
                       </div>
                    </div>

                    <div className="flex items-center gap-16">
                       <div className="text-right space-y-2">
                          <p className="text-[9px] text-zinc-600 uppercase tracking-[0.5em] font-black">Spiritual State</p>
                          <p className={`text-[10px] font-black uppercase tracking-[0.3em] px-6 py-2.5 rounded-xl border transition-all ${
                            order.status === 'DELIVERED' ? 'text-primary border-primary/20 bg-primary/5 shadow-lg shadow-primary/5' : 'text-zinc-400 border-white/5 bg-white/2'
                          }`}>
                            {statusLabel}
                          </p>
                       </div>
                       <div className="h-16 w-16 bg-background-dark/50 rounded-2xl flex items-center justify-center border border-white/5 text-zinc-600 group-hover:text-primary group-hover:border-primary/20 transition-all duration-1000 group-hover:translate-x-2 relative overflow-hidden">
                          <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                          <ChevronRight size={20} className="relative z-10" />
                       </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
