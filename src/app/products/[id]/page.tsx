import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductService } from "@/modules/products/service";
import { 
  ChevronLeft, 
  Leaf, 
  Wind, 
  ShieldCheck, 
  Star,
  PackageCheck
} from "lucide-react";
import { AddToCartButton } from "@/components/cart/add-to-cart-button";

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export const dynamic = "force-dynamic";

export default async function ProductDetailsPage({ params }: ProductPageProps) {
  const { id } = await params;
  let product;

  try {
    product = await ProductService.getProductById(id);
  } catch {
    return notFound();
  }

  const price = parseFloat(product.price.toString()).toFixed(2);
  const isOutOfStock = product.stock === 0;

  return (
    <div className="bg-black min-h-screen text-white pb-40">
       {/* Background Aesthetics */}
       <div className="fixed inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(30,58,138,0.1),transparent_70%)] pointer-events-none -z-10" />

       {/* Header Spacer */}
       <div className="h-32" />

       <div className="max-w-7xl mx-auto px-6">
          <Link 
            href="/products" 
            className="inline-flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-500 hover:text-gold transition-colors mb-16 group"
          >
            <ChevronLeft size={16} className="group-hover:-translate-x-2 transition-transform duration-500" />
            Sacred Collections
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 xl:gap-32 animate-fade-in">
             {/* Media Gallery */}
             <div className="space-y-12">
                <div className="aspect-3/4 w-full relative overflow-hidden rounded-4xl border border-white/5 bg-zinc-900 shadow-2xl group">
                   <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(30,58,138,0.2),transparent_70%)] animate-breathe pointer-events-none" />
                   <Image 
                     src={product.imageUrl || "/images/rudraksha.png"}
                     alt={product.name}
                     fill
                     priority
                     className="object-cover transition-transform duration-1000 group-hover:scale-105 opacity-90 group-hover:opacity-100"
                   />
                   
                   {isOutOfStock && (
                     <div className="absolute inset-0 bg-black/80 backdrop-blur-[2px] flex items-center justify-center">
                        <span className="text-zinc-500 text-[10px] font-bold uppercase tracking-[0.5em] border border-white/10 px-10 py-4 rounded-full">Transcending State</span>
                     </div>
                   )}
                </div>
                
                {/* Visual Trust Indicators */}
                <div className="grid grid-cols-3 gap-8 text-center">
                   <TrustItem icon={<Leaf size={24} />} label="Himalayan Origin" />
                   <TrustItem icon={<Wind size={24} />} label="High Vibration" />
                   <TrustItem icon={<ShieldCheck size={24} />} label="Ethical Sourcing" />
                </div>
             </div>

             {/* Details Section */}
             <div className="flex flex-col space-y-16">
                <div className="space-y-8">
                   <div className="flex items-center justify-between">
                      <div className="inline-flex items-center gap-3 px-4 py-1.5 glass border border-gold/20 rounded-full">
                         <Star size={12} className="fill-gold text-gold" />
                         <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-gold">Sacred Offering</span>
                      </div>
                      {!isOutOfStock && (
                        <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em] text-emerald-500 bg-emerald-500/10 px-4 py-1 rounded-full">
                           <PackageCheck size={14} />
                           Manifested ({product.stock})
                        </div>
                      )}
                   </div>

                   <h1 className="text-6xl md:text-7xl font-serif italic tracking-tight leading-tight gold-gradient">
                     {product.name}
                   </h1>

                   <div className="flex flex-col gap-2">
                      <div className="flex items-end gap-4">
                        <span className="text-5xl font-light text-white tracking-widest leading-none">${price}</span>
                      </div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-zinc-600">Sacred Investment Value</p>
                   </div>
                </div>

                <div className="space-y-8">
                   <h3 className="text-[10px] font-bold uppercase tracking-[0.4em] text-zinc-500 pb-2 border-b border-white/5 inline-block">Divine Essence</h3>
                   <p className="text-2xl text-zinc-400 leading-relaxed font-serif italic tracking-wide">
                     {product.description || "A timeless spiritual artifact curated to harmonize your energy fields and elevate your divine consciousness. Crafted with ancient intention."}
                   </p>
                </div>

                <div className="space-y-12">
                   <div className="space-y-6">
                      <AddToCartButton productId={product.id} />
                   </div>

                   <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-12 border-t border-white/5">
                      <div className="space-y-3">
                         <h4 className="text-[9px] font-bold uppercase tracking-[0.3em] text-gold">Ritual Transit</h4>
                         <p className="text-xs text-zinc-500 leading-relaxed font-light tracking-widest">Secured shipping via global couriers. Arrives in 7-14 solar cycles.</p>
                      </div>
                      <div className="space-y-3">
                         <h4 className="text-[9px] font-bold uppercase tracking-[0.3em] text-gold">Sacred Exchange</h4>
                         <p className="text-xs text-zinc-500 leading-relaxed font-light tracking-widest">Artifacts can be exchanged if the vibration doesn&apos;t align with your high path.</p>
                      </div>
                   </div>
                </div>
             </div>
          </div>
       </div>
    </div>
  );
}

function TrustItem({ icon, label }: { icon: React.ReactNode, label: string }) {
  return (
    <div className="flex flex-col items-center justify-center space-y-4 group">
       <div className="h-16 w-16 glass rounded-2xl flex items-center justify-center border-white/5 text-zinc-600 group-hover:text-gold group-hover:border-gold/20 transition-all duration-500 group-hover:scale-110">
          {icon}
       </div>
       <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-zinc-600 text-center">{label}</span>
    </div>
  );
}
