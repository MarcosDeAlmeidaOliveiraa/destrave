import { HeroSlider } from '../components/HeroSlider'
import { DiagnosisQuiz } from '../components/DiagnosisQuiz'
import coverImage from '../images/imagemPrincipal.png'

export function HomeScreen({ slides, ctaLink, loading }) {
  const sliderSlides = slides.map((slide) => ({ ...slide, ctaLink: slide.ctaLink ?? ctaLink ?? '#courses' }))
  const primarySlide = sliderSlides[0] ?? {}
  const primaryDescription = primarySlide.description ?? 'Transforme sua realidade com o Método Destrave.'

  return (
    <section id="home" className="relative bg-white text-zinc-950">
      {/* Top Banner Image */}
      <div className="relative h-[25vh] min-h-[180px] max-h-[400px] w-full overflow-hidden md:h-[50vh] md:max-h-[600px]">
        <img
          src={coverImage}
          alt="Main Cover"
          className="h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent"></div>
      </div>

      {/* Main Content Card - Positioned Below the Image */}
      <div className="relative z-10 -mt-10 px-4 md:-mt-32 md:px-8">
        <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000 mx-auto max-w-4xl rounded-[2rem] border border-slate-100 bg-white p-6 shadow-[0_20px_50px_rgba(0,0,0,0.12)] md:rounded-[3.5rem] md:p-16">
          <div className="text-center">
            <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-brand-primary/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-brand-primary md:mb-8 md:px-6 md:py-2 md:text-xs">
              {primarySlide.badge ?? '✨ MÉTODO EXCLUSIVO'}
            </span>
            
            <h1 className="text-2xl font-black leading-tight tracking-tight text-zinc-950 sm:text-4xl md:text-6xl lg:text-7xl">
              {primarySlide.title1} <br />
              <span className="italic text-brand-primary">
                {primarySlide.title2}
              </span>
            </h1>
            
            <p className="mx-auto mt-4 max-w-2xl text-sm font-medium leading-relaxed text-zinc-600 md:mt-8 md:text-xl lg:text-2xl">
              {primaryDescription}
            </p>

            <div className="mt-8 flex justify-center md:mt-12">
              <a 
                href={primarySlide.ctaLink}
                className="inline-flex h-12 items-center justify-center rounded-full bg-zinc-950 px-8 text-sm font-black uppercase tracking-widest text-white shadow-xl transition-all duration-300 hover:scale-105 hover:bg-brand-primary md:h-16 md:px-12 md:text-base"
              >
                {primarySlide.cta || 'Começar Agora'}
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Diagnosis Quiz Section */}
      <div className="mt-16 px-4 md:mt-32">
        <div className="text-center mb-10">
           <h2 className="text-3xl font-black text-zinc-900 md:text-5xl">Faça seu Diagnóstico</h2>
           <p className="mt-4 text-slate-500 font-medium">Responda as perguntas abaixo para identificar seus bloqueios.</p>
        </div>
        <DiagnosisQuiz checkoutUrl={primarySlide.checkoutUrl} />
      </div>

      {/* Additional Content / Slider Section */}
      <div className="mt-16 space-y-8 px-4 pb-12 md:mt-32 md:space-y-16 md:px-8 md:pb-24">
        <div className="mx-auto max-w-5xl">
           <HeroSlider slides={sliderSlides} />
        </div>
      </div>
    </section>
  )
}
