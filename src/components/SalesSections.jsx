import { TestimonialSlider } from './TestimonialSlider'
import {
  FiCheckCircle,
  FiClipboard,
  FiClock,
  FiCompass,
  FiFileText,
  FiHelpCircle,
  FiList,
  FiMail,
  FiSmartphone,
  FiTrendingUp,
  FiVideo
} from 'react-icons/fi'

const iconMap = {
  check: FiCheckCircle,
  list: FiList,
  clipboard: FiClipboard,
  compass: FiCompass,
  file: FiFileText,
  video: FiVideo,
  chart: FiTrendingUp,
  shield: FiHelpCircle,
  clock: FiClock,
  device: FiSmartphone,
  mail: FiMail
}

const Section = ({ id, title, eyebrow, children }) => (
  <section id={id} className="rounded-2xl border border-slate-200 bg-white/80 backdrop-blur-md p-6 shadow-sm sm:p-8 md:rounded-3xl md:p-10 lg:p-12">
    {eyebrow ? (
  <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-brand-primary md:text-xs">{eyebrow}</p>
    ) : null}
  <h2 className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl md:text-5xl">{title}</h2>
    <div className="mt-8 space-y-6 text-base text-slate-600 sm:text-lg md:text-xl leading-relaxed">{children}</div>
  </section>
)

const BulletList = ({ items }) => (
  <ul className="grid gap-4 sm:grid-cols-2 lg:gap-6">
    {items.map((item, index) => {
      const normalized = typeof item === 'string' ? { text: item } : item
      const Icon = iconMap[normalized.icon ?? 'check'] ?? FiCheckCircle
      return (
        <li key={index} className="flex items-start gap-3 rounded-xl border border-slate-50 bg-slate-50/50 p-4 transition-colors hover:bg-slate-50">
          <Icon className="mt-1 shrink-0 text-brand-primary" />
          <span className="text-slate-700 leading-tight md:leading-normal">{normalized.text}</span>
        </li>
      )
    })}
  </ul>
)

const FeatureGrid = ({ items }) => (
  <div className="grid gap-4 sm:grid-cols-2 lg:gap-6">
    {items.map((item) => {
      const Icon = iconMap[item.icon ?? 'check'] ?? FiCheckCircle
      return (
        <div key={item.title} className="flex flex-col rounded-2xl border border-slate-100 bg-slate-50 p-5 md:p-6 lg:p-8">
          <div className="flex items-center gap-3 text-brand-primary">
            <Icon className="text-lg md:text-xl" />
            <h3 className="text-base font-bold text-slate-900 sm:text-lg md:text-xl">{item.title}</h3>
          </div>
          <p className="mt-3 text-xs text-slate-600 sm:text-sm md:text-base">{item.description}</p>
        </div>
      )
    })}
  </div>
)

const FAQList = ({ items }) => (
  <div className="space-y-3">
    {items.map((item, index) => (
      <details key={index} className="group rounded-2xl border border-slate-200 bg-white/80 backdrop-blur-sm p-5 transition-all duration-200 hover:border-brand-primary">
        <summary className="flex cursor-pointer items-center justify-between text-left text-base font-bold text-slate-900 list-none sm:text-lg">
          {item.question}
          <span className="text-brand-primary transition-transform duration-300 group-open:rotate-45 font-black text-xl">+</span>
        </summary>
        <div className="mt-4 border-t border-slate-50 pt-4 text-sm font-medium leading-relaxed text-slate-600 sm:text-base">
          {item.answer}
        </div>
      </details>
    ))}
  </div>
)

const CtaCard = ({ id, title, text, buttonLabel, buttonHref = '#checkout', note }) => (
  <section id={id} className="rounded-[2.5rem] border border-brand-accent/30 bg-premium-gradient p-8 text-center shadow-luxury text-white sm:p-12 md:p-16 lg:p-20 relative overflow-hidden">
    <div className="absolute top-0 right-0 -mr-16 -mt-16 h-64 w-64 rounded-full bg-brand-secondary/30 blur-3xl mix-blend-screen pointer-events-none" />
    <h2 className="relative z-10 text-3xl font-black sm:text-4xl md:text-5xl lg:text-6xl drop-shadow-md">{title}</h2>
    <p className="relative z-10 mt-6 text-lg font-medium opacity-95 sm:text-xl md:text-2xl">{text}</p>
    <a
      href={buttonHref}
      target="_blank"
      rel="noreferrer"
      className="relative z-10 mt-10 inline-flex items-center justify-center rounded-full bg-gold-gradient px-8 py-4 text-base font-black uppercase tracking-wider text-brand-dark shadow-gold-glow transition-all duration-300 hover:scale-105 hover:brightness-110 sm:px-10 sm:py-5 md:px-12 md:py-6 md:text-lg animate-pulse-slow"
    >
      {buttonLabel}
    </a>
    {note ? <p className="relative z-10 mt-6 text-[11px] font-bold uppercase tracking-widest text-white/80 sm:text-xs">{note}</p> : null}
  </section>
)

