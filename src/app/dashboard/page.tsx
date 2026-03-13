import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { 
  User, 
  Settings, 
  ShoppingBag, 
  ChevronRight,
  Clock,
  Heart,
  MapPin,
  CreditCard,
  Sparkles,
  History
} from "lucide-react";
import { SidebarLogoutButton } from "@/components/admin/sidebar-logout-button";

export default async function DashboardPage() {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  const user = session.user;
  const isAdmin = user.role === "ADMIN";

  return (
    <div className="min-h-screen bg-black text-white flex">
      {/* Sidebar */}
      <aside className="w-72 border-r border-white/5 flex flex-col p-8 space-y-12 max-md:hidden bg-zinc-950/50 backdrop-blur-xl">
        <Link href="/" className="px-4">
           <h1 className="text-3xl font-serif italic tracking-widest gold-gradient">Akaal</h1>
        </Link>

        <nav className="flex-1 space-y-4">
          <NavItem icon={<User size={18} />} label="Vessel Profile" active />
          <Link href="/orders" className="block"><NavItem icon={<History size={18} />} label="Manifest History" /></Link>
          <NavItem icon={<Heart size={18} />} label="Intention List" />
          <NavItem icon={<MapPin size={18} />} label="Sancturaries" />
          <NavItem icon={<CreditCard size={18} />} label="Exchange Methods" />
          <NavItem icon={<Settings size={18} />} label="Attunement" />
        </nav>

        <SidebarLogoutButton />
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(212,175,55,0.03),transparent_70%)] pointer-events-none" />

        {/* Header */}
        <header className="h-24 border-b border-white/5 flex items-center justify-between px-10 bg-black/40 backdrop-blur-xl sticky top-0 z-10">
          <div className="flex items-center gap-6">
             <p className="text-[10px] font-bold tracking-[0.4em] uppercase text-zinc-600">Sanctuary Entrance</p>
             {isAdmin && (
               <Link href="/admin" className="px-4 py-1 bg-gold/5 border border-gold/20 text-gold text-[9px] font-bold uppercase tracking-[0.2em] rounded-full hover:bg-gold/10 transition-colors">
                 Overseer Hub
               </Link>
             )}
          </div>
          
          <div className="flex items-center gap-6 group cursor-pointer">
            <div className="text-right max-sm:hidden space-y-0.5">
              <p className="text-sm font-serif italic tracking-wide group-hover:text-gold transition-colors">{user.name}</p>
              <p className="text-[9px] text-zinc-600 font-bold uppercase tracking-[0.2em]">{user.email}</p>
            </div>
            <div className="h-12 w-12 bg-zinc-900 border border-white/10 rounded-2xl flex items-center justify-center overflow-hidden transition-all duration-500 group-hover:border-gold/30 group-hover:scale-105">
              {user.image ? (
                <Image src={user.image} alt={user.name || "User"} width={48} height={48} className="object-cover" />
              ) : (
                <User size={20} className="text-zinc-600 group-hover:text-gold transition-colors" />
              )}
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="p-12 space-y-16 animate-fade-in max-w-6xl relative z-10">
          <header className="space-y-6">
             <div className="h-px w-12 bg-gold/50" />
             <div className="space-y-2">
                <h2 className="text-5xl md:text-6xl font-serif italic text-white tracking-tight leading-tight">
                  Namaste, <span className="gold-gradient">{user.name?.split(' ')[0]}</span>.
                </h2>
                <p className="text-zinc-600 text-sm font-light tracking-widest max-w-xl">
                  Your manifestations are recorded within the timeless essence of Akaal. 
                  Continue your path toward divine attunement.
                </p>
             </div>
          </header>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <StatCard label="Manifested Objects" value="12" sub="Artifacts realized" icon={<Sparkles size={24} />} />
            <StatCard label="Active Journeys" value="02" sub="High vibration transit" icon={<ShoppingBag size={24} />} />
            <StatCard label="Dharma Credits" value="1,240" sub="Sacred contribution" icon={<CreditCard size={24} />} />
          </div>

          {/* Recent Orders Section */}
          <div className="glass border border-white/5 rounded-4xl p-10 space-y-10 group">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                 <h3 className="text-[10px] font-bold uppercase tracking-[0.4em] text-zinc-600 flex items-center gap-3">
                   <Clock size={16} className="text-gold/40" />
                   Timeline of Intentions
                 </h3>
                 <p className="text-lg font-serif italic text-white/80">Recent Harvests</p>
              </div>
              <Link href="/orders" className="text-[10px] text-zinc-500 hover:text-gold flex items-center gap-3 font-bold uppercase tracking-[0.3em] transition-all duration-500 group-hover:translate-x-1">
                View All <ChevronRight size={14} />
              </Link>
            </div>
            
            <div className="grid grid-cols-1 gap-6">
              <ActivityItem id="#ORD-7721" status="Manifested" date="Oct 12, 2025" price="$89.00" />
              <ActivityItem id="#ORD-7645" status="Vibrating" date="Oct 08, 2025" price="$145.00" />
              <ActivityItem id="#ORD-7590" status="Transcending" date="Oct 05, 2025" price="$32.00" />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function NavItem({ icon, label, active = false }: { icon: React.ReactNode, label: string, active?: boolean }) {
  return (
    <div className={`flex items-center gap-5 px-6 py-4 rounded-2xl transition-all duration-500 cursor-pointer group ${
      active 
        ? "glass text-gold border border-gold/20" 
        : "text-zinc-500 hover:text-white hover:bg-white/5"
    }`}>
      <div className={`${active ? 'text-gold' : 'text-zinc-600 group-hover:text-gold'} transition-colors duration-500`}>
        {icon}
      </div>
      <span className="font-bold text-[10px] uppercase tracking-[0.3em]">{label}</span>
    </div>
  );
}

