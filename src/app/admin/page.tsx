import { 
  Package, 
  ShoppingBag, 
  Users, 
  ArrowUpRight, 
  ArrowDownRight,
  Plus,
  DollarSign,
  Sparkles
} from "lucide-react";
import Link from "next/link";

export default function AdminDashboardPage() {
  return (
    <div className="space-y-16 animate-fade-in">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div className="space-y-4">
           <div className="h-px w-12 bg-gold/50" />
           <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-zinc-600">Sanctuary Monitoring</p>
           <h1 className="text-5xl font-serif italic gold-gradient tracking-tight">Vibration <span className="text-white">Overview</span></h1>
        </div>
        <Link 
          href="/admin/products/create"
          className="bg-white text-black px-8 py-4 rounded-xl text-[10px] font-bold uppercase tracking-[0.2em] flex items-center gap-3 hover:bg-gold transition-all duration-500 shadow-2xl active:scale-95 whitespace-nowrap"
        >
          <Plus size={16} />
          Forge New Artifact
        </Link>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <StatCard 
          label="Manifested Revenue" 
          value="$128,450.00" 
          delta="+14.2%" 
          positive 
          icon={<DollarSign className="text-gold" size={18} />} 
        />
        <StatCard 
          label="Sacred Orders" 
          value="1,482" 
          delta="+8.1%" 
          positive 
          icon={<ShoppingBag className="text-gold" size={18} />} 
        />
        <StatCard 
          label="Artifact Vault" 
          value="156" 
          delta="-2.4%" 
          positive={false} 
          icon={<Package className="text-gold" size={18} />} 
        />
        <StatCard 
          label="Ancient Seekers" 
          value="428" 
          delta="+12.5%" 
          positive 
          icon={<Users className="text-gold" size={18} />} 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Performance Graph Placeholder */}
        <div className="lg:col-span-2 glass border border-white/5 rounded-4xl p-10 space-y-8 group">
           <div className="flex items-center justify-between">
              <h3 className="text-[10px] font-bold uppercase tracking-[0.4em] text-zinc-600 flex items-center gap-3">
                 <Sparkles size={14} className="text-gold/40" />
                 Energy Flux Performance
              </h3>
              <select className="bg-transparent border border-white/5 rounded-lg text-[9px] font-bold uppercase tracking-[0.2em] px-3 py-1.5 text-zinc-500 outline-none">
                 <option>Last 7 Moons</option>
                 <option>Last Solar Year</option>
              </select>
           </div>
          <div className="h-[350px] flex items-center justify-center border border-white/5 rounded-3xl bg-zinc-950/50 relative overflow-hidden group">
             <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.02),transparent_70%)] group-hover:scale-150 transition-transform duration-1000" />
             <p className="text-zinc-700 font-serif italic text-lg tracking-widest relative z-10">Analytics Harmony Visualizing...</p>
          </div>
        </div>

        <div className="glass border border-white/5 rounded-4xl p-10 flex flex-col space-y-10">
          <h3 className="text-[10px] font-bold uppercase tracking-[0.4em] text-zinc-600 border-b border-white/5 pb-6">Vault Status</h3>
          <div className="space-y-8 flex-1">
            <InventoryRow label="Transcended (Out)" count={4} color="bg-red-900 shadow-[0_0_10px_rgba(153,27,27,0.5)]" />
            <InventoryRow label="Fading (Low)" count={12} color="bg-amber-900 shadow-[0_0_10px_rgba(120,53,15,0.5)]" />
            <InventoryRow label="Vibrant (Healthy)" count={140} color="bg-emerald-900 shadow-[0_0_10px_rgba(6,78,59,0.5)]" />
          </div>
          <Link href="/admin/products" className="group flex items-center justify-center gap-3 py-4 rounded-xl border border-white/5 text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-600 hover:text-gold hover:border-gold/20 transition-all duration-500">
            Manage Catalog
            <ArrowUpRight size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, delta, positive, icon }: { label: string, value: string, delta: string, positive: boolean, icon: React.ReactNode }) {
  return (
    <div className="glass border border-white/5 p-8 rounded-4xl hover:border-gold/20 transition-all duration-700 group relative overflow-hidden">
      <div className="absolute top-0 right-0 p-6 text-gold/5 group-hover:text-gold/10 transition-all duration-700 transform group-hover:scale-110">
         {icon}
      </div>
      <div className="flex justify-between items-start mb-6">
        <div className="h-12 w-12 glass rounded-2xl flex items-center justify-center border border-white/5 group-hover:border-gold/20 transition-all duration-500">
          {icon}
        </div>
        <div className={`flex items-center text-[10px] font-bold gap-1 px-2 py-0.5 rounded-full ${positive ? "text-emerald-500 bg-emerald-500/5" : "text-red-500 bg-red-500/5"}`}>
          {positive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
          {delta}
        </div>
      </div>
      <div className="space-y-1">
        <p className="text-zinc-600 text-[10px] font-bold uppercase tracking-[0.4em]">{label}</p>
        <h4 className="text-3xl font-light text-white tracking-widest leading-none mt-2">{value}</h4>
      </div>
    </div>
  );
}

function InventoryRow({ label, count, color }: { label: string, count: number, color: string }) {
  return (
    <div className="flex items-center justify-between group">
      <div className="flex items-center gap-4">
        <div className={`h-3 w-3 rounded-full ${color} group-hover:scale-125 transition-transform`} />
        <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-500 group-hover:text-zinc-300 transition-colors">{label}</span>
      </div>
      <span className="text-lg font-light text-white tracking-widest">{count}</span>
    </div>
  );
}