const ComparisonTable = ({ data }) => (
  <div className="grid gap-6 md:grid-cols-2">
    <div className="rounded-3xl border border-slate-200 bg-white p-8 opacity-60">
      <h3 className="text-xl font-bold text-slate-400 uppercase tracking-widest mb-6">{data.left.title}</h3>
      <ul className="space-y-4">
        {data.left.items.map((item, i) => (
          <li key={i} className="flex items-center gap-3 text-slate-500 line-through decoration-slate-300">
            <span className="h-1.5 w-1.5 rounded-full bg-slate-300 shrink-0" />
            {item}
          </li>
        ))}
      </ul>
    </div>
    <div className="rounded-3xl border-2 border-brand-accent bg-brand-primary/5 p-8 shadow-luxury relative overflow-hidden">
      <div className="absolute top-0 right-0 bg-brand-accent text-brand-dark text-[10px] font-black px-4 py-1 rounded-bl-xl uppercase tracking-widest">Recomendado</div>
      <h3 className="text-xl font-black text-brand-primary uppercase tracking-widest mb-6">{data.right.title}</h3>
      <ul className="space-y-4">
        {data.right.items.map((item, i) => (
          <li key={i} className="flex items-center gap-3 text-brand-dark font-bold">
            <FiCheckCircle className="text-brand-accent shrink-0" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  </div>
)

export function SalesSections({ sales }) {
  if (!sales) return null
  const {
    templates,
    problem,
    solution,
    product,
    benefits,
    comparison,
    differentiators,
    primaryCta,
    testimonials,
    visualTips,
    authority,
    secondaryCta,
    faq,
    guarantee,
    bonuses,
    urgency,
    finalCta,
    compatibility,
    support
  } = sales

  return (
    <div id="details" className="mx-auto max-w-5xl space-y-12 px-4 sm:px-6 md:space-y-24 md:px-8">
      {templates ? (
        <section className="rounded-[2.5rem] border border-brand-primary/20 bg-gradient-to-br from-brand-primary via-brand-secondary to-brand-dark p-8 text-center shadow-2xl text-white sm:p-12 md:p-16 lg:p-20">
          <h2 className="text-2xl font-bold sm:text-3xl md:text-5xl lg:text-6xl">{templates.title}</h2>
          <p className="mt-4 text-base opacity-90 sm:text-lg md:text-xl lg:text-2xl">{templates.text}</p>
          <a
            href={templates.buttonHref}
            target="_blank"
            rel="noreferrer"
            className="mt-8 inline-flex items-center justify-center rounded-full bg-white px-8 py-4 text-sm font-black uppercase text-brand-primary shadow-md transition-all duration-300 hover:scale-105 hover:bg-zinc-50 sm:px-10 sm:py-5 md:px-12 md:py-6 md:text-base"
          >
            {templates.buttonLabel}
          </a>
        </section>
      ) : null}

      {problem ? (
        <Section id="problem" title={problem.title}>
          <BulletList items={problem.bullets} />
        </Section>
      ) : null}

      {solution ? (
        <Section id="solution" title={solution.title}>
          {solution.paragraphs.map((text, index) => (
            <p key={index}>{text}</p>
          ))}
        </Section>
      ) : null}

      {comparison ? (
        <Section title={comparison.title} id="comparison" eyebrow="🚀 A Diferença Real">
          <ComparisonTable data={comparison} />
        </Section>
      ) : null}

      {product ? (
        <Section id="produto" title={product.title}>
          <FeatureGrid items={product.items} />
          {product.note ? <p className="text-sm font-bold text-brand-primary text-center mt-6">{product.note}</p> : null}
        </Section>
      ) : null}

      {benefits ? (
        <Section id="beneficios" title={benefits.title}>
          <BulletList items={benefits.bullets} />
        </Section>
      ) : null}

      {differentiators ? (
        <Section id="diferenciais" title={diferenciais.title}>
          <BulletList items={differentiators.bullets} />
        </Section>
      ) : null}

      {primaryCta ? (
        <CtaCard
          id={primaryCta.id}
          title={primaryCta.title}
          text={primaryCta.text}
          buttonLabel={primaryCta.buttonLabel}
          buttonHref={primaryCta.buttonHref}
          note={primaryCta.note}
        />
      ) : null}

      {testimonials ? (
        <Section id="prova-social" title={testimonials.title}>
          <TestimonialSlider testimonials={testimonials} />
        </Section>
      ) : null}

      {visualTips ? (
        <Section id="visual" title={visualTips.title}>
          <BulletList items={visualTips.bullets} />
        </Section>
      ) : null}

      {authority ? (
        <Section id="autoria" title={authority.title}>
          {authority.paragraphs.map((text, index) => (
            <p key={index}>{text}</p>
          ))}
        </Section>
      ) : null}

      {secondaryCta ? (
        <CtaCard
          id={secondaryCta.id}
          title={secondaryCta.title}
          text={secondaryCta.text}
          buttonLabel={secondaryCta.buttonLabel}
          buttonHref={secondaryCta.buttonHref}
          note={secondaryCta.note}
        />
      ) : null}

      {faq ? (
        <Section id={faq.id} title={faq.title}>
          <FAQList items={faq.items} />
        </Section>
      ) : null}

      {guarantee ? (
        <section id="garantia" className="relative overflow-hidden rounded-[2.5rem] border-2 border-brand-accent/50 bg-white p-8 shadow-luxury sm:p-12 md:p-16">
          <div className="absolute -right-12 -top-12 h-64 w-64 rounded-full bg-brand-primary/5 blur-3xl" />
          <div className="relative flex flex-col items-center gap-8 text-center md:flex-row md:text-left">
            <div className="flex h-32 w-32 shrink-0 items-center justify-center rounded-full bg-gold-gradient shadow-gold-glow md:h-40 md:w-40">
               <FiHelpCircle className="h-16 w-16 text-brand-dark md:h-20 md:w-20" />
            </div>
            <div>
              <h2 className="text-2xl font-black text-slate-900 sm:text-3xl md:text-4xl">{guarantee.title}</h2>
              <p className="mt-4 text-base font-medium leading-relaxed text-slate-700 sm:text-lg md:text-xl">{guarantee.text}</p>
            </div>
          </div>
        </section>
      ) : null}

      {bonuses ? (
        <Section id="bonus" title={bonuses.title} eyebrow="✨ Presentes Exclusivos">
          <div className="grid gap-4">
            {bonuses.bullets.map((item, index) => {
              const Icon = iconMap[item.icon ?? 'check'] ?? FiCheckCircle
              return (
                <div key={index} className="flex items-center gap-4 rounded-2xl border-2 border-dashed border-brand-primary/30 bg-brand-primary/5 p-6 transition-all hover:bg-brand-primary/10">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand-primary text-white">
                    <Icon className="h-6 w-6" />
                  </div>
                  <span className="text-base font-bold text-slate-800 sm:text-lg md:text-xl">{item.text}</span>
                </div>
              )
            })}
          </div>
        </Section>
      ) : null}

      {urgency ? (
        <Section id="urgencia" title={urgency.title}>
          <p>{urgency.text}</p>
        </Section>
      ) : null}

      {finalCta ? (
        <CtaCard
          id={finalCta.id}
          title={finalCta.title}
          text={finalCta.text}
          buttonLabel={finalCta.buttonLabel}
          buttonHref={finalCta.buttonHref}
          note={finalCta.note}
        />
      ) : null}

      {compatibility ? (
        <Section id="compatibilidade" title={compatibility.title}>
          <BulletList items={compatibility.bullets} />
        </Section>
      ) : null}

      {support ? (
        <Section id="suporte" title={support.title}>
          <p>
            {support.description}{' '}
            {support.email ? (
              <a href={`mailto:${support.email}`} className="text-brand-primary underline">
                {support.email}
              </a>
            ) : null}
          </p>
          {support.responseTime ? <p className="text-sm text-slate-400">{support.responseTime}</p> : null}
        </Section>
      ) : null}
    </div>
  )
}
