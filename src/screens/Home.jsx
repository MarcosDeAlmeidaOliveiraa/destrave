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
    <section id="home" className="relative text-zinc-950 pt-10 sm:pt-16">
      {/* Main Content Card - Premium High-Converting Design */}
      <div className="relative z-10 px-4 sm:px-6 md:px-8">
        <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000 mx-auto max-w-6xl overflow-hidden rounded-[2.5rem] bg-brand-dark shadow-luxury border border-white/10 sm:rounded-[3rem] lg:rounded-[4rem] relative">
          
          {/* Background effects */}
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10 mix-blend-overlay"></div>
          <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-brand-secondary/40 blur-[100px] pointer-events-none"></div>
          <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-brand-accent/20 blur-[100px] pointer-events-none"></div>

          <div className="relative z-10 grid gap-10 px-6 py-12 sm:px-12 sm:py-16 md:grid-cols-2 md:items-center md:gap-16 md:px-16 md:py-24 lg:p-24">
            
            {/* Text Column */}
            <div className="text-center md:text-left flex flex-col justify-center">
              <div className="mb-6 flex justify-center md:justify-start">
                <span className="inline-flex items-center gap-2 rounded-full border border-brand-accent/30 bg-brand-accent/10 px-4 py-1.5 text-[10px] font-extrabold uppercase tracking-widest text-brand-accent shadow-[0_0_15px_rgba(245,158,11,0.2)] md:mb-8 md:px-6 md:py-2.5 md:text-xs">
                  <span className="h-2 w-2 rounded-full bg-brand-accent animate-pulse"></span>
                  {primarySlide.badge ?? '✨ MÉTODO EXCLUSIVO'}
                </span>
              </div>
              
              <h1 className="text-3xl font-[900] leading-[1.1] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
                {primarySlide.title1} <br className="hidden sm:block" />
                <span className="mt-2 block bg-gradient-to-r from-brand-accent to-yellow-200 bg-clip-text text-transparent drop-shadow-sm pb-2">
                  {primarySlide.title2}
                </span>
              </h1>
              
              <p className="mx-auto mt-6 max-w-xl text-base font-medium leading-relaxed text-white/80 sm:text-lg md:mx-0 md:mt-8 md:text-xl lg:text-2xl">
                {primaryDescription}
              </p>

              <div className="mt-10 flex flex-col sm:flex-row items-center gap-4 justify-center md:justify-start">
                  <button 
                    onClick={() => {
                      document.getElementById('diagnosis')?.scrollIntoView({ behavior: 'smooth' });
                      onStartQuiz();
                    }}
                    className="w-full sm:w-auto inline-flex items-center justify-center rounded-full bg-gold-gradient px-8 py-4 text-sm font-black uppercase tracking-widest text-brand-dark shadow-gold-glow transition-all duration-300 hover:scale-105 hover:brightness-110 active:scale-95 animate-pulse-slow md:px-10 md:py-5 md:text-base"
                  >
                    Quero Me Destravar
                  </button>
              </div>
            </div>

            {/* Image Column */}
            <div className="relative flex justify-center md:justify-end">
              <div className="relative w-full max-w-[280px] sm:max-w-[380px] lg:max-w-[480px]">
                {/* Glow behind image */}
                <div className="absolute inset-0 rounded-full bg-brand-accent/20 blur-[60px] transform scale-75"></div>
                <img
                  src={coverImage}
                  alt="Destrave Method Cover"
                  className="relative z-10 h-auto w-full object-contain drop-shadow-[0_30px_50px_rgba(0,0,0,0.5)] transform transition-transform duration-700 hover:scale-105 hover:rotate-2"
                />
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Additional Content / Slider Section (Card com valor do curso) */}
      <div className="mt-16 px-4 sm:px-6 md:mt-32 md:px-8">
        <div className="mx-auto max-w-5xl">
           <HeroSlider slides={sliderSlides} />
        </div>
      </div>

      {/* Diagnosis Quiz Section - Agora abaixo do card de preço */}
      <div id="diagnosis" className="mt-20 px-4 pb-12 sm:px-6 md:mt-32 md:px-8 md:pb-24 lg:mt-48">
        <div className="text-center mb-12 md:mb-20">
           <h2 className="text-2xl font-black text-zinc-900 sm:text-4xl md:text-6xl">Faça seu Diagnóstico</h2>
           <p className="mt-4 text-base text-slate-500 font-medium sm:text-lg md:mt-6">Identifique os padrões subconscientes que estão travando sua prosperidade.</p>
           
           <div className="mt-10 flex flex-col items-center justify-center gap-4 md:mt-16 md:flex-row md:gap-8">
              <button 
                onClick={() => {
                  window.scrollTo(0, 0);
                  onStartQuiz();
                }}
                className="group relative inline-flex items-center justify-center rounded-full bg-gold-gradient px-10 py-5 text-lg font-black uppercase tracking-widest text-brand-dark shadow-gold-glow transition-all duration-300 hover:scale-105 hover:brightness-110 active:scale-95 sm:px-16 sm:py-6 sm:text-xl animate-pulse-slow"
              >
                <span className="relative z-10">Iniciar Diagnóstico Grátis</span>
              </button>

              <a 
                href={checkoutUrl}
                target="_blank"
                rel="noreferrer"
                className="group relative inline-flex items-center justify-center rounded-full border-2 border-brand-primary bg-white px-10 py-5 text-lg font-black uppercase tracking-widest text-brand-primary transition-all duration-300 hover:bg-brand-primary hover:text-white active:scale-95 sm:px-16 sm:py-6 sm:text-xl"
              >
                <span className="relative z-10">Comprar Curso Agora</span>
              </a>
           </div>
           <p className="mt-6 text-sm font-bold uppercase tracking-tighter text-brand-primary opacity-70">
              Leva apenas 2 minutos • 100% Privado
           </p>
        </div>
      </div>
    </section>
  )
}
