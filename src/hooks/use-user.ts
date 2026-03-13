import { useSession } from "next-auth/react";

export function useUser() {
  const { data: session, status } = useSession();

  return {
    user: session?.user,
    isLoading: status === "loading",
    isLoggedIn: status === "authenticated",
    isAdmin: session?.user?.role === "ADMIN",
  };
}
