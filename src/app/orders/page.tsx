import Link from "next/link";
import { auth } from "@/auth";
import { getOrdersForUser } from "@/modules/orders/service";
import { History, Sparkles, ChevronRight, User } from "lucide-react";

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
      <div className="bg-black min-h-screen flex items-center justify-center text-white p-6">
        <div className="max-w-md w-full glass p-12 rounded-4xl border border-white/5 text-center space-y-8 animate-fade-in">
          <div className="h-20 w-20 glass rounded-3xl mx-auto flex items-center justify-center border-white/10">
             <User className="text-gold/60" size={32} />
          </div>
          <div className="space-y-4">
            <h1 className="text-3xl font-serif italic">Identity Hidden</h1>
            <p className="text-zinc-500 text-sm leading-relaxed font-light tracking-wide">
              We cannot reveal your manifestation history until you enter the sanctuary.
            </p>
          </div>
          <Link
            href="/login"
            className="block w-full py-4 rounded-xl bg-white text-black text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-gold transition-all duration-500"
          >
            Sign In to Verify
          </Link>
        </div>
      </div>
    );
  }

  const orders = await getOrdersForUser(session.user.id);

  return (
    <div className="bg-black min-h-screen pb-40 text-white">
      {/* Background Aesthetics */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(212,175,55,0.03),transparent_70%)] pointer-events-none -z-10" />

      <div className="h-32" />
      <div className="max-w-5xl mx-auto px-6 space-y-20">
        <div className="space-y-6">
           <div className="h-px w-12 bg-gold/50" />
           <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
              <div className="space-y-4">
                 <h1 className="text-5xl md:text-6xl font-serif italic tracking-tight gold-gradient leading-tight">
                   Spiritual <span className="text-white">History</span>
                 </h1>
                 <p className="text-zinc-600 text-[10px] font-bold uppercase tracking-[0.4em]">Reviewing Your Manifested Journey</p>
              </div>
              <div className="flex items-center gap-4 text-sm text-zinc-500 font-light tracking-wide">
                 <Sparkles size={16} className="text-gold/40" />
                 <span>Artifacts harmonized: {orders.length}</span>
              </div>
           </div>
        </div>

        {orders.length === 0 ? (
          <div className="glass border border-white/5 rounded-4xl py-32 flex flex-col items-center justify-center space-y-10 animate-fade-in text-center px-6">
            <div className="h-24 w-24 glass rounded-full flex items-center justify-center border-white/5 mb-4 group overflow-hidden relative">
               <History size={40} className="text-zinc-800 relative z-10" strokeWidth={0.5} />
               <div className="absolute inset-0 bg-gold/5 scale-0 group-hover:scale-100 transition-transform duration-1000" />
            </div>
            <div className="space-y-4">
               <p className="text-zinc-500 font-serif italic text-2xl tracking-widest leading-relaxed">Your journey is yet to be recorded.</p>
               <p className="text-zinc-700 text-[10px] font-bold uppercase tracking-[0.4em]">No artifacts have been claimed</p>
            </div>
            <Link
              href="/products"
              className="px-10 py-4 rounded-xl bg-white text-black text-[10px] font-bold uppercase tracking-[0.2em] shadow-2xl hover:bg-gold transition-colors duration-500"
            >
              Consult the Collection
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8 animate-fade-in">
            {orders.map((order) => {
              const totalNumber = Number(order.total);
              const statusLabel = statusMap[order.status] || order.status;

              return (
                <Link
                  key={order.id}
                  href={`/orders/${order.id}`}
                  className="group block glass border border-white/5 rounded-3xl p-8 hover:border-gold/30 transition-all duration-700 hover:shadow-[0_0_30px_rgba(212,175,55,0.03)] overflow-hidden relative"
                >
                  <div className="absolute inset-x-0 bottom-0 h-px bg-linear-to-r from-transparent via-gold/10 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-1000" />
                  
                  <div className="flex flex-col md:flex-row justify-between gap-8 md:items-center relative z-10">
                    <div className="space-y-4">
                       <div className="flex items-center gap-4">
                          <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.3em]">Manifestation ID</span>
                          <span className="text-[10px] font-mono text-gold font-bold bg-gold/5 px-2 py-0.5 rounded border border-gold/10">
                            #{order.id.slice(0, 12).toUpperCase()}
                          </span>
                       </div>
                       <h3 className="text-xl font-serif italic text-white group-hover:tracking-wider transition-all duration-700">
                          {order.items.length} Artifact{order.items.length === 1 ? "" : "s"} Synchronized
                       </h3>
                       <div className="flex items-center gap-6 text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-600">
                          <span>Timeline: {order.createdAt.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                          <div className="w-px h-3 bg-white/5" />
                          <span>Energy Total: ${totalNumber.toFixed(2)}</span>
                       </div>
                    </div>

                    <div className="flex items-center gap-12">
                       <div className="text-right space-y-2">
                          <p className="text-[9px] text-zinc-600 uppercase tracking-[0.4em] font-bold">State</p>
                          <p className={`text-[10px] font-bold uppercase tracking-[0.3em] px-4 py-1.5 rounded-full border ${
                            order.status === 'DELIVERED' ? 'text-gold border-gold/20 bg-gold/5' : 'text-zinc-400 border-white/5 bg-white/5'
                          }`}>
                            {statusLabel}
                          </p>
                       </div>
                       <div className="h-12 w-12 glass rounded-full flex items-center justify-center border-white/5 text-zinc-600 group-hover:text-gold group-hover:border-gold/20 transition-all duration-500 group-hover:translate-x-1">
                          <ChevronRight size={18} />
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
