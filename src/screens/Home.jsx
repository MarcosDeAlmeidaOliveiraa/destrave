import { HeroSlider } from '../components/HeroSlider'
import { CountdownTimer } from '../components/CountdownTimer'
import coverImage from '../images/imagemPrincipal.png'

export function HomeScreen({ slides, ctaLink, loading, offer }) {
  const sliderSlides = slides.map((slide) => ({ ...slide, ctaLink: slide.ctaLink ?? ctaLink ?? '#courses' }))
  const primarySlide = sliderSlides[0] ?? {}
  const primaryTitle = primarySlide.title ?? 'We boost your Digital Presence with Strategy'
  const primaryDescription = primarySlide.description ?? 'We create professional websites, custom systems, traffic management and support for your company to grow digitally.'

  return (
    <section id="home" className="relative bg-white text-zinc-950">
      <div className="relative h-[85vh] min-h-[700px] max-h-[1200px] w-full overflow-hidden md:h-[80vh]">
        <img
          src={coverImage}
          alt="Main Cover"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/70 via-brand-dark/40 to-white"></div>
        <div className="absolute inset-0 flex items-center justify-center p-4 md:p-8">
          <div className="w-full max-w-5xl text-center">
            <div className="animate-in fade-in zoom-in duration-1000 mx-auto inline-block rounded-[2.5rem] border border-white/30 bg-white/10 p-6 shadow-2xl backdrop-blur-xl md:rounded-[3.5rem] md:p-20">
              <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/20 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white ring-1 ring-inset ring-white/20 md:mb-6 md:px-4 md:py-1.5 md:text-xs">
                 {primarySlide.badge ?? '✨ LEADER IN DIGITAL TRANSFORMATION'}
              </span>
              <h1 className="text-4xl font-black leading-[1.1] tracking-tight text-white sm:text-5xl md:text-7xl lg:text-8xl">
                {primarySlide.title1} <br />
                <span className="italic">
                  {primarySlide.title2}
                </span>
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-base font-medium text-white sm:text-lg md:mt-8 md:text-2xl">
                {primaryDescription}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-8 px-4 pb-12 pt-4 md:space-y-12 md:px-8 md:pb-16 md:pt-6">
        <HeroSlider slides={sliderSlides} />
      </div>
    </section>
  )
}
