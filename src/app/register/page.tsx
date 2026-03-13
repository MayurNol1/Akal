"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterSchema, RegisterInput } from "@/modules/auth/validation";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { Mail, Lock, User, Loader2, AlertCircle, ArrowRight, CheckCircle2 } from "lucide-react";

export default function RegisterPage() {
  const { status } = useSession();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
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
  } = useForm<RegisterInput>({
    resolver: zodResolver(RegisterSchema),
  });

  const onSubmit = async (data: RegisterInput) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        setError(result.message || "Manifestation failed. Is this vessel already known?");
      } else {
        setSuccess(true);
        setTimeout(() => {
          router.push("/login");
        }, 2000);
      }
    } catch {
      setError("An unexpected disruption in the energy flow occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative isolate min-h-screen bg-black flex items-center justify-center p-6 overflow-hidden text-white">
      {/* Background Aesthetics */}
      <div className="absolute top-[-15%] right-[-10%] w-[60%] h-[60%] bg-blue-950/10 blur-[150px] rounded-full animate-breathe" />
      <div className="absolute bottom-[-15%] left-[-10%] w-[60%] h-[60%] bg-gold/5 blur-[150px] rounded-full" />
      
      <div className="w-full max-w-lg animate-fade-in relative z-10">
        <div className="glass border border-white/5 p-12 md:p-16 rounded-[3.5rem] shadow-2xl relative overflow-hidden group">
          <div className="absolute inset-x-0 bottom-0 h-px bg-linear-to-r from-transparent via-gold/10 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-1000" />
          
          <div className="flex justify-center mb-12">
            <div className="h-20 w-20 glass rounded-3xl border border-white/10 flex items-center justify-center relative overflow-hidden group-hover:border-gold/30 transition-all duration-500 transform group-hover:-rotate-6">
              <User className="text-gold/40 w-10 h-10 group-hover:text-gold transition-colors duration-500" />
            </div>
          </div>

          <div className="text-center mb-12 space-y-4">
            <div className="h-px w-12 bg-gold/50 mx-auto opacity-50" />
            <h1 className="text-4xl md:text-5xl font-serif italic gold-gradient tracking-tight leading-tight">
              Manifest <span className="text-white">Existence</span>
            </h1>
            <p className="text-zinc-600 font-bold uppercase tracking-[0.4em] text-[10px]">
              Join the Sacred Path
            </p>
          </div>

          {success ? (
            <div className="text-center py-12 space-y-8 animate-scale-in">
              <div className="flex justify-center relative">
                 <div className="absolute inset-0 bg-gold/20 blur-3xl rounded-full scale-150 animate-pulse" />
                 <CheckCircle2 className="w-20 h-20 text-gold relative z-10" />
              </div>
              <div className="space-y-2">
                 <h2 className="text-2xl font-serif italic text-white">Vessel Registered</h2>
                 <p className="text-zinc-500 font-light tracking-widest text-sm uppercase">Entering the Sanctuary...</p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              {error && (
                <div className="bg-red-950/20 border border-red-500/20 text-red-400 px-5 py-4 rounded-2xl flex items-center gap-4 text-xs font-medium animate-shake">
                  <AlertCircle className="w-5 h-5 shrink-0 text-red-500" />
                  <p>{error}</p>
                </div>
              )}

              <div className="space-y-3">
                <label className="text-[10px] font-bold text-zinc-600 uppercase tracking-[0.3em] ml-2">
                  Full Name
                </label>
                <div className="relative group">
                  <User className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-700 group-focus-within:text-gold transition-colors" />
                  <input
                    {...register("name")}
                    className="w-full bg-zinc-950/50 border border-white/5 rounded-2xl px-14 py-5 text-white placeholder:text-zinc-800 focus:outline-none focus:border-gold/30 focus:ring-1 focus:ring-gold/30 transition-all duration-500 text-sm"
                    placeholder="John Doe"
                    autoComplete="name"
                  />
                </div>
                {errors.name && (
                  <p className="text-[10px] text-red-500/60 ml-2 font-medium tracking-wide">{errors.name.message}</p>
                )}
              </div>

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
                    autoComplete="new-password"
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
                      Harmonize
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </span>
                <div className="absolute inset-0 bg-gold/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            </form>
          )}

          {!success && (
            <footer className="mt-12 text-center space-y-6">
              <div className="h-px w-8 bg-white/5 mx-auto" />
              <p className="text-zinc-600 text-[10px] font-bold uppercase tracking-[0.2em]">
                Already recognized?{" "}
                <Link 
                  href="/login" 
                  className="text-white hover:text-gold underline decoration-white/10 underline-offset-8 transition-all"
                >
                  Enter Sanctuary
                </Link>
              </p>
            </footer>
          )}
        </div>
      </div>
    </div>
  );
}
