import { useState, useEffect } from "react";
import { Product } from "@prisma/client";

export function useProducts(filters?: { categoryId?: string; isActive?: boolean }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProducts() {
      setIsLoading(true);
      try {
        const queryParams = new URLSearchParams();
        if (filters?.categoryId) queryParams.set("categoryId", filters.categoryId);
        if (filters?.isActive !== undefined) queryParams.set("isActive", String(filters.isActive));

        const res = await fetch(`/api/products?${queryParams.toString()}`);
        if (!res.ok) throw new Error("Failed to fetch products");
        const data = await res.json();
        setProducts(data);
      } catch (err: unknown) {
        if (err instanceof Error) setError(err.message);
        else setError("An unknown error occurred");
      } finally {
        setIsLoading(false);
      }
    }

    fetchProducts();
  }, [filters?.categoryId, filters?.isActive]);

  return { products, isLoading, error };
}

export function useProduct(id: string) {
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    async function fetchProduct() {
      setIsLoading(true);
      try {
        const res = await fetch(`/api/products/${id}`);
        if (!res.ok) throw new Error("Failed to fetch product");
        const data = await res.json();
        setProduct(data);
      } catch (err: unknown) {
        if (err instanceof Error) setError(err.message);
        else setError("An unknown error occurred");
      } finally {
        setIsLoading(false);
      }
    }

    fetchProduct();
  }, [id]);

  return { product, isLoading, error };
}
