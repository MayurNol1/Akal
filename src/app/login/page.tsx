"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema, LoginInput } from "@/modules/auth/validation";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Mail, Lock, Loader2, AlertCircle, ArrowRight, Sparkles } from "lucide-react";

export default function LoginPage() {
  const { status } = useSession();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/dashboard");
    }
  }, [status, router]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(LoginSchema),
  });

  const onSubmit = async (data: LoginInput) => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (result?.error) {
        setError("Your vessel credentials could not be verified.");
      } else {
        router.push("/dashboard");
        router.refresh();
      }
    } catch {
      setError("Energy transit interrupted. Please re-enter.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative isolate min-h-screen bg-black flex items-center justify-center p-6 overflow-hidden">
      {/* Background Aesthetics */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-950/10 blur-[150px] rounded-full animate-breathe" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-gold/5 blur-[150px] rounded-full" />
      
      <div className="w-full max-w-lg animate-fade-in text-white relative z-10">
        <div className="glass border border-white/5 p-12 md:p-16 rounded-[3rem] shadow-2xl relative overflow-hidden group">
          <div className="absolute inset-x-0 bottom-0 h-px bg-linear-to-r from-transparent via-gold/10 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-1000" />
          
          <div className="flex justify-center mb-12">
            <div className="h-20 w-20 glass rounded-3xl border border-white/10 flex items-center justify-center relative overflow-hidden group-hover:border-gold/30 transition-all duration-500 transform group-hover:rotate-6">
              <Sparkles className="text-gold/40 w-10 h-10 group-hover:text-gold transition-colors duration-500" />
            </div>
          </div>

          <div className="text-center mb-12 space-y-4">
            <div className="h-px w-12 bg-gold/50 mx-auto opacity-50" />
            <h1 className="text-4xl md:text-5xl font-serif italic gold-gradient tracking-tight">
              Identify <span className="text-white">Vessel</span>
            </h1>
            <p className="text-zinc-600 font-bold uppercase tracking-[0.4em] text-[10px]">
              Access the Sanctuary
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {error && (
              <div className="bg-red-950/20 border border-red-500/20 text-red-400 px-5 py-4 rounded-2xl flex items-center gap-4 text-xs font-medium animate-shake">
                <AlertCircle className="w-5 h-5 shrink-0 text-red-500" />
                <p>{error}</p>
              </div>
            )}

            <div className="space-y-3">
              <label className="text-[10px] font-bold text-zinc-600 uppercase tracking-[0.3em] ml-2">
                Existence Mail
              </label>
              <div className="relative group">
                <Mail className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-700 group-focus-within:text-gold transition-colors" />
                <input
                  {...register("email")}
                  className="w-full bg-zinc-950/50 border border-white/5 rounded-2xl px-14 py-5 text-white placeholder:text-zinc-800 focus:outline-none focus:border-gold/30 focus:ring-1 focus:ring-gold/30 transition-all duration-500 text-sm"
                  placeholder="seeker@destiny.com"
                  autoComplete="email"
                />
              </div>
              {errors.email && (
                <p className="text-[10px] text-red-500/60 ml-2 font-medium tracking-wide">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-3">
              <label className="text-[10px] font-bold text-zinc-600 uppercase tracking-[0.3em] ml-2">
                Secret Attunement
              </label>
              <div className="relative group">
                <Lock className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-700 group-focus-within:text-gold transition-colors" />
                <input
                  type="password"
                  {...register("password")}
                  className="w-full bg-zinc-950/50 border border-white/5 rounded-2xl px-14 py-5 text-white placeholder:text-zinc-800 focus:outline-none focus:border-gold/30 focus:ring-1 focus:ring-gold/30 transition-all duration-500 text-sm"
                  placeholder="••••••••"
                  autoComplete="current-password"
                />
              </div>
              {errors.password && (
                <p className="text-[10px] text-red-500/60 ml-2 font-medium tracking-wide">{errors.password.message}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-white hover:bg-gold disabled:opacity-50 text-black font-bold py-5 rounded-2xl shadow-2xl transition-all duration-700 flex items-center justify-center gap-4 group relative overflow-hidden mt-4"
            >
              <span className="relative z-10 flex items-center justify-center gap-3 text-[10px] uppercase tracking-[0.2em]">
                {isLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    Enter Silence
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </span>
            </button>
          </form>

          <footer className="mt-12 text-center space-y-6">
             <div className="h-px w-8 bg-white/5 mx-auto" />
             <p className="text-zinc-600 text-[10px] font-bold uppercase tracking-[0.2em]">
               New to the path?{" "}
               <Link 
                 href="/register" 
                 className="text-white hover:text-gold underline decoration-white/10 underline-offset-8 transition-all"
               >
                 Create Manifestation
               </Link>
             </p>
          </footer>
        </div>
      </div>
    </div>
  );
}
