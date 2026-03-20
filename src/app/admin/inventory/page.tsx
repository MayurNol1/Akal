import prisma from "@/lib/prisma";
import { InventoryClient, type InventoryProduct } from "./inventory-client";

export const dynamic = "force-dynamic";

export default async function AdminInventoryPage() {
  const [products, categories] = await Promise.all([
    prisma.product.findMany({
      include: { category: { select: { id: true, name: true } } },
      orderBy: { createdAt: "desc" },
    }),
    prisma.category.findMany({
      orderBy: { name: "asc" },
      select: { id: true, name: true },
    }),
  ]);

  const mappedProducts: InventoryProduct[] = products.map((product) => ({
    id: product.id,
    name: product.name,
    categoryName: product.category?.name ?? "Uncategorized",
    categoryId: product.category?.id ?? null,
    price: Number(product.price),
    stock: product.stock,
    isActive: product.isActive,
    imageUrl: product.imageUrl,
    createdAt: product.createdAt.toISOString(),
  }));

  return <InventoryClient initialProducts={mappedProducts} categories={categories} />;
}
