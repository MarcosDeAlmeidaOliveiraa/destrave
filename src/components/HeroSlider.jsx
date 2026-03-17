import { FiShield, FiZap, FiLock, FiCheckCircle } from 'react-icons/fi';

export function HeroSlider({ slides }) {
  const isBRL = typeof document !== 'undefined' && document.documentElement.lang === 'pt';

  return (
    <div className="relative overflow-hidden">
      <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto py-2 scrollbar-hide md:gap-6">
        {slides.map((slide) => {
          const displayPrice = isBRL && slide.price?.brl ? slide.price.brl.main : slide.price?.main;
          const displayOldPrice = isBRL && slide.price?.brl ? slide.price.brl.oldPrice : slide.price?.oldPrice;

          return (
            <section
              key={slide.id ?? (slide.title || slide.title1)}
              className="relative w-full shrink-0 snap-center rounded-[2rem] bg-white p-6 text-zinc-950 shadow-luxury transition-transform duration-300 ease-out hover:-translate-y-1 sm:p-8 md:rounded-[3rem] md:p-10 lg:p-12"
            >
              <div className="grid gap-6 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:gap-10">
                <div className="flex items-center justify-center overflow-hidden">
                  {slide.image && (
                    <img
                      src={slide.image}
                      alt={slide.imageAlt ?? (slide.title || slide.title1)}
                      className="h-auto w-full max-w-[300px] object-contain drop-shadow-2xl sm:max-w-md md:max-w-full"
                      loading="lazy"
                    />
                  )}
                </div>

                <div className="flex flex-col gap-6 justify-center">
                  {slide.tagline && <span className="text-[10px] font-bold uppercase tracking-[0.35em] text-brand-primary md:text-xs">{slide.tagline}</span>}
                  
                  {Array.isArray(slide.features) && slide.features.length > 0 && (
                    <ul className="grid gap-3 text-sm text-zinc-700 sm:text-base">
                      {slide.features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-3 rounded-2xl border border-slate-50 bg-slate-50/50 p-4 transition-all hover:bg-slate-50">
                          <FiCheckCircle className="mt-1 h-5 w-5 shrink-0 text-brand-accent drop-shadow-[0_0_8px_rgba(245,158,11,0.5)]" />
                          <span className="font-medium">{feature}</span>
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
