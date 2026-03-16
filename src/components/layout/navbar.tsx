"use client";

import Link from "next/link";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";
import { Loader2, LogOut } from "lucide-react";
import { usePathname } from "next/navigation";
import { CartPlaceholder } from "@/components/cart/cart-placeholder";

export function Navbar() {
  const { data: session, status } = useSession();
  const pathname = usePathname();

  // Hide global navbar on specialized pages (Auth, Dashboard, Admin)
  const isAuthPage = pathname?.startsWith("/login") || pathname?.startsWith("/register");
  const isManagementPage = pathname?.startsWith("/admin");

  if (isAuthPage || isManagementPage) return null;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background-dark/70 backdrop-blur-xl border-b border-primary/10">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-12">
          <Link href="/" className="flex items-center gap-2 group">
            <span className="material-symbols-outlined text-primary text-3xl group-hover:rotate-90 transition-transform duration-500">flare</span>
            <h1 className="font-serif text-2xl font-black tracking-tighter text-white">AKAAL</h1>
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <Link className="text-sm font-medium text-slate-300 hover:text-primary transition-colors uppercase tracking-widest text-[10px]" href="/products">Products</Link>
            <Link className="text-sm font-medium text-slate-300 hover:text-primary transition-colors uppercase tracking-widest text-[10px]" href="/about">About</Link>
            {session && (
              <>
                <Link className="text-sm font-medium text-slate-300 hover:text-primary transition-colors uppercase tracking-widest text-[10px]" href="/orders">Orders</Link>
                <Link className="text-sm font-medium text-slate-300 hover:text-primary transition-colors uppercase tracking-widest text-[10px]" href="/dashboard">Profile</Link>
              </>
            )}
          </div>
        </div>

        <div className="flex items-center gap-6">
          <form action="/products" className="relative hidden lg:block">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xl">search</span>
            <input 
              name="query"
              className="bg-white/5 border border-white/10 rounded-full py-2 pl-10 pr-4 text-sm focus:ring-1 focus:ring-primary focus:border-primary w-64 text-white placeholder-slate-500 outline-none transition-all focus:w-80" 
              placeholder="Search sacred items..." 
              type="text"
            />
          </form>

          <Link href="/cart" className="relative p-2 text-primary hover:scale-110 transition-transform flex items-center">
            <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>shopping_cart</span>
            <CartPlaceholder />
          </Link>

          {status === "loading" ? (
            <Loader2 className="w-5 h-5 text-zinc-500 animate-spin" />
          ) : session ? (
            <div className="flex items-center gap-4">
               {session.user?.role === "ADMIN" && (
                  <Link
                    href="/admin"
                    className="text-[10px] font-bold uppercase tracking-[0.25em] text-primary border border-primary/20 px-4 py-1.5 rounded-full bg-primary/5 hover:bg-primary/10 transition-all"
                  >
                    Zen Admin
                  </Link>
                )}
                <Link href="/dashboard" title="Profile Dashboard" className="h-10 w-10 rounded-full border-2 border-primary/30 overflow-hidden cursor-pointer hover:border-primary transition-colors relative">
                  <Image 
                    className="object-cover" 
                    src={session.user?.image || "https://lh3.googleusercontent.com/aida-public/AB6AXuDb9HxOmlluH2qUdJkJzGw0kBx49GCM0HpWK5hrJJE0zuqXExpKlTBAIgmxzvVgRKw6Ny46fqG9KIj4nLjOjB-ljAg2W6oXuI0cqCnyI1s9AgrsQRY0iHEb5g08VHRGOVW0iXh30dhVPSLnLCcyiOPTdtwdEKkinVMq3kovK6x2Vh18D0OxW5Mmkis_2TtVZpYMUI9fX2O5On1dIcDKT-3nbj64A56WkBYyMkz_dXUaIAvDxPLjRwbrDUqjz6p4febEV8uKJtS0sA4"} 
                    alt="User profile"
                    fill
                  />
                </Link>
                <button
                  onClick={() => signOut({ callbackUrl: "/" })}
                  title="Sever Connection"
                  className="p-2 text-zinc-500 hover:text-red-400 transition-colors bg-white/5 rounded-full hover:bg-red-400/10"
                >
                  <LogOut size={16} />
                </button>
            </div>
          ) : (
            <Link
              href="/login"
              className="bg-primary text-background-dark px-8 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-white transition-all shadow-lg shadow-primary/10"
            >
              Enter Sanctuary
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

