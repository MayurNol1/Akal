import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import { ShoppingBag, Search, Filter, History } from "lucide-react";

export const dynamic = "force-dynamic";



export default async function AdminOrdersPage() {
  const session = await auth();

  if (!session || session.user.role !== "ADMIN") {
    redirect("/login");
  }

  const orders = await prisma.order.findMany({
    include: {
      user: true,
      items: {
        include: {
          product: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-16 animate-fade-in relative z-10">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-white/5 pb-10">
        <div className="space-y-4">
           <div className="h-px w-12 bg-gold/50" />
           <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-zinc-600">Sacred Manifest Logs</p>
           <h1 className="text-5xl font-serif italic gold-gradient tracking-tight">Order <span className="text-white">Registry</span></h1>
        </div>
        
        <div className="flex items-center gap-4">
           <div className="glass px-6 py-3 rounded-xl border border-white/5 flex items-center gap-4 text-xs font-bold text-zinc-500">
             <Search size={16} />
             <input type="text" placeholder="Search Seekers..." className="bg-transparent border-none focus:outline-none placeholder:text-zinc-700 w-40" />
           </div>
           <div className="glass px-4 py-3 rounded-xl border border-white/5 text-zinc-500 hover:text-white transition-colors cursor-pointer">
              <Filter size={18} />
           </div>
        </div>
      </header>

      {orders.length === 0 ? (
        <div className="glass border border-white/5 rounded-4xl py-32 flex flex-col items-center justify-center space-y-8 text-center px-10">
           <div className="h-20 w-20 glass rounded-3xl flex items-center justify-center border-white/5 mb-4">
              <History size={40} className="text-zinc-800" strokeWidth={0.5} />
           </div>
           <div className="space-y-2">
              <p className="text-zinc-600 font-serif italic text-2xl tracking-widest leading-relaxed">The registry is silent.</p>
              <p className="text-[10px] text-zinc-700 font-bold uppercase tracking-[0.4em]">No manifests recorded in this era</p>
           </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-8">
          {orders.map((order) => {
            const totalNumber = Number(order.total);

            return (
              <div
                key={order.id}
                className="group glass border border-white/5 rounded-4xl p-10 hover:border-gold/20 transition-all duration-700 relative overflow-hidden"
              >
                <div className="absolute inset-x-0 bottom-0 h-px bg-linear-to-r from-transparent via-gold/10 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-1000" />
                
                <div className="flex flex-col lg:flex-row justify-between gap-12 lg:items-center relative z-10">
                  <div className="space-y-6">
                    <div className="flex items-center gap-6">
                      <div className="h-16 w-16 glass rounded-2xl flex items-center justify-center border border-white/5 group-hover:border-gold/20 transition-all duration-500 text-zinc-600 group-hover:text-gold group-hover:scale-110">
                        <ShoppingBag size={24} strokeWidth={1} />
                      </div>
                      <div className="space-y-1">
                        <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-[0.4em]">Manifest ID</p>
                        <p className="text-xl font-serif italic text-white group-hover:text-gold transition-colors duration-500 truncate max-w-[200px]">
                          #{order.id.slice(0, 16).toUpperCase()}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex flex-col gap-1">
                       <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em]">{order.user.name}</p>
                       <p className="text-xs text-zinc-600 hover:text-zinc-400 transition-colors cursor-pointer">{order.user.email}</p>
                    </div>
                  </div>

                  <div className="flex-1 lg:max-w-md">
                     <p className="text-[9px] text-zinc-600 uppercase tracking-[0.4em] font-bold mb-4 border-b border-white/5 pb-2">Contained Artifacts</p>
                     <div className="space-y-3">
                        {order.items.map((item) => (
                           <div key={item.id} className="flex justify-between items-center text-[11px] tracking-wide">
                              <span className="text-zinc-400 font-medium italic font-serif">{item.product.name}</span>
                              <span className="text-zinc-600 font-bold uppercase tracking-widest bg-white/5 px-2 py-0.5 rounded">x{item.quantity}</span>
                           </div>
                        ))}
                     </div>
                  </div>

                  <div className="flex flex-col items-end gap-8">
                    <div className="text-right space-y-1">
                      <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-[0.4em]">Energy Total</p>
                      <p className="text-3xl font-light text-white tracking-widest leading-none">
                        ${totalNumber.toFixed(2)}
                      </p>
                    </div>

                    <div className="flex items-center gap-4">
                       <form
                        action={`/api/admin/orders`}
                        method="POST"
                        className="flex items-center gap-4"
                      >
                        <input type="hidden" name="orderId" value={order.id} />
                        <div className="relative group/select">
                           <select
                              name="status"
                              defaultValue={order.status}
                              className="bg-black border border-white/10 text-zinc-400 text-[10px] font-bold uppercase tracking-[0.2em] rounded-xl px-6 py-3 appearance-none outline-none group-hover/select:border-gold/30 transition-all cursor-pointer min-w-[180px]"
                           >
                              <option value="PENDING">Transcending</option>
                              <option value="PAID">Manifesting</option>
                              <option value="SHIPPED">Vibrating</option>
                              <option value="DELIVERED">Manifested</option>
                              <option value="CANCELLED">Source Return</option>
                           </select>
                           <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-700">
                              <Filter size={12} />
                           </div>
                        </div>
                        <button
                          type="submit"
                          className="text-[10px] font-bold uppercase tracking-[0.2em] bg-white text-black px-6 py-3 rounded-xl hover:bg-gold transition-all duration-500 shadow-xl"
                        >
                          Sync
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
