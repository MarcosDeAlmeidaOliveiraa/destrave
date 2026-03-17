export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full rounded-b-[2.5rem] border-b border-white/10 bg-brand-dark/95 backdrop-blur-xl shadow-luxury sm:rounded-b-[3rem]">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6 sm:px-8 sm:py-8">
        <div className="flex flex-col items-start justify-center">
          <span className="text-3xl font-black tracking-tighter text-white sm:text-4xl uppercase drop-shadow-md leading-none">
            Destrave
          </span>
          <span className="mt-1 pl-1 text-[10px] font-bold uppercase tracking-[0.3em] text-brand-accent sm:text-xs">
            Daniela Maira
          </span>
        </div>
        
        <a 
          href="https://danielaferrenhamove.com.br/finalizar.php"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center justify-center rounded-full bg-gold-gradient px-6 py-3 text-[13px] font-black uppercase tracking-wider text-brand-dark shadow-gold-glow transition-all hover:scale-105 md:px-8 md:py-3.5 md:text-sm animate-pulse-slow"
        >
          Comprar Agora
        </a>
      </div>
    </header>
  )
}
