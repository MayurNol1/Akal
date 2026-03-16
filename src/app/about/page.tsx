import Link from "next/link";
import { MoveRight, Sparkles } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background-dark text-white pt-32 pb-20 px-6">
      <div className="max-w-4xl mx-auto space-y-16 animate-fade-in relative z-10">
        <div className="space-y-6 text-center">
           <div className="inline-flex items-center justify-center p-4 rounded-full bg-primary/10 mb-4 shadow-[0_0_30px_rgba(236,149,19,0.2)]">
              <Sparkles className="text-primary" size={32} />
           </div>
           <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-zinc-500">The Origins</p>
           <h1 className="text-5xl md:text-7xl font-serif font-black italic text-white tracking-tight">
             Sacred <span className="text-primary not-italic">Akaal</span>
           </h1>
        </div>

        <div className="space-y-10 text-lg text-zinc-400 font-light leading-relaxed">
           <p>
             Akaal represents the timeless, the eternal, and the deathless. Born from a profound desire to bridge ancient spiritual wisdom with modern devotion, our sanctuary offers a curated collection of high-vibration relics and artifacts.
           </p>
           <p>
             Each piece in our inventory—whether a Panchmukhi Rudraksha, a Singing Bowl, or a Sandalwood Mala—is ethically sourced and energized to elevate your spiritual practices. We believe in providing instruments of peace that resonate deeply with your inner dharma.
           </p>
           <div className="p-8 rounded-3xl bg-white/2 border border-white/5 italic font-serif text-xl border-l-4 border-l-primary text-zinc-300 shadow-2xl">
             "Through focus and sacred resonance, we touch the eternal."
           </div>
           <p>
             Welcome to your personal sanctuary. May you find what you seek.
           </p>
        </div>

        <div className="pt-10 flex justify-center border-t border-white/5">
           <Link href="/products" className="inline-flex items-center gap-3 bg-primary text-background-dark px-10 py-5 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-white transition-all duration-500 shadow-[0_0_20px_rgba(236,149,19,0.3)]">
             Explore the Vault <MoveRight size={16} />
           </Link>
        </div>
      </div>
    </div>
  );
}
