import { ArrowLeft, Sparkles } from "lucide-react";
import Link from "next/link";
import ProductForm from "@/components/admin/product-form";

export default function CreateProductPage() {
  return (
    <div className="space-y-16 animate-fade-in relative z-10 pb-20">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-white/5 pb-10">
        <div className="flex items-center gap-8">
          <Link 
            href="/admin/products"
            className="h-16 w-16 glass rounded-2xl flex items-center justify-center border border-white/5 hover:border-gold/30 hover:text-gold transition-all duration-500 active:scale-90 group"
          >
            <ArrowLeft size={24} className="group-hover:-translate-x-1 transition-transform" />
          </Link>
          <div className="space-y-4">
             <div className="h-px w-12 bg-gold/50" />
             <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-zinc-600">Divine Manifestation</p>
             <h1 className="text-5xl font-serif italic gold-gradient tracking-tight">Create <span className="text-white">Artifact</span></h1>
          </div>
        </div>
        
        <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-500">
           <Sparkles size={16} className="text-gold/40" />
           <span>Drafting New Essence</span>
        </div>
      </header>

      <div className="max-w-6xl mx-auto">
        <ProductForm />
      </div>
    </div>
  );
}
