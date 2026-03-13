import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { 
  BarChart3, 
  Package, 
  ShoppingBag, 
  Users, 
  Settings, 
  ExternalLink,
  ChevronRight,
  House,
  Eye
} from "lucide-react";
import { SidebarLogoutButton } from "@/components/admin/sidebar-logout-button";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session || session.user.role !== "ADMIN") {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-black text-white flex">
      {/* Overseer Sidebar */}
      <aside className="w-72 border-r border-white/5 flex flex-col bg-zinc-950/50 backdrop-blur-2xl p-8 fixed h-full z-40">
        <div className="mb-12 px-4 space-y-4">
           <Link href="/">
              <h1 className="text-3xl font-serif italic tracking-widest gold-gradient">Akaal</h1>
           </Link>
           <div className="px-4 py-1.5 bg-gold/5 border border-gold/20 rounded-full inline-flex items-center gap-2">
              <Eye size={12} className="text-gold" />
              <span className="text-[9px] text-gold uppercase font-black tracking-[0.3em]">Overseer Hub</span>
           </div>
        </div>

        <nav className="flex-1 space-y-2">
          <AdminNavItem href="/admin" icon={<BarChart3 size={18} />} label="Vibration Stats" />
          <AdminNavItem href="/admin/products" icon={<Package size={18} />} label="Artifact Vault" />
          <AdminNavItem href="/admin/orders" icon={<ShoppingBag size={18} />} label="Manifest Logs" />
          <AdminNavItem href="/admin/users" icon={<Users size={18} />} label="Seekers" />
          <AdminNavItem href="/admin/settings" icon={<Settings size={18} />} label="Core Settings" />
          
          <div className="pt-8 mt-8 border-t border-white/5 space-y-2">
            <AdminNavItem href="/" icon={<House size={18} />} label="Temple Entrance" />
            <AdminNavItem href="/dashboard" icon={<ExternalLink size={18} />} label="User Profile" />
          </div>
        </nav>

        <div className="mt-auto space-y-6">
          <SidebarLogoutButton />
          <div className="p-5 bg-white/5 rounded-2xl border border-white/5 space-y-1 group">
            <p className="text-[9px] text-zinc-600 font-bold uppercase tracking-[0.4em]">Administrator</p>
            <p className="text-sm font-serif italic tracking-wide group-hover:text-gold transition-colors truncate">{session.user.name || session.user.email}</p>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 ml-72 min-h-screen flex flex-col relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(212,175,55,0.02),transparent_70%)] pointer-events-none" />
        
        {/* Subtle top indicator */}
        <div className="h-px w-full bg-linear-to-r from-transparent via-gold/30 to-transparent opacity-50" />
        
        <div className="p-12 max-w-7xl mx-auto w-full relative z-10 animate-fade-in">
          {children}
        </div>
      </main>
    </div>
  );
}

function AdminNavItem({ href, icon, label }: { href: string, icon: React.ReactNode, label: string }) {
  return (
    <Link 
      href={href}
      className="flex items-center justify-between group px-5 py-4 rounded-xl transition-all duration-500 hover:glass text-zinc-500 hover:text-white hover:border-white/5 border border-transparent"
    >
      <div className="flex items-center gap-4">
        <div className="group-hover:text-gold transition-colors duration-500">
           {icon}
        </div>
        <span className="font-bold text-[10px] uppercase tracking-[0.3em]">{label}</span>
      </div>
      <ChevronRight className="opacity-0 group-hover:opacity-40 group-hover:translate-x-1 transition-all duration-500" size={14} />
    </Link>
  );
}
