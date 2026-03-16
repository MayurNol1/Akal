import Link from "next/link";
import Image from "next/image";
import { Filter, ShoppingBag, Heart } from "lucide-react";
import { Prisma, Product } from "@prisma/client";
import prisma from "@/lib/prisma";
import { AddToCartButton } from "@/components/cart/add-to-cart-button";
import { SortSelect } from "./sort-select";
import { Pagination } from "./pagination";

export const dynamic = "force-dynamic";

export default async function ProductListingPage(props: {
  searchParams?: Promise<{ query?: string; category?: string; sort?: string; page?: string }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || "";
  const categoryId = searchParams?.category || "";
  const sort = searchParams?.sort || "relevance";
  const page = Number(searchParams?.page) || 1;
  const limit = 9; // Display 9 products per page

  const skip = (page - 1) * limit;

  let orderBy: Prisma.ProductOrderByWithRelationInput | undefined = undefined;
  if (sort === 'price_asc') orderBy = { price: 'asc' };
  else if (sort === 'price_desc') orderBy = { price: 'desc' };
  else if (sort === 'newest') orderBy = { createdAt: 'desc' };

  const totalProducts = await prisma.product.count({
    where: { 
      isActive: true,
      ...(query ? { name: { contains: query, mode: "insensitive" } } : {}),
      ...(categoryId ? { categoryId } : {})
    }
  });

  const totalPages = Math.ceil(totalProducts / limit);

  const products = await prisma.product.findMany({
    where: { 
      isActive: true,
      ...(query ? { name: { contains: query, mode: "insensitive" } } : {}),
      ...(categoryId ? { categoryId } : {})
    },
    orderBy,
    skip,
    take: limit
  });
  const categoriesDb = await prisma.category.findMany({
    include: {
      _count: {
        select: { products: true }
      }
    }
  });

  return (
    <div className="bg-background-dark text-white min-h-screen">
      <main className="max-w-7xl mx-auto pt-32 pb-20 px-6 flex flex-col lg:flex-row gap-12">
        {/* Sidebar Filters */}
        <aside className="w-full lg:w-64 shrink-0 space-y-10">
          <div className="sticky top-32 space-y-10">
            <div className="space-y-6">
              <h3 className="font-serif flex items-center gap-3 text-white uppercase tracking-widest text-sm">
                <Filter size={18} className="text-primary" />
                Categories
              </h3>
              <ul className="space-y-4 border-l border-primary/20 ml-2 pl-5">
                <li>
                  <Link href="/products" className={`flex items-center justify-between group transition-colors py-1 ${!categoryId ? "text-primary" : "hover:text-primary text-zinc-400"}`}>
                    <span className="font-bold text-xs uppercase tracking-widest">All Collections</span>
                  </Link>
                </li>
                {categoriesDb.map((cat: { id: string, name: string, _count: { products: number } }) => (
                  <CategoryLink key={cat.id} id={cat.id} name={cat.name} count={cat._count.products} isActive={categoryId === cat.id} />
                ))}
              </ul>
            </div>
          </div>
        </aside>

        {/* Product Grid */}
        <div className="flex-1 space-y-12">
          <div className="space-y-6">
            <h1 className="font-serif text-5xl md:text-6xl font-bold bg-linear-to-r from-primary via-white to-white bg-clip-text text-transparent transform -translate-x-1">
              Sacred Collections
            </h1>
            <p className="text-zinc-500 max-w-2xl font-serif italic text-lg leading-relaxed">
              Hand-selected artifacts energized for meditation and spiritual elevation. Each piece carries the essence of timeless devotion.
            </p>
            
            <div className="pt-4 flex items-center justify-between border-b border-primary/10 pb-6">
              <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-500">
                Manifesting {products.length} Items
              </p>
              <div className="flex items-center gap-3">
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-600">Sort by:</span>
                <SortSelect currentSort={sort} />
              </div>
            </div>
          </div>

          {products.length === 0 ? (
            <div className="h-[40vh] flex flex-col items-center justify-center bg-white/5 border border-primary/10 rounded-2xl space-y-8">
              <ShoppingBag className="text-primary/20" size={64} strokeWidth={1} />
              <p className="text-zinc-600 font-serif italic text-2xl tracking-widest text-center px-6">Your vessel is empty. Begin your journey.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((product: Product) => (
                <ProductCardStitch key={product.id} product={product} />
              ))}
            </div>
          )}

          {/* Pagination */}
          <Pagination totalPages={totalPages} currentPage={page} />
        </div>
      </main>
    </div>
  );
}

