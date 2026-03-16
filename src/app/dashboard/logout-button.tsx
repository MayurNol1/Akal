"use client";

import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";

export function LogoutButton() {
  return (
    <button 
      onClick={() => signOut({ callbackUrl: "/" })}
      className="h-14 px-6 bg-white/5 rounded-2xl flex items-center justify-center text-zinc-500 hover:text-red-400 hover:bg-red-400/10 transition-colors text-[10px] font-black uppercase tracking-widest gap-2"
    >
      <LogOut size={16} />
      <span className="max-sm:hidden">Exit Sanctuary</span>
    </button>
  );
}
