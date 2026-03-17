import { useState } from 'react'
import { FiHelpCircle, FiHome, FiGlobe, FiChevronDown } from 'react-icons/fi'
import ReactCountryFlag from 'react-country-flag'

const navItems = [
  { href: '#home', icon: FiHome, labelKey: 'home' },
  { href: '#details', icon: FiGlobe, labelKey: 'details' },
  { href: '#faq', icon: FiHelpCircle, labelKey: 'faq' }
]

export function Header({ labels, languages, currentLanguage, onSelectLanguage, loading }) {
  const [isLangOpen, setIsLangOpen] = useState(false)
  const currentLangObj = languages?.find(l => l.code === currentLanguage)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-brand-dark/95 backdrop-blur-xl shadow-luxury">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 text-sm sm:px-8 sm:py-5 sm:text-base">
        <div className="flex items-center">
          <span className="text-2xl font-black tracking-tighter text-white sm:text-3xl uppercase drop-shadow-md">
            Destrave
          </span>
        </div>
        
        <div className="flex items-center gap-4 md:gap-8">
          <nav className="hidden items-center gap-6 md:flex">
            {navItems.map(({ href, icon: Icon, labelKey }) => (
              <a key={href} href={href} className="flex items-center gap-2 text-white/80 hover:text-brand-accent transition font-medium text-sm">
                <Icon className="text-lg" />
                <span>{labels?.[labelKey]}</span>
              </a>
            ))}
          </nav>

          <a 
            href="https://danielaferrenhamove.com.br/finalizar.php"
            target="_blank"
            rel="noreferrer"
            className="hidden sm:inline-flex items-center justify-center rounded-full bg-gold-gradient px-6 py-2.5 text-[12px] font-black uppercase tracking-wider text-brand-dark shadow-gold-glow transition-all hover:scale-105 md:px-8 md:py-3 md:text-sm"
          >
            Comprar
          </a>

          {/* Language Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsLangOpen(!isLangOpen)}
              className={`flex items-center gap-2 rounded-full border px-3 py-1.5 transition-all duration-200 focus:outline-none ${
                isLangOpen 
                  ? 'border-brand-accent bg-brand-accent/10 text-brand-accent' 
                  : 'border-white/20 bg-white/5 text-white hover:border-white/40 hover:bg-white/10'
              }`}
            >
              {currentLangObj && (
                <ReactCountryFlag svg countryCode={currentLangObj.flag} className="text-lg" />
              )}
              <FiChevronDown className={`transition-transform duration-300 ${isLangOpen ? 'rotate-180' : ''}`} />
            </button>

            {isLangOpen && (
              <>
                <div 
                  className="fixed inset-0 z-10" 
                  onClick={() => setIsLangOpen(false)}
                ></div>
                <div className="absolute right-0 mt-2 z-20 w-48 rounded-2xl border border-slate-100 bg-white p-2 shadow-2xl animate-in fade-in zoom-in duration-200">
                  {languages?.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        onSelectLanguage(lang.code)
                        setIsLangOpen(false)
                      }}
                      className={`flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-sm font-medium transition-all duration-200 ${
                        currentLanguage === lang.code 
                          ? 'bg-brand-primary text-white shadow-md' 
                          : 'text-slate-600 hover:bg-blue-50 hover:text-brand-primary'
                      }`}
                    >
                      <ReactCountryFlag svg countryCode={lang.flag} />
                      <span>{lang.label}</span>
                    </button>
                  ))}
                  {loading && (
                    <div className="mt-1 px-3 py-1 text-[10px] text-slate-400 animate-pulse text-center">
                      Traduzindo...
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
