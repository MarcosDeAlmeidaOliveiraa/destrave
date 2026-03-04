import ReactCountryFlag from 'react-country-flag'

export function LanguageButtons({ languages, active, onSelect, loading }) {
  return (
    <div className="relative w-full">
      <div className="flex snap-x snap-mandatory gap-2 overflow-x-auto px-4 py-2 scrollbar-hide">
        {languages.map(({ code, flag, label }) => (
          <button
            key={code}
            type="button"
            onClick={() => onSelect(code)}
            className={`flex-shrink-0 snap-center flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-bold transition shadow-sm ${
              active === code ? 'bg-brand-primary border-brand-primary text-white shadow-md' : 'border-slate-200 bg-white text-slate-600 hover:border-brand-primary hover:text-brand-primary'
            }`}
          >
            <ReactCountryFlag svg countryCode={flag} className="text-base" />
            <span className="tracking-wide">{label}</span>
          </button>
        ))}
        {loading && (
          <span className="flex-shrink-0 snap-center flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs text-slate-300">
            <span className="h-2 w-2 animate-ping rounded-full bg-accent" />
            Translating...
          </span>
        )}
      </div>
    </div>
  );
}
