import { FiShield, FiZap, FiLock, FiCheckCircle } from 'react-icons/fi';

export function HeroSlider({ slides }) {
  const isBRL = typeof document !== 'undefined' && document.documentElement.lang === 'pt';

  return (
    <div className="relative overflow-hidden py-4">
      <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto pt-8 pb-12 px-4 scrollbar-hide md:gap-8 md:px-8">
        {slides.map((slide) => {
          const displayPrice = isBRL && slide.price?.brl ? slide.price.brl.main : slide.price?.main;
          const displayOldPrice = isBRL && slide.price?.brl ? slide.price.brl.oldPrice : slide.price?.oldPrice;

          return (
            <section
              key={slide.id ?? (slide.title || slide.title1)}
              className="relative w-full shrink-0 snap-center rounded-[2.5rem] bg-gradient-to-br from-white via-slate-50 to-purple-50/30 p-6 text-zinc-950 shadow-[0_20px_50px_-12px_rgba(107,33,168,0.25)] border border-brand-primary/10 transition-transform duration-500 ease-out hover:-translate-y-2 sm:p-10 md:rounded-[3.5rem] lg:p-14"
            >
              {/* Badge Flutuante */}
              {slide.badge && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 sm:left-10 sm:translate-x-0">
                  <span className="inline-flex items-center gap-2 rounded-full bg-brand-dark px-6 py-2 text-[10px] font-black uppercase tracking-widest text-brand-accent shadow-lg shadow-brand-dark/30 md:text-xs">
                    {slide.badge}
                  </span>
                </div>
              )}

              <div className="grid gap-8 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:gap-16 mt-4">
                <div className="flex items-center justify-center overflow-hidden">
                  {slide.image && (
                    <img
                      src={slide.image}
                      alt={slide.imageAlt ?? (slide.title || slide.title1)}
                      className="h-auto w-full max-w-[280px] object-contain drop-shadow-[0_25px_35px_rgba(0,0,0,0.3)] transition-transform duration-700 hover:scale-105 sm:max-w-md md:max-w-full"
                      loading="lazy"
                    />
                  )}
                </div>

                <div className="flex flex-col gap-6 justify-center">
                  
                  {Array.isArray(slide.features) && slide.features.length > 0 && (
                    <ul className="grid gap-3 text-sm text-zinc-700 sm:text-base">
                      {slide.features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-3 rounded-2xl border border-white bg-white/60 p-4 shadow-sm backdrop-blur-sm transition-all hover:bg-white hover:shadow-md">
                          <FiCheckCircle className="mt-1 h-5 w-5 shrink-0 text-brand-primary" />
                          <span className="font-bold text-slate-800">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  <div className="mt-4">
                    <a
                      href={slide.ctaLink ?? '#courses'}
                      target={(slide.ctaLink ?? '').startsWith('#') ? '_self' : '_blank'}
                      rel="noreferrer"
                      className="animate-pulse-slow inline-flex w-full items-center justify-center gap-2 rounded-full bg-gold-gradient px-8 py-5 text-base font-black uppercase tracking-wider text-brand-dark shadow-gold-glow transition-all duration-300 hover:scale-105 hover:brightness-110 md:px-12 md:py-6 md:text-lg"
                    >
                      {slide.cta}
                    </a>
                    
                    {/* Trust Bar */}
                    <div className="mt-6 flex flex-wrap items-center justify-center gap-4 border-t border-slate-100 pt-6">
                      <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
                        <FiShield className="text-brand-secondary" />
                        <span>Compra Segura</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
                        <FiZap className="text-brand-secondary" />
                        <span>Acesso Imediato</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
                        <FiLock className="text-brand-secondary" />
                        <span>Dados Protegidos</span>
                      </div>
                    </div>

                    <p className="mt-4 text-center text-[10px] font-bold uppercase tracking-widest text-slate-400">
                      ⏱️ Leva menos de 2 minutos
                    </p>
                  </div>
                </div>
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
