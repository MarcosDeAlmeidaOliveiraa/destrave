import { HeroSlider } from '../components/HeroSlider'
import { DiagnosisQuiz } from '../components/DiagnosisQuiz'
import coverImage from '../images/imagemPrincipal.png'

export function HomeScreen({ slides, ctaLink, loading }) {
  const sliderSlides = slides.map((slide) => ({ ...slide, ctaLink: slide.ctaLink ?? ctaLink ?? '#courses' }))
  const primarySlide = sliderSlides[0] ?? {}
  const primaryDescription = primarySlide.description ?? 'Transforme sua realidade com o Método Destrave.'

  return (
    <section id="home" className="relative bg-white text-zinc-950">
      {/* Top Banner Image - Ajustado para visibilidade total */}
      <div className="relative w-full bg-white overflow-hidden">
        <img
          src={coverImage}
          alt="Main Cover"
          className="w-full h-auto block mx-auto max-h-[70vh] object-contain md:max-h-[85vh]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white/10 via-transparent to-transparent pointer-events-none"></div>
      </div>

      {/* Main Content Card - Posicionado logo abaixo com sobreposição mínima */}
      <div className="relative z-10 -mt-6 px-4 sm:px-6 md:-mt-16 md:px-8 lg:-mt-24">
        <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000 mx-auto max-w-4xl rounded-[2rem] border border-slate-100 bg-white p-6 shadow-[0_20px_50px_rgba(0,0,0,0.12)] sm:p-10 md:rounded-[3.5rem] md:p-16">
          <div className="text-center">
            <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-brand-primary/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-brand-primary md:mb-8 md:px-6 md:py-2 md:text-xs">
              {primarySlide.badge ?? '✨ MÉTODO EXCLUSIVO'}
            </span>
            
            <h1 className="text-2xl font-black leading-tight tracking-tight text-zinc-950 sm:text-3xl md:text-5xl lg:text-7xl">
              {primarySlide.title1} <br />
              <span className="italic text-brand-primary">
                {primarySlide.title2}
              </span>
            </h1>
            
            <p className="mx-auto mt-4 max-w-2xl text-sm font-medium leading-relaxed text-zinc-600 sm:text-base md:mt-8 md:text-xl lg:text-2xl">
              {primaryDescription}
            </p>

            <div className="mt-8 flex justify-center md:mt-12">
              <a 
                href={primarySlide.checkoutUrl || primarySlide.ctaLink}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-12 items-center justify-center rounded-full bg-brand-primary px-8 text-sm font-black uppercase tracking-widest text-white shadow-xl transition-all duration-300 hover:scale-105 hover:bg-brand-dark sm:h-14 sm:px-10 md:h-16 md:px-12 md:text-base"
              >
                {primarySlide.cta || 'Começar Agora'}
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Diagnosis Quiz Section */}
      <div className="mt-12 px-4 sm:px-6 md:mt-24 md:px-8 lg:mt-32">
        <div className="text-center mb-10">
           <h2 className="text-2xl font-black text-zinc-900 sm:text-3xl md:text-5xl">Faça seu Diagnóstico</h2>
           <p className="mt-3 text-sm text-slate-500 font-medium sm:text-base md:mt-4">Responda as perguntas abaixo para identificar seus bloqueios.</p>
        </div>
        <div className="mx-auto max-w-2xl">
          <DiagnosisQuiz checkoutUrl={primarySlide.checkoutUrl} />
        </div>
      </div>

      {/* Additional Content / Slider Section */}
      <div className="mt-16 space-y-8 px-4 pb-12 sm:px-6 md:mt-32 md:space-y-16 md:px-8 md:pb-24">
        <div className="mx-auto max-w-5xl">
           <HeroSlider slides={sliderSlides} />
        </div>
      </div>
    </section>
  )
}
