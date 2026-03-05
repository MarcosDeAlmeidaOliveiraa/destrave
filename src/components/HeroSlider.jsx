export function HeroSlider({ slides }) {
  const isBRL = typeof document !== 'undefined' && document.documentElement.lang === 'pt';

  return (
    <div className="relative overflow-hidden">
      <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 py-2 scrollbar-hide md:gap-6 md:px-6">
        {slides.map((slide) => {
          const displayPrice = isBRL && slide.price?.brl ? slide.price.brl.main : slide.price?.main;
          const displayOldPrice = isBRL && slide.price?.brl ? slide.price.brl.oldPrice : slide.price?.oldPrice;

          return (
            <section
              key={slide.id ?? (slide.title || slide.title1)}
              className="relative w-[88%] shrink-0 snap-center rounded-[2rem] border border-slate-200 bg-white/80 backdrop-blur-md p-6 text-zinc-950 shadow-xl transition-transform duration-300 ease-out hover:-translate-y-1 sm:w-[80%] md:w-[85%] md:p-8 lg:w-full lg:rounded-[2.5rem]"
            >
              <div className="grid gap-6 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:gap-10">
                <div className="relative min-h-[300px] overflow-hidden rounded-3xl border border-slate-100 bg-slate-50 sm:min-h-[400px] md:h-full lg:h-[600px]">
                  {slide.image && (
                    <img
                      src={slide.image}
                      alt={slide.imageAlt ?? (slide.title || slide.title1)}
                      className="h-full w-full object-contain object-center p-2"
                      loading="lazy"
                    />
                  )}
                  {displayPrice && (
                    <div className="absolute bottom-4 right-4 rounded-full bg-brand-primary px-3 py-1.5 text-white shadow-lg md:px-4 md:py-2">
                      <span className="text-xs font-bold md:text-sm">{displayPrice}</span>
                    </div>
                  )}
                </div>

                <div className="flex flex-col gap-4">
                  {slide.tagline && <span className="text-[10px] font-bold uppercase tracking-[0.35em] text-brand-primary md:text-xs">{slide.tagline}</span>}
                  <div>
                    <h1 className="text-2xl font-extrabold text-zinc-950 sm:text-3xl md:text-4xl lg:text-5xl leading-tight">
                      {slide.title || (
                        <>
                          <span className="block">{slide.title1}</span>
                          <span className="block text-brand-primary">{slide.title2}</span>
                        </>
                      )}
                    </h1>
                    {slide.description && <p className="mt-3 text-balance text-sm text-zinc-700 sm:text-base lg:text-lg">{slide.description}</p>}
                  </div>

                  {Array.isArray(slide.features) && slide.features.length > 0 && (
                    <ul className="grid gap-2 text-xs text-zinc-700 sm:text-sm md:grid-cols-2">
                      {slide.features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-2 rounded-xl border border-slate-100 bg-slate-50 p-2 md:p-3">
                          <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-primary" aria-hidden />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {slide.price?.note && (
                    <p className="text-[10px] font-bold uppercase tracking-wide text-brand-primary md:text-xs">
                      {slide.price.note}
                    </p>
                  )}

                  <div className="mt-auto flex flex-col gap-4 pt-4 sm:flex-row sm:items-center">
                    {displayPrice && (
                      <div className="flex flex-col">
                        {displayOldPrice && (
                          <span className="text-base font-extrabold text-red-600 line-through decoration-red-600/40 md:text-lg lg:text-xl">
                            {displayOldPrice}
                          </span>
                        )}
                        <div className="flex items-baseline gap-2">
                          <span
                            className="text-2xl font-black text-brand-primary sm:text-3xl md:text-4xl lg:text-5xl"
                            style={{
                              letterSpacing: '-0.02em',
                            }}
                          >
                            {displayPrice}
                          </span>
                        </div>
                      </div>
                    )}
                    <a
                      href={slide.ctaLink ?? '#courses'}
                      target={(slide.ctaLink ?? '').startsWith('#') ? '_self' : '_blank'}
                      rel="noreferrer"
                      className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-brand-primary bg-brand-primary px-6 py-3 text-sm font-black uppercase text-white shadow-md transition-all duration-300 hover:bg-white hover:text-brand-primary sm:px-8 sm:py-4 sm:text-base"
                    >
                      {slide.cta}
                    </a>
                  </div>
                </div>
              </div>
            </section>
          );
        })}
      </div>

      <div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-brand-accent/20 via-brand-accent/10 to-transparent" aria-hidden />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-brand-accent/20 via-brand-accent/10 to-transparent" aria-hidden />
    </div>
  )
}
