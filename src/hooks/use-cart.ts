import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";

export function useCart() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const addToCart = useCallback(async (productId: string, quantity: number = 1) => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/cart/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId, quantity }),
      });
      if (!res.ok) throw new Error("Failed to add to cart");
      router.refresh();
      return true;
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
      else setError("An unknown error occurred");
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [router]);

  const updateQuantity = useCallback(async (productId: string, quantity: number) => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/cart/update", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId, quantity }),
      });
      if (!res.ok) throw new Error("Failed to update quantity");
      router.refresh();
      return true;
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
      else setError("An unknown error occurred");
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [router]);

  const removeItem = useCallback(async (productId: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/cart/remove", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId }),
      });
      if (!res.ok) throw new Error("Failed to remove item");
      router.refresh();
      return true;
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
      else setError("An unknown error occurred");
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [router]);

  return {
    addToCart,
    updateQuantity,
    removeItem,
    isLoading,
    error,
  };
}
