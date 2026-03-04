import { useState } from 'react'
import { FiHelpCircle, FiHome, FiGlobe, FiChevronDown } from 'react-icons/fi'
import ReactCountryFlag from 'react-country-flag'
// import {} from '@heroicons/react/24/outline'

const navItems = [
  { href: '#home', icon: FiHome, labelKey: 'home' },
  { href: '#details', icon: FiGlobe, labelKey: 'details' },
  { href: '#faq', icon: FiHelpCircle, labelKey: 'faq' }
]

export function Header({ labels, languages, currentLanguage, onSelectLanguage, loading }) {
  const [isLangOpen, setIsLangOpen] = useState(false)
  const currentLangObj = languages?.find(l => l.code === currentLanguage)

  return (
    <header className="border-b border-slate-100 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 text-sm sm:px-6 sm:py-6 sm:text-base">
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-black tracking-tighter text-brand-dark sm:text-3xl lg:text-4xl">
              Mundo<span className="text-brand-primary">Online</span>World
            </span>
          </div>
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-primary sm:text-xs sm:tracking-[0.3em]">{labels?.tagline}</span>
        </div>
        
        <div className="flex items-center gap-4 md:gap-8">
          <nav className="hidden items-center gap-6 md:flex">
            {navItems.map(({ href, icon: Icon, labelKey }) => (
              <a key={href} href={href} className="flex items-center gap-2 text-slate-600 hover:text-brand-primary transition font-medium">
                <Icon className="text-lg" />
                <span>{labels?.[labelKey]}</span>
              </a>
            ))}
          </nav>

          {/* Language Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsLangOpen(!isLangOpen)}
              className={`flex items-center gap-2 rounded-full border px-3 py-1.5 transition-all duration-200 focus:outline-none ${
                isLangOpen 
                  ? 'border-brand-primary bg-blue-50 text-brand-primary' 
                  : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50'
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
                    <div className="mt-1 px-3 py-1 text-[10px] text-slate-400 animate-pulse">
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