function ProductCardStitch({ product }: { product: Product }) {
  const price = parseFloat(product.price.toString()).toFixed(2);
  
  return (
    <div className="product-card flex flex-col rounded-2xl group animate-fade-in relative z-10">
      {/* Stardust particles */}
      <div className="stardust stardust-1" />
      <div className="stardust stardust-2" />
      <div className="stardust stardust-3" />
      <div className="stardust stardust-4" />
      <div className="stardust stardust-5" />
      
      <div className="aspect-square relative overflow-hidden bg-black/60 flex items-center justify-center">
        <div className="aura-effect" />
        <Link href={`/products/${product.id}`} className="w-full h-full relative z-10 block">
          <Image 
            src={product.imageUrl || "https://lh3.googleusercontent.com/aida-public/AB6AXuC2twSVAOXjZdzCFiaaztJDcLEzGlPds0YTe_hdPNq4mkQeQZn0P2UHpnlvS9Ar9OpH3rzzcFZap-fiq4A5oVCPHvxZiPyj0MqhR3TruAwl1Y6UKtfly_FpHs2NAzPZUhFK1qHwd0qP_Y9HHCQ54jzA-sLEd2AkjHALpRlndFajV3z18YbaJDQ4w7kjXYIRlqGMwqspYLVozmU79nazaqtSQOT7maA_wt6KK8a3YEGY2ZvuqiBTPvNXUrBoIr2WpdsTnahducj-snk"} 
            alt={product.name} 
            fill 
            className="product-image-stitch object-cover" 
          />
        </Link>
        <button className="absolute top-5 right-5 z-20 p-2.5 rounded-full bg-black/60 text-zinc-400 hover:text-primary transition-colors backdrop-blur-md border border-white/5">
          <Heart size={16} />
        </button>
        
        {product.stock <= 5 && product.stock > 0 && (
          <div className="absolute top-5 left-5 z-20">
            <span className="bg-primary text-background-dark text-[9px] font-black px-3 py-1.5 rounded-lg shadow-2xl uppercase tracking-widest">
              Rare Core
            </span>
          </div>
        )}
      </div>

      <div className="p-8 flex flex-col flex-1 relative z-10 space-y-4">
        <div className="space-y-2">
          <span className="text-[10px] uppercase tracking-[0.3em] text-primary font-black">Sacred Relic</span>
          <Link href={`/products/${product.id}`} className="block">
            <h3 className="font-serif text-2xl text-white group-hover:text-primary transition-colors leading-tight">
              {product.name}
            </h3>
          </Link>
          <p className="text-xs text-zinc-500 font-light leading-relaxed line-clamp-2">
            Ancient vibrations captured in a physical vessel, hand-crafted for the modern sanctuary.
          </p>
        </div>
        
        <div className="mt-auto pt-4 flex items-center justify-between gap-4">
          <span className="font-serif text-2xl text-primary font-bold tracking-tight">${price}</span>
          <AddToCartButton productId={product.id} variant="minimal" />
        </div>
      </div>
    </div>
  );
}

function CategoryLink({ id, name, count, isActive }: { id?: string, name: string, count: number, isActive?: boolean }) {
  return (
    <li>
      <Link href={id ? `/products?category=${id}` : `/products`} className={`flex items-center justify-between group py-1 transition-colors ${isActive ? "text-primary" : "hover:text-primary text-zinc-400"}`}>
        <span className="text-xs font-medium">{name}</span>
        <span className={`text-[10px] font-bold uppercase tracking-widest ${isActive ? "text-primary" : "text-zinc-600 group-hover:text-primary"}`}>{count}</span>
      </Link>
    </li>
  );
}
