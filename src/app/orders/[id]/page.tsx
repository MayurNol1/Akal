import Link from "next/link";
import { notFound } from "next/navigation";
import { auth } from "@/auth";
import { getOrderForUser } from "@/modules/orders/service";
import { ChevronLeft, Sparkles, Box, Calendar, CreditCard } from "lucide-react";

interface OrderDetailsPageProps {
  params: Promise<{ id: string }>;
}

export const dynamic = "force-dynamic";

const statusMap: Record<string, string> = {
  PENDING: "Transcending",
  COMPLETED: "Manifested",
  CANCELLED: "Returned to Source",
  PROCESSING: "Vibrating",
};

export default async function OrderDetailsPage({ params }: OrderDetailsPageProps) {
  const session = await auth();

  if (!session?.user?.id) {
    return (
      <div className="bg-black min-h-screen flex items-center justify-center text-white p-6">
        <div className="max-w-md w-full glass p-12 rounded-4xl border border-white/5 text-center space-y-8 animate-fade-in">
          <h1 className="text-3xl font-serif italic">Identity Hidden</h1>
          <p className="text-zinc-500 text-sm leading-relaxed font-light tracking-wide">
            Details of this manifestation are only revealed to the path-seeker who initiated it.
          </p>
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

  const { id } = await params;
  const order = await getOrderForUser(session.user.id, id);

  if (!order) {
    return notFound();
  }

  const totalNumber = Number(order.total);
  const statusLabel = statusMap[order.status] || order.status;

  return (
    <div className="bg-black min-h-screen pb-40 text-white">
      {/* Background Aesthetics */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_0%_0%,rgba(30,58,138,0.05),transparent_70%)] pointer-events-none -z-10" />

      <div className="h-32" />
      <div className="max-w-4xl mx-auto px-6 space-y-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-white/5 pb-10">
          <div className="space-y-4">
             <div className="h-px w-12 bg-gold/50" />
             <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-zinc-600">Manifestation Chronicle</p>
             <h1 className="text-4xl md:text-5xl font-serif italic tracking-tight gold-gradient">
               Order <span className="text-white">#{order.id.slice(0, 12).toUpperCase()}</span>
             </h1>
          </div>
          <Link
            href="/orders"
            className="text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-500 hover:text-gold transition-colors flex items-center gap-3 group"
          >
            <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Spiritual History
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
           <MetaItem icon={<Box size={18} />} label="Manifest State" value={statusLabel} />
           <MetaItem icon={<Calendar size={18} />} label="Timeline" value={order.createdAt.toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })} />
           <MetaItem icon={<CreditCard size={18} />} label="Energy Value" value={`$${totalNumber.toFixed(2)}`} />
        </div>

        <div className="space-y-10">
           <div className="space-y-6">
              <h2 className="text-[10px] font-bold uppercase tracking-[0.4em] text-zinc-500 pb-4 border-b border-white/5 flex items-center gap-3">
                 <Sparkles size={12} className="text-gold/60" />
                 Synchronized Artifacts
              </h2>
              <div className="space-y-8">
                {order.items.map((item) => {
                  const unitPrice = Number(item.price);
                  const lineTotal = unitPrice * item.quantity;

                  return (
                    <div key={item.id} className="flex justify-between items-center group">
                       <div className="space-y-2">
                          <h3 className="text-2xl font-serif italic group-hover:text-gold transition-colors duration-500">{item.product.name}</h3>
                          <p className="text-[10px] text-zinc-600 font-bold uppercase tracking-[0.3em]">
                             Quantity: {item.quantity} · ${unitPrice.toFixed(2)} / artifact
                          </p>
                       </div>
                       <div className="text-right">
                          <p className="text-xl font-light text-white tracking-widest leading-none">
                             ${lineTotal.toFixed(2)}
                          </p>
                       </div>
                    </div>
                  );
                })}
              </div>
           </div>

           <div className="pt-12 border-t border-white/5 space-y-12">
              <div className="glass rounded-3xl p-10 border border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-8">
                 <div className="space-y-2">
                    <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-zinc-600">Final Energy Exchange</p>
                    <p className="text-sm text-zinc-500 font-light leading-relaxed">Includes ritual handling, sacred packaging, and high-vibration transit.</p>
                 </div>
                 <div className="text-right">
                    <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-gold mb-2">Total manifest</p>
                    <p className="text-5xl font-light text-white tracking-widest leading-none">
                       ${totalNumber.toFixed(2)}
                    </p>
                 </div>
              </div>

              <div className="p-8 rounded-3xl bg-zinc-900/50 border border-white/5 text-center space-y-4">
                 <p className="text-xs text-zinc-500 italic leading-relaxed font-serif max-w-lg mx-auto">
                    &ldquo;May these artifacts serve as a beacon on your path toward timeless clarity and divine resonance.&rdquo;
                 </p>
                 <div className="h-px w-12 bg-gold/20 mx-auto" />
                 <p className="text-[8px] font-bold uppercase tracking-[0.4em] text-gold">Akaal Sanctuary</p>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}

function MetaItem({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) {
  return (
    <div className="glass rounded-3xl p-6 border border-white/5 space-y-4 group hover:border-gold/20 transition-all duration-500">
       <div className="text-gold/40 group-hover:text-gold group-hover:scale-110 transition-all duration-500">{icon}</div>
       <div className="space-y-1">
          <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-zinc-600">{label}</p>
          <p className="text-sm font-medium tracking-wide text-zinc-300 group-hover:text-white transition-colors">{value}</p>
       </div>
    </div>
  );
}
