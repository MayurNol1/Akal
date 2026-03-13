import Link from 'next/link';
import Image from "next/image";
import { 
  Sparkles, 
  Compass, 
  ArrowRight,
  ShieldCheck,
  Leaf
} from "lucide-react";

export const dynamic = "force-dynamic";

export default async function HomePage() {

  return (
    <div className="bg-black text-white min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image 
            src="/images/hero.png" 
            alt="The Eternal Path" 
            fill 
            className="object-cover opacity-70 scale-100 animate-slow-zoom"
            priority
          />
          <div className="absolute inset-0 bg-linear-to-b from-black/40 via-transparent to-black" />
          {/* Cosmic Glow Overlay */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops))] from-blue-900/10 via-transparent to-transparent opacity-60" />
        </div>

        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto space-y-10 animate-fade-in">
          <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full glass border-gold/20 text-gold text-[10px] font-bold uppercase tracking-[0.4em]">
            <Sparkles size={14} className="animate-pulse" />
            Transcending Time & Space
          </div>
          
          <div className="space-y-4">
            <h1 className="text-7xl md:text-9xl font-serif italic tracking-tighter leading-tight bg-linear-to-b from-white via-zinc-200 to-zinc-500 bg-clip-text text-transparent">
              The Eternal <br /> 
              <span className="gold-gradient">Path</span>
            </h1>
            <p className="text-lg md:text-xl text-zinc-400 font-light max-w-2xl mx-auto leading-relaxed tracking-wide">
              Hand-selected artifacts from the mystical lands of the Himalayas. 
              Pure vibration, hand-crafted for the modern seeker.
            </p>
          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-center gap-8">
            <Link
              href="/products"
              className="relative rounded-full bg-white text-black px-12 py-5 text-xs font-bold uppercase tracking-[0.3em] shadow-[0_0_30px_rgba(255,255,255,0.1)] hover:scale-105 transition-all duration-500 group overflow-hidden"
            >
              <span className="relative z-10">Shop Collections</span>
              <div className="absolute inset-0 bg-gold translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
            </Link>
            
            <Link
              href="/about"
              className="text-xs font-bold uppercase tracking-[0.3em] text-zinc-500 hover:text-white transition-colors flex items-center gap-3 group"
            >
              Our Philosophy
              <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform duration-500" />
            </Link>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4">
          <span className="text-[10px] uppercase tracking-[0.5em] text-zinc-600 font-bold">Scroll to Begin</span>
          <div className="w-px h-12 bg-linear-to-b from-gold/40 to-transparent" />
        </div>
      </section>

      {/* Featured Collections Section */}
      <section className="py-32 px-6 max-w-7xl mx-auto bg-black relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-linear-to-r from-transparent via-white/10 to-transparent" />
        
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div className="space-y-4">
            <div className="h-1 w-20 bg-gold/50" />
            <h2 className="text-4xl md:text-5xl font-serif italic gold-gradient">
              Sacred Artifacts
            </h2>
            <p className="text-zinc-500 max-w-md font-light tracking-wide">
              Each piece is ethically sourced and energized to resonate with your higher self.
            </p>
          </div>
          <Link href="/products" className="text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-500 hover:text-gold transition-all border-b border-zinc-800 pb-1">
            View All Sacred Goods
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
           <ProductCard 
             image="/images/rudraksha.png" 
             title="5-faced Himalayan Rudraksha" 
             price="$108.00" 
             category="Malas"
           />
           <ProductCard 
             image="/images/lingam.png" 
             title="Obsidian Shiva Lingam" 
             price="$245.00"
             category="Statues"
           />
           <ProductCard 
             image="/images/hero.png" // Placeholder for now
             title="Transcendent Incense Set" 
             price="$45.00"
             category="Aroma"
           />
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-40 bg-zinc-950 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_0%_0%,rgba(212,175,55,0.05),transparent_50%)]" />
        <div className="max-w-4xl mx-auto px-6 text-center space-y-12 relative z-10">
          <Sparkles className="mx-auto text-gold/40" size={40} />
          <h2 className="text-5xl md:text-6xl font-serif italic leading-snug">
            &ldquo;Akaal is the timeless state where the seeker finds the source.&rdquo;
          </h2>
          <div className="w-24 h-px bg-gold/30 mx-auto" />
          <p className="text-zinc-400 text-lg font-light leading-relaxed max-w-2xl mx-auto tracking-wide">
            Inspired by the cosmic energy of Lord Mahadev, Akaal curate items that serve as gateways to tranquility. 
            From the deep forests of the East to the high peaks of the North, we bring you the essence of divinity.
          </p>
        </div>
      </section>

      {/* Ritual Features */}
      <section className="py-32 px-6 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-20">
          <Feature icon={<ShieldCheck className="text-gold/60" size={28} />} title="Pure Lineage" desc="Every product carries a verified history of authenticity and spiritual charge." />
          <Feature icon={<Compass className="text-gold/60" size={28} />} title="High Vibration" desc="Items are stored in sacred environments to maintain their natural energy." />
          <Feature icon={<Leaf className="text-gold/60" size={28} />} title="Ethical Sourcing" desc="We work directly with artisans, ensuring fair trade and ecological respect." />
      </section>

      {/* Final Call to Action */}
      <section className="py-40 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(30,58,138,0.1),transparent_70%)]" />
        <div className="max-w-2xl mx-auto px-6 space-y-10 relative z-10">
          <h2 className="text-5xl md:text-6xl font-serif">Begin Your Journey</h2>
          <p className="text-zinc-500 font-light tracking-widest text-sm uppercase">Join the circle of seekers</p>
          <div className="flex justify-center">
            <Link href="/register" className="glass px-12 py-5 rounded-full text-[10px] font-bold uppercase tracking-[0.4em] hover:bg-white hover:text-black transition-all duration-500">
              Create Account
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-24 border-t border-white/5 bg-black">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-16 mb-20 text-left">
          <div className="space-y-6">
            <h3 className="text-2xl font-serif italic gold-gradient">Akaal</h3>
            <p className="text-zinc-500 text-sm font-light leading-relaxed">
              Curating high-vibration spiritual artifacts for the modern path. Eternal essence in every piece.
            </p>
          </div>
          <FooterLinks title="Explore" links={["Collections", "New Arrivals", "Best Sellers", "Ritual Sets"]} />
          <FooterLinks title="Philosophy" links={["Our Origins", "The Mahadev Path", "Authenticity", "Contact"]} />
          <FooterLinks title="Connect" links={["Instagram", "YouTube", "Twitter", "Community"]} />
        </div>
        <div className="max-w-7xl mx-auto px-6 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] uppercase tracking-widest text-zinc-600 font-bold">© 2026 Akaal Spiritual E-commerce</p>
          <p className="text-[10px] uppercase tracking-widest text-zinc-600 font-bold italic">Inspired by the Eternal</p>
        </div>
      </footer>
    </div>
  );
}

