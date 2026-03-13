import Link from "next/link";
import Image from "next/image";
import { ProductService } from "@/modules/products/service";
import { ShoppingBag } from "lucide-react";
import { Product } from "@prisma/client";

export const dynamic = "force-dynamic";

export default async function ProductListingPage() {
  const products = await ProductService.getProducts({ isActive: true });

  return (
    <div className="bg-black text-white min-h-screen pb-40">
      {/* Header Spacer */}
      <div className="h-32" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-24 gap-12">
          <div className="space-y-6 animate-fade-in max-w-2xl">
            <div className="h-1 w-20 bg-gold/50" />
            <h1 className="text-6xl md:text-7xl font-serif italic tracking-tight leading-tight bg-linear-to-b from-white via-zinc-200 to-zinc-500 bg-clip-text text-transparent transform -translate-x-1">
              Sacred <span className="gold-gradient">Collections</span>
            </h1>
            <p className="text-zinc-500 text-xl font-light leading-relaxed tracking-wide">
              Ancient artifacts and high-vibration tools curated from the high peaks of the Himalayas to the deep temples of the South.
            </p>
          </div>
          
          <div className="flex items-center gap-8 text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-600">
            <div className="flex items-center gap-3">
              <span className="text-zinc-400">{products.length}</span> Objects Manifested
            </div>
            <div className="w-px h-6 bg-white/5" />
            <select className="bg-transparent border-none focus:outline-none text-zinc-400 hover:text-gold transition-colors cursor-pointer appearance-none">
              <option>Newest Rituals</option>
              <option>Ascending Price</option>
              <option>Descending Price</option>
            </select>
          </div>
        </div>

        {products.length === 0 ? (
          <div className="h-[40vh] flex flex-col items-center justify-center glass rounded-4xl border border-white/5 space-y-10 group">
             <div className="relative">
                <div className="absolute inset-0 bg-gold/20 blur-2xl rounded-full scale-150 group-hover:scale-200 transition-transform duration-1000" />
                <ShoppingBag className="text-gold/40 relative z-10" size={60} strokeWidth={1} />
             </div>
             <p className="text-zinc-600 font-serif italic text-2xl tracking-widest">Your vessel is empty. Begin your journey.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-12 gap-y-24">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function ProductCard({ product }: { product: Product }) {
  const price = parseFloat(product.price.toString()).toFixed(2);
  
  return (
    <div className="group space-y-8 animate-fade-in cursor-pointer">
      <div className="aspect-3/4 w-full relative overflow-hidden rounded-4xl border border-white/5 bg-zinc-900 shadow-2xl transition-all duration-700 hover:border-gold/30 hover:shadow-[0_0_40px_rgba(212,175,55,0.05)]">
        <Image 
          src={product.imageUrl || "/images/rudraksha.png"} 
          alt={product.name} 
          fill 
          className="object-cover transition-transform duration-1000 group-hover:scale-110 opacity-90 group-hover:opacity-100" 
        />
        
        <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700 flex flex-col items-center justify-end p-10 space-y-4">
          <Link 
            href={`/products/${product.id}`}
            className="w-full bg-white text-black py-4 rounded-xl text-[10px] font-bold uppercase tracking-[0.2em] text-center hover:bg-zinc-200 transition-colors shadow-2xl"
          >
            Observe Details
          </Link>
          <button className="w-full bg-gold text-black py-4 rounded-xl text-[10px] font-bold uppercase tracking-[0.2em] shadow-2xl hover:bg-gold-light transition-colors">
            Add to Ritual
          </button>
        </div>

        {product.stock <= 5 && product.stock > 0 && (
          <div className="absolute top-8 right-8 bg-saffron text-black px-4 py-1.5 rounded-full text-[9px] font-bold uppercase tracking-[0.2em] shadow-[0_0_20px_rgba(255,153,51,0.3)]">
            Rare Offering
          </div>
        )}
        
        {product.stock === 0 && (
          <div className="absolute inset-0 bg-black/80 backdrop-blur-[2px] flex items-center justify-center">
             <span className="text-zinc-500 text-[10px] font-bold uppercase tracking-[0.4em] border border-white/5 px-8 py-3 rounded-full">Transcending State</span>
          </div>
        )}
      </div>

      <div className="px-2 text-center space-y-3">
        <h3 className="text-2xl font-serif italic tracking-wide group-hover:text-gold transition-colors duration-500">
          {product.name}
        </h3>
        <div className="flex flex-col items-center gap-3">
           <span className="text-gold font-light text-base tracking-[0.2em]">
             ${price}
           </span>
           <div className="w-8 h-px bg-white/10 group-hover:w-20 group-hover:bg-gold/40 transition-all duration-700" />
           <p className="text-[9px] text-zinc-600 font-bold uppercase tracking-[0.4em]">Ancient Lineage</p>
        </div>
      </div>
    </div>
  );
}
