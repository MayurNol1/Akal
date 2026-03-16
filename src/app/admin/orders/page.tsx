import { Package, Clock, CheckCircle2, Truck, Search, Filter } from "lucide-react";
import prisma from "@/lib/prisma";
import { auth } from "@/auth";

export const dynamic = "force-dynamic";

export default async function AdminOrdersPage() {
  const session = await auth();
  if (session?.user?.role !== "ADMIN") return null;

  const ordersDb = await prisma.order.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      user: true,
      items: {
        include: { product: true }
      }
    }
  });

  const orders = ordersDb.map(val => ({
    id: val.id,
    user: val.user.name || "Unknown Seeker",
    email: val.user.email,
    items: val.items.map(i => i.product.name).join(", "),
    price: `₹${parseFloat(val.total.toString()).toLocaleString()}`,
    status: val.status === 'PENDING' ? 'Processing' : 
            val.status === 'SHIPPED' ? 'Shipped' :
            val.status === 'DELIVERED' ? 'Delivered' : 'Paid',
  }));

  return (
    <div className="space-y-12 animate-fade-in relative z-10">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-white/5 pb-10">
        <div className="space-y-4">
           <div className="h-px w-12 bg-primary/50" />
           <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-zinc-600">Sacred Manifestation Logs</p>
           <h1 className="text-5xl font-serif italic text-white tracking-tight">Order <span className="text-primary not-italic">Registry</span></h1>
        </div>
        <div className="flex gap-4">
           <div className="bg-white/5 px-6 py-4 rounded-xl border border-white/5 flex items-center gap-3 text-[10px] font-black text-zinc-400 uppercase tracking-widest">
              <Clock size={16} className="text-primary" />
              {orders.filter(o => o.status === 'Processing').length} Pending Rituals
           </div>
        </div>
      </header>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-6 items-center">
        <div className="relative flex-1 group w-full">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-zinc-600 group-hover:text-primary transition-colors duration-500" size={18} />
          <input 
            type="text" 
            placeholder="Search manifests by Seeker name or Order ID..."
            className="w-full bg-white/2 border border-white/5 rounded-[20px] py-4 pl-14 pr-6 focus:outline-none focus:border-primary/30 transition-all text-xs font-medium placeholder:text-zinc-800"
          />
        </div>
        <div className="bg-white/2 px-6 py-4 rounded-[20px] border border-white/5 flex items-center gap-4 text-[10px] font-black text-zinc-600 uppercase tracking-widest cursor-pointer hover:border-white/10 transition-colors w-full md:w-auto whitespace-nowrap">
           <Filter size={16} />
           Status: All Cycles
        </div>
      </div>

      {/* Orders Table from Stitch */}
      <div className="bg-white/2 border border-white/5 rounded-[40px] overflow-hidden shadow-2xl transition-all duration-700 hover:border-primary/5">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-white/1 border-b border-white/5 text-left text-[9px] uppercase tracking-[0.4em] text-zinc-600">
              <th className="px-10 py-6 font-bold">Manifest ID</th>
              <th className="px-10 py-6 font-bold">Seeker Details</th>
              <th className="px-10 py-6 font-bold">Artifacts</th>
              <th className="px-10 py-6 font-bold text-right">Ritual Value</th>
              <th className="px-10 py-6 font-bold text-center">Current State</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {orders.map((order) => (
              <OrderRow 
                key={order.id}
                id={order.id} 
                user={order.user} 
                email={order.email} 
                items={order.items} 
                price={order.price} 
                status={order.status} 
                icon={order.status === "Processing" ? <Clock size={14} /> : order.status === "Shipped" ? <Truck size={14} /> : <CheckCircle2 size={14} />} 
                statusClass={
                  order.status === "Processing" ? "bg-primary/5 text-primary border-primary/20 shadow-[0_0_12px_rgba(236,149,19,0.1)]" :
                  order.status === "Shipped" ? "bg-blue-500/5 text-blue-400 border-blue-500/20 shadow-[0_0_12px_rgba(59,130,246,0.1)]" :
                  "bg-emerald-500/5 text-emerald-400 border-emerald-500/20 shadow-[0_0_12px_rgba(16,185,129,0.1)]"
                }
              />
            ))}
          </tbody>
        </table>
        
        {orders.length === 0 && (
          <div className="p-32 flex flex-col items-center justify-center text-center space-y-6 bg-black/40">
            <Package size={64} className="text-zinc-800" strokeWidth={1} />
            <div className="space-y-1">
              <p className="text-zinc-500 font-serif italic text-xl tracking-widest text-white">The registry is silent.</p>
              <p className="text-[10px] text-zinc-700 font-black uppercase tracking-[0.4em]">Waiting for first manifestation</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function OrderRow({ id, user, email, items, price, status, icon, statusClass }: {
  id: string,
  user: string,
  email: string,
  items: string,
  price: string,
  status: string,
  icon: React.ReactNode,
  statusClass: string
}) {
  return (
    <tr className="hover:bg-white/3 transition-all duration-500 group">
      <td className="px-10 py-8">
        <p className="text-[10px] font-mono text-zinc-500 font-black uppercase tracking-widest italic group-hover:text-primary transition-colors">#{id}</p>
      </td>
      <td className="px-10 py-8">
        <div className="space-y-1">
          <p className="font-serif font-black text-white italic group-hover:text-primary transition-colors">{user}</p>
          <p className="text-[9px] text-zinc-600 font-bold uppercase tracking-widest">{email}</p>
        </div>
      </td>
      <td className="px-10 py-8">
        <p className="text-[11px] font-serif font-bold italic text-zinc-400 max-w-[200px] truncate group-hover:text-white transition-colors">
          {items}
        </p>
      </td>
      <td className="px-10 py-8 text-right">
        <p className="text-xl font-serif font-black text-white italic tracking-widest group-hover:text-primary transition-colors duration-500">
          {price}
        </p>
      </td>
      <td className="px-10 py-8">
        <div className="flex justify-center">
          <span className={`inline-flex items-center gap-2 px-5 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest border transition-all ${statusClass}`}>
            {icon}
            {status}
          </span>
        </div>
      </td>
    </tr>
  );
}