function Feature({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  return (
    <div className="space-y-6 group">
      <div className="h-16 w-16 glass rounded-2xl flex items-center justify-center border border-white/10 group-hover:border-gold/30 transition-all duration-500 group-hover:scale-110">
        {icon}
      </div>
      <div className="space-y-3">
        <h4 className="text-xl font-serif italic">{title}</h4>
        <p className="text-sm text-zinc-500 leading-relaxed font-light tracking-wide">{desc}</p>
      </div>
    </div>
  );
}

function FooterLinks({ title, links }: { title: string, links: string[] }) {
  return (
    <div className="space-y-6">
      <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold text-zinc-400">{title}</h4>
      <ul className="space-y-4">
        {links.map((link) => (
          <li key={link}>
            <a href="#" className="text-sm text-zinc-600 hover:text-gold transition-colors font-light">{link}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ProductCard({ image, title, price, category }: { image: string, title: string, price: string, category: string }) {
  return (
    <div className="group space-y-6 cursor-pointer">
      <div className="aspect-3/4 w-full relative overflow-hidden rounded-4xl border border-white/5 bg-zinc-900 shadow-2xl">
        <Image 
          src={image} 
          alt={title} 
          fill 
          className="object-cover transition-transform duration-1000 group-hover:scale-110 opacity-90 group-hover:opacity-100" 
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent opacity-60" />
        <div className="absolute bottom-8 left-8 right-8 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
          <button className="w-full bg-white text-black py-4 rounded-xl text-[10px] font-bold uppercase tracking-[0.2em] shadow-xl hover:bg-gold transition-colors">
            Quick Acquire
          </button>
        </div>
      </div>
      <div className="space-y-2 px-2 text-center">
        <p className="text-[9px] uppercase tracking-[0.4em] text-gold font-bold">{category}</p>
        <h3 className="text-xl font-serif italic group-hover:text-gold transition-colors duration-500">{title}</h3>
        <p className="text-sm font-light text-zinc-400 ">{price}</p>
      </div>
    </div>
  );
}

