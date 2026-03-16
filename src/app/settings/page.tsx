"use client";

import { useSession } from "next-auth/react";
import { Save, Shield, Bell } from "lucide-react";
import { useState } from "react";

export default function SettingsPage() {
  const { data: session } = useSession();

  return (
    <div className="min-h-screen bg-background-dark text-white pt-32 pb-20 px-6">
      <div className="max-w-3xl mx-auto space-y-12 animate-fade-in text-left">
        <header className="space-y-4 border-b border-white/5 pb-10">
           <div className="h-px w-12 bg-primary/50" />
           <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-zinc-600">Vessel Configuration</p>
           <h1 className="text-5xl font-serif font-black italic text-white tracking-tight">
             Sanctuary <span className="text-primary not-italic">Settings</span>
           </h1>
        </header>

        <div className="space-y-6">
           <div className="flex flex-col gap-6 md:flex-row p-8 rounded-[32px] bg-white/2 border border-white/5 shadow-2xl">
             <div className="w-full space-y-4">
                <label className="text-[10px] uppercase tracking-[0.3em] font-black text-zinc-500">True Name (Display Identity)</label>
                <input type="text" defaultValue={session?.user?.name || ''} className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-white outline-none focus:border-primary/40 focus:bg-white/10 transition-all font-serif italic text-lg" />
             </div>
             <div className="w-full space-y-4">
                <label className="text-[10px] uppercase tracking-[0.3em] font-black text-zinc-500">Celestial Origin (Email)</label>
                <input type="email" disabled defaultValue={session?.user?.email || ''} className="w-full px-6 py-4 bg-background-dark border border-white/5 rounded-2xl text-zinc-400 opacity-60 cursor-not-allowed outline-none font-sans" />
             </div>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              <SettingRow 
                icon={<Shield size={20} />} 
                title="Spiritual Boundaries" 
                desc="Configure your privacy settings and energy limits." 
                defaultEnabled={true} 
              />
              <SettingRow 
                icon={<Bell size={20} />} 
                title="Cosmic Resonance" 
                desc="Manage notifications about new artifacts and sanctuary updates." 
                defaultEnabled={false} 
              />
           </div>
        </div>

        <div className="pt-10 flex border-t border-white/5">
           <button className="flex items-center gap-3 bg-white/5 text-zinc-500 hover:text-primary border border-white/5 px-10 py-5 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-primary/5 hover:border-primary/20 transition-all duration-500">
             Lock Configuration <Save size={16} />
           </button>
        </div>
      </div>
    </div>
  );
}

function SettingRow({ icon, title, desc, defaultEnabled }: { icon: React.ReactNode, title: string, desc: string, defaultEnabled?: boolean }) {
  const [enabled, setEnabled] = useState(defaultEnabled ?? false);

  return (
    <div 
      className="flex items-center justify-between p-6 rounded-2xl bg-[#090909] border border-white/5 cursor-pointer hover:border-white/10 transition-all select-none"
      onClick={() => setEnabled(!enabled)}
    >
       <div className="flex items-center gap-6">
          <div className="h-14 w-11 rounded-2xl bg-black flex items-center justify-center text-orange-500 shadow-inner">
            {icon}
          </div>
          <div className="flex flex-col gap-1">
            <h4 className="text-[12px] font-black uppercase tracking-widest text-white font-serif">{title}</h4>
            <p className="text-[11px] text-zinc-500 font-medium leading-relaxed max-w-[220px]">{desc}</p>
          </div>
       </div>
       <div className={`h-6 w-12 rounded-full relative p-1 transition-colors duration-300 ${enabled ? 'bg-[#2a1a08]' : 'bg-black border border-white/5'}`}>
          <div className={`h-full aspect-square rounded-full transition-all duration-300 shadow-xl ${enabled ? 'translate-x-[22px] bg-orange-500' : 'translate-x-0 bg-zinc-500'}`} />
       </div>
    </div>
  );
}
