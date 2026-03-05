import { HeroSlider } from '../components/HeroSlider'
import { DiagnosisQuiz } from '../components/DiagnosisQuiz'
import coverImage from '../images/imagemPrincipal.png'

export function HomeScreen({ slides, ctaLink, checkoutUrl, onStartQuiz, loading }) {
  const sliderSlides = slides.map((slide) => ({ 
    ...slide, 
    ctaLink: slide.ctaLink ?? ctaLink ?? '#courses',
    checkoutUrl: slide.checkoutUrl ?? checkoutUrl ?? '#checkout'
  }))
  const primarySlide = sliderSlides[0] ?? {}
  const primaryDescription = primarySlide.description ?? 'Transforme sua realidade com o Método Destrave.'

  return (
    <section id="home" className="relative text-zinc-950">
      {/* Top Banner Image - Revertido para visibilidade total e tamanho original */}
      <div className="relative w-full overflow-hidden">
        <img
          src={coverImage}
          alt="Main Cover"
          className="w-full h-auto block mx-auto max-h-[70vh] object-contain md:max-h-[85vh]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white/10 via-transparent to-transparent pointer-events-none"></div>
      </div>

      {/* Main Content Card - Sobreposição elegante e responsiva */}
      <div className="relative z-10 -mt-20 px-4 sm:px-6 md:-mt-32 md:px-8 lg:-mt-48">
        <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000 mx-auto max-w-5xl rounded-[2.5rem] border border-slate-100 bg-white/80 backdrop-blur-xl p-8 shadow-[0_25px_60px_rgba(0,0,0,0.15)] sm:p-12 md:rounded-[4rem] md:p-20">
          <div className="text-center">
            <span className="mb-6 inline-flex items-center gap-2 rounded-full bg-brand-primary/10 px-4 py-1.5 text-[10px] font-extrabold uppercase tracking-widest text-brand-primary md:mb-10 md:px-8 md:py-3 md:text-sm">
              {primarySlide.badge ?? '✨ MÉTODO EXCLUSIVO'}
            </span>
            
            <h1 className="text-3xl font-[900] leading-[1.1] tracking-tight text-zinc-900 sm:text-5xl md:text-7xl lg:text-8xl">
              {primarySlide.title1} <br />
              <span className="italic text-brand-primary drop-shadow-sm">
                {primarySlide.title2}
              </span>
            </h1>
            
            <p className="mx-auto mt-8 max-w-3xl text-base font-medium leading-relaxed text-zinc-600 sm:text-xl md:mt-12 md:text-2xl lg:text-3xl">
              {primaryDescription}
            </p>
          </div>
        </div>
      </div>

      {/* Diagnosis Quiz Section - Agora com botão para tela dedicada */}
      <div id="diagnosis" className="mt-20 px-4 sm:px-6 md:mt-32 md:px-8 lg:mt-48">
        <div className="text-center mb-12 md:mb-20">
           <h2 className="text-2xl font-black text-zinc-900 sm:text-4xl md:text-6xl">Faça seu Diagnóstico</h2>
           <p className="mt-4 text-base text-slate-500 font-medium sm:text-lg md:mt-6">Identifique os padrões subconscientes que estão travando sua prosperidade.</p>
           
           <div className="mt-10 md:mt-16">
              <button 
                onClick={() => {
                  window.scrollTo(0, 0);
                  onStartQuiz();
                }}
                className="group relative inline-flex items-center justify-center rounded-full bg-brand-primary px-10 py-5 text-lg font-black uppercase tracking-widest text-white shadow-[0_20px_50px_rgba(139,92,246,0.3)] transition-all duration-300 hover:scale-105 hover:bg-brand-dark active:scale-95 sm:px-16 sm:py-6 sm:text-xl"
              >
                <span className="relative z-10">Iniciar Diagnóstico Grátis</span>
                <div className="absolute inset-0 rounded-full bg-white/20 opacity-0 transition-opacity group-hover:opacity-100"></div>
              </button>
              <p className="mt-6 text-sm font-bold uppercase tracking-tighter text-brand-primary opacity-70">
                Leva apenas 2 minutos • 100% Privado
              </p>
           </div>
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
