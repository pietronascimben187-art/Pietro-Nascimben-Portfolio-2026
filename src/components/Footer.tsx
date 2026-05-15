export function Footer() {
  return (
    <footer className="w-full py-32 mt-24 border-t border-gray-100 bg-[#fefefe]">
      <div className="max-w-7xl mx-auto px-8 flex flex-col items-center gap-12 text-center">
        <div className="flex flex-col gap-4">
          <p className="text-sm font-bold text-gray-400 uppercase tracking-[0.2em]">Maybe you would like to know</p>
          <h2 className="text-5xl md:text-8xl font-black tracking-tighter uppercase text-gray-900">
            Let&apos;s Work<br/>On It
          </h2>
        </div>
        
        <a 
          href="mailto:contact@example.com" 
          className="mt-4 px-10 py-5 bg-black text-white font-bold uppercase tracking-wider text-sm hover:bg-gray-800 hover:-translate-y-1 transition-all duration-300"
        >
          Get in touch
        </a>
        
        <div className="flex gap-8 mt-16 text-xs font-bold text-gray-400 uppercase tracking-widest">
          <a href="#" className="hover:text-black transition-colors">Instagram</a>
          <a href="#" className="hover:text-black transition-colors">LinkedIn</a>
          <a href="#" className="hover:text-black transition-colors">Behance</a>
        </div>
      </div>
    </footer>
  );
}
