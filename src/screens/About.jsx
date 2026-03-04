export function AboutScreen({ about }) {
  return (
    <section id="about" className="mx-auto mt-16 max-w-5xl px-4">
      <div className="rounded-3xl border border-white/10 bg-surface/90 p-8 shadow-lg">
  <h2 className="text-center text-3xl font-semibold text-move-green">{about.title}</h2>
        <p className="mt-4 text-center text-base text-slate-200 md:text-lg">{about.text}</p>
      </div>
    </section>
  )
}