function StatCard({ label, value, sub, icon }: { label: string, value: string, sub: string, icon: React.ReactNode }) {
  return (
    <div className="glass border border-white/5 rounded-4xl p-8 hover:border-gold/20 transition-all duration-700 group relative overflow-hidden">
      <div className="absolute top-0 right-0 p-8 text-gold/5 group-hover:text-gold/10 transition-all duration-700 transform group-hover:scale-125 group-hover:rotate-12">
         {icon}
      </div>
      <p className="text-[9px] text-zinc-600 font-bold uppercase tracking-[0.4em] mb-4">{label}</p>
      <div className="space-y-1">
         <h4 className="text-4xl font-light text-white tracking-widest">{value}</h4>
         <p className="text-[10px] text-zinc-500 font-medium tracking-wide italic">{sub}</p>
      </div>
    </div>
  );
}

function ActivityItem({ id, status, date, price }: { id: string, status: string, date: string, price: string }) {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between p-8 rounded-3xl glass border border-white/5 hover:border-gold/10 transition-all duration-700 group cursor-pointer relative overflow-hidden">
      <div className="absolute inset-x-0 bottom-0 h-px bg-linear-to-r from-transparent via-gold/10 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-1000" />
      
      <div className="flex items-center gap-8">
        <div className="h-16 w-16 glass rounded-2xl flex items-center justify-center border border-white/5 group-hover:scale-110 group-hover:border-gold/20 transition-all duration-700 text-zinc-600 group-hover:text-gold">
          <ShoppingBag size={24} strokeWidth={1} />
        </div>
        <div className="space-y-1">
          <p className="font-serif italic text-xl group-hover:text-gold transition-colors">{id}</p>
          <p className="text-[9px] text-zinc-600 font-bold uppercase tracking-[0.3em]">{date}</p>
        </div>
      </div>
      <div className="flex items-center gap-12 mt-6 md:mt-0">
        <div className="text-right space-y-1">
          <p className="text-[10px] font-bold text-white tracking-widest leading-none">{price}</p>
          <p className="text-[9px] text-zinc-600 uppercase tracking-[0.4em] font-bold">Total Energy</p>
        </div>
        <span className={`text-[9px] font-bold uppercase tracking-[0.3em] px-4 py-1.5 rounded-full border ${
          status === "Manifested" ? "text-gold border-gold/20 bg-gold/5" : "text-zinc-500 border-white/5 bg-white/5"
        }`}>
          {status}
        </span>
      </div>
    </div>
  );
}
