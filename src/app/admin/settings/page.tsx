"use client";

import { Save, Database, CloudFog, ShieldAlert } from "lucide-react";

export default function AdminSettingsPage() {
  return (
    <div className="space-y-12 animate-fade-in relative z-10">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-white/5 pb-10">
        <div className="space-y-4">
           <div className="h-px w-12 bg-primary/50" />
           <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-zinc-600">Master Controls</p>
           <h1 className="text-5xl font-serif italic text-white tracking-tight">Core <span className="text-primary not-italic">Mechanics</span></h1>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
         {/* System Config */}
         <div className="space-y-6">
            <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-500 pl-4 border-l-2 border-primary">System Overrides</h2>
            <div className="space-y-4">
               <AdminConfigRow icon={<Database />} title="Entity Caching" active />
               <AdminConfigRow icon={<CloudFog />} title="Webhooks (Stripe)" active />
               <AdminConfigRow icon={<ShieldAlert />} title="Sanctuary Lockdown" danger />
            </div>
         </div>

         {/* Variables */}
         <div className="bg-white/2 border border-white/5 rounded-[32px] p-8 shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-3xl rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-1000" />
            <div className="relative z-10 space-y-8">
               <h3 className="font-serif italic text-xl text-white">Universal Constants</h3>
               <div className="space-y-4">
                  <div className="space-y-2">
                     <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Global Tax Rate (%)</label>
                     <input type="number" defaultValue="18" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50 text-sm font-bold" />
                  </div>
                  <div className="space-y-2">
                     <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Support Enclave Email</label>
                     <input type="email" defaultValue="master@akaal.zen" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50 text-sm font-bold" />
                  </div>
               </div>
               <button className="flex items-center gap-3 bg-primary text-background-dark px-6 py-4 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-white transition-all shadow-xl">
                 Commit to Registry <Save size={16} />
               </button>
            </div>
         </div>
      </div>
    </div>
  );
}

function AdminConfigRow({ icon, title, active, danger }: { icon: React.ReactNode, title: string, active?: boolean, danger?: boolean }) {
  return (
    <div className={`flex items-center justify-between p-6 rounded-2xl bg-white/2 border group transition-all ${danger ? 'border-red-500/20 hover:border-red-500/40' : 'border-white/5 hover:border-primary/20'}`}>
       <div className="flex items-center gap-4">
          <div className={`text-zinc-500 transition-colors ${danger ? 'group-hover:text-red-400' : 'group-hover:text-primary'}`}>
             <div className="scale-75">{icon}</div>
          </div>
          <span className={`text-[11px] font-black uppercase tracking-widest ${danger ? 'text-red-500' : 'text-zinc-300'}`}>{title}</span>
       </div>
       <div className={`h-6 w-12 rounded-full border relative p-1 transition-colors ${active ? 'bg-primary/10 border-primary/20' : 'bg-background-dark border-white/10'}`}>
          <div className={`h-full aspect-square rounded-full transition-transform ${active ? 'bg-primary translate-x-6 shadow-[0_0_8px_rgba(236,149,19,0.5)]' : 'bg-zinc-600'}`} />
       </div>
    </div>
  );
}
