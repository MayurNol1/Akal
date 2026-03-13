import { ProductService } from "@/modules/products/service";
import Link from "next/link";
import { Plus, Search, Filter, Edit2, Trash2, Eye, Package } from "lucide-react";
import Image from "next/image";

export default async function AdminProductsPage() {
  const products = await ProductService.getProducts();

  return (
    <div className="space-y-16 animate-fade-in relative z-10">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-white/5 pb-10">
        <div className="space-y-4">
           <div className="h-px w-12 bg-gold/50" />
           <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-zinc-600">Sacred Inventory Hub</p>
           <h1 className="text-5xl font-serif italic gold-gradient tracking-tight">Artifact <span className="text-white">Vault</span></h1>
        </div>
        <Link 
          href="/admin/products/create"
          className="bg-white text-black px-8 py-4 rounded-xl text-[10px] font-bold uppercase tracking-[0.2em] flex items-center gap-3 hover:bg-gold transition-all duration-500 shadow-2xl active:scale-95 whitespace-nowrap"
        >
          <Plus size={16} />
          Create New Offering
        </Link>
      </header>

      {/* Filter Bar */}
      <div className="flex flex-col md:flex-row gap-6 items-center">
        <div className="relative flex-1 group w-full">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-zinc-600 group-hover:text-gold transition-colors duration-500" size={18} />
          <input 
            type="text" 
            placeholder="Search artifacts by name or vibration..."
            className="w-full bg-zinc-950/50 border border-white/5 rounded-2xl py-4 pl-14 pr-6 focus:outline-none focus:border-gold/30 transition-all text-xs font-medium placeholder:text-zinc-800"
          />
        </div>
        <div className="flex gap-4 w-full md:w-auto">
           <div className="glass px-6 py-4 rounded-2xl border border-white/5 flex items-center gap-4 text-[10px] font-bold text-zinc-600 uppercase tracking-widest cursor-pointer hover:border-white/10 transition-colors w-full md:w-auto whitespace-nowrap">
              <Filter size={16} />
              Filter Essences
           </div>
        </div>
      </div>

      {/* Product Table */}
      <div className="glass border border-white/5 rounded-4xl overflow-hidden shadow-2xl transition-all duration-700 hover:border-gold/5">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-white/5 border-b border-white/5 text-left text-[9px] uppercase tracking-[0.4em] text-zinc-600">
              <th className="px-10 py-6 font-bold">Artifact Details</th>
              <th className="px-10 py-6 font-bold">Category</th>
              <th className="px-10 py-6 font-bold">Vibration</th>
              <th className="px-10 py-6 font-bold text-right">Investment / Stock</th>
              <th className="px-10 py-6 font-bold text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {products.map((product) => (
              <tr key={product.id} className="hover:bg-white/5 transition-all duration-500 group">
                <td className="px-10 py-8">
                  <div className="flex items-center gap-6">
                    <div className="h-16 w-16 glass border border-white/5 rounded-2xl overflow-hidden relative shrink-0 group-hover:scale-110 group-hover:border-gold/20 transition-all duration-500">
                      {product.imageUrl ? (
                        <Image 
                          src={product.imageUrl} 
                          alt={product.name} 
                          fill 
                          className="object-cover opacity-90 group-hover:opacity-100" 
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-zinc-800 group-hover:text-gold/40 transition-colors">
                          <Package size={24} strokeWidth={1} />
                        </div>
                      )}
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-serif italic text-xl text-white group-hover:text-gold transition-colors duration-500">
                        {product.name}
                      </h4>
                      <p className="text-[10px] text-zinc-600 font-bold uppercase tracking-[0.2em]">#{product.id.slice(-12).toUpperCase()}</p>
                    </div>
                  </div>
                </td>
                <td className="px-10 py-8">
                  <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-zinc-500 glass px-4 py-1.5 rounded-full border border-white/5 group-hover:border-gold/10 transition-colors">
                    {product.category?.name || "Ancient"}
                  </span>
                </td>
                <td className="px-10 py-8">
                  <div className="flex items-center gap-3">
                    <div className={`h-2 w-2 rounded-full ${product.isActive ? "bg-gold shadow-[0_0_10px_rgba(212,175,55,0.4)]" : "bg-zinc-800"}`} />
                    <span className={`text-[9px] font-bold uppercase tracking-[0.3em] ${product.isActive ? "text-gold" : "text-zinc-700"}`}>
                      {product.isActive ? "VIBRANT" : "DORMANT"}
                    </span>
                  </div>
                </td>
                <td className="px-10 py-8 text-right">
                  <p className="text-xl font-light text-white tracking-widest">${parseFloat(product.price.toString()).toFixed(2)}</p>
                  <p className={`text-[9px] mt-2 font-bold uppercase tracking-[0.2em] ${product.stock <= 5 ? "text-saffron shadow-[0_0_8px_rgba(255,153,51,0.2)]" : "text-zinc-600"}`}>
                    {product.stock} manifests left
                  </p>
                </td>
                <td className="px-10 py-8">
                  <div className="flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-all duration-500 -translate-x-4 group-hover:translate-x-0">
                    <Link href={`/admin/products/edit/${product.id}`} className="h-10 w-10 glass flex items-center justify-center rounded-xl text-zinc-600 hover:text-gold hover:border-gold/20 transition-all">
                      <Edit2 size={14} />
                    </Link>
                    <button className="h-10 w-10 glass flex items-center justify-center rounded-xl text-zinc-600 hover:text-red-400 hover:border-red-400/20 transition-all">
                      <Trash2 size={14} />
                    </button>
                    <Link href={`/products/${product.id}`} className="h-10 w-10 glass flex items-center justify-center rounded-xl text-zinc-600 hover:text-white hover:border-white/20 transition-all">
                      <Eye size={14} />
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {products.length === 0 && (
          <div className="p-32 flex flex-col items-center justify-center text-center space-y-8 glass bg-black/40">
            <div className="relative group">
               <div className="absolute inset-0 bg-gold/5 blur-3xl rounded-full scale-150" />
               <Package size={80} className="relative z-10 text-zinc-900" strokeWidth={0.5} />
            </div>
            <div className="space-y-2">
               <p className="text-zinc-600 font-serif italic text-2xl tracking-widest">The vault is currently empty.</p>
               <p className="text-[10px] text-zinc-700 font-bold uppercase tracking-[0.4em]">No artifacts have been forged yet</p>
            </div>
            <Link href="/admin/products/create" className="px-10 py-4 rounded-xl bg-white text-black text-[10px] font-bold uppercase tracking-[0.2em] shadow-2xl hover:bg-gold transition-all duration-500">
               Begin Forging
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
