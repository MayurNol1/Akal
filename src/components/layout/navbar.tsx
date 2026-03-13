"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { Loader2 } from "lucide-react";
import { usePathname } from "next/navigation";
import { CartPlaceholder } from "@/components/cart/cart-placeholder";

export function Navbar() {
  const { data: session, status } = useSession();
  const pathname = usePathname();

  // Hide global navbar on specialized pages (Auth, Dashboard, Admin)
  const isAuthPage = pathname?.startsWith("/login") || pathname?.startsWith("/register");
  const isManagementPage = pathname?.startsWith("/dashboard") || pathname?.startsWith("/admin");

  if (isAuthPage || isManagementPage) return null;

  return (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-5xl px-6 animate-fade-in">
      <nav className="glass rounded-4xl h-16 flex items-center justify-between px-8 border border-white/10 shadow-2xl relative overflow-hidden">
        {/* Subtle glow background */}
        <div className="absolute inset-0 bg-gold/5 opacity-50 blur-2xl pointer-events-none" />
        
        <Link href="/" className="relative z-10">
          <span className="text-2xl font-serif italic gold-gradient tracking-tight">Akaal</span>
        </Link>

        <div className="flex items-center gap-8 relative z-10">
          <div className="hidden md:flex items-center gap-10">
            <Link href="/" className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-400 hover:text-white transition-colors">Home</Link>
            <Link href="/products" className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-400 hover:text-gold transition-colors">Products</Link>
            <Link href="#" className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-400 hover:text-white transition-colors">About</Link>
          </div>
          
          <div className="h-6 w-px bg-white/10 hidden md:block" />

          <div className="flex items-center gap-6">
            <CartPlaceholder />
            
            {status === "loading" ? (
              <Loader2 className="w-4 h-4 text-zinc-500 animate-spin" />
            ) : session ? (
              <div className="flex items-center gap-6">
                <Link
                  href="/dashboard"
                  className="text-xs font-bold uppercase tracking-[0.25em] text-zinc-400 hover:text-white transition-colors"
                >
                  Profile
                </Link>
                {session.user?.role === "ADMIN" && (
                  <Link
                    href="/admin"
                    className="text-[10px] font-bold uppercase tracking-[0.25em] text-gold border border-gold/20 px-3 py-1.5 rounded-full bg-gold/5 hover:bg-gold/10 transition-all"
                  >
                    Admin
                  </Link>
                )}
              </div>
            ) : (
              <Link
                href="/login"
                className="bg-white text-black px-6 py-2 rounded-full text-xs font-bold uppercase tracking-[0.2em] hover:bg-zinc-200 transition-all shadow-lg"
              >
                Enter
              </Link>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}

