"use client";

import Link from "next/link";
import { MoveRight, HeartCrack } from "lucide-react";

export default function WishlistPage() {
  return (
    <div className="min-h-screen bg-background-dark text-white pt-40 pb-20 px-6">
      <div className="max-w-4xl mx-auto space-y-16 animate-fade-in text-center flex flex-col items-center">
        <div className="inline-flex size-24 items-center justify-center p-6 rounded-4xl bg-white/5 border border-white/5 mb-4 relative overflow-hidden group">
           <div className="absolute inset-0 bg-primary/20 blur-xl group-hover:bg-primary/40 transition-all duration-700" />
           <HeartCrack className="text-zinc-600 relative z-10" size={48} strokeWidth={1} />
        </div>
        <div className="space-y-4">
           <h1 className="text-5xl md:text-6xl font-serif font-black italic text-white tracking-tight">
             Empty <span className="text-zinc-500 not-italic">Intentions</span>
           </h1>
           <p className="text-zinc-500 font-light text-xl tracking-wide">
             Your sanctuary&apos;s treasury is currently silent. Focus on your desires to add them here.
           </p>
        </div>

        <Link href="/products" className="inline-flex items-center gap-3 bg-primary text-background-dark px-10 py-5 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-white transition-all duration-500 shadow-[0_0_20px_rgba(236,149,19,0.3)] mt-8">
          Seek New Relics <MoveRight size={16} />
        </Link>
      </div>
    </div>
  );
}
