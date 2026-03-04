import { useEffect, useMemo, useState } from 'react'
import { Header } from './components/Header'
import { TopBanner } from './components/TopBanner'
import { BottomNav } from './components/BottomNav'
import { HomeScreen } from './screens/Home'
import { SalesSections } from './components/SalesSections'
import { Footer } from './components/Footer'
import { ContactScreen } from './screens/Contact'
import { baseContent, languages } from './data/content'
import { useAutoTranslate } from './hooks/useAutoTranslate'
import { FloatingActions } from './components/FloatingActions'

const getInitialLang = () => {
  if (typeof navigator === 'undefined') return 'pt';
  const browserLang = (navigator.language || 'pt').toLowerCase();
  // Find the most specific match first
  const exactMatch = languages.find(l => browserLang === l.code.toLowerCase());
  if (exactMatch) return exactMatch.code;
  // Then check for partial matches (e.g., 'en-US' should match 'en')
  const partialMatch = languages.find(l => browserLang.startsWith(l.code.toLowerCase()));
  if (partialMatch) return partialMatch.code;
  // Default to Portuguese
  return 'pt';
};

const readStorage = (key, fallback) => {
  try {
    const stored = localStorage.getItem(key)
    return stored ? JSON.parse(stored) : fallback
  } catch {
    return fallback
  }
}

const writeStorage = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // ignore storage failures (Safari private mode, etc.)
  }
}

export default function App() {
  const [language, setLanguage] = useState(() => readStorage('language', getInitialLang()))
  const [showBanner, setShowBanner] = useState(() => readStorage('showBanner', true))
  const { content, loading } = useAutoTranslate(baseContent, language)

  useEffect(() => {
    document.documentElement.lang = language
    writeStorage('language', language)
  }, [language])

  const handleDismissBanner = () => {
    setShowBanner(false)
    writeStorage('showBanner', false)
  }

  const navLabels = useMemo(() => content.nav, [content])

  return (
    <div className="min-h-screen bg-white text-zinc-950">
      <div className="sticky top-0 z-50">
        {showBanner && content.limitedOffer && (
          <TopBanner offer={content.limitedOffer} onDismiss={handleDismissBanner} />
        )}
        <Header
          labels={navLabels}
          languages={languages}
          currentLanguage={language}
          loading={loading}
          onSelectLanguage={setLanguage}
        />
      </div>

      <main className="space-y-8 md:space-y-16">
        <HomeScreen
          slides={content.hero.slides}
          ctaLink={content.hero.ctaLink}
          loading={loading}
          offer={content.limitedOffer}
        />
        <div className="space-y-12 md:space-y-24">
          <SalesSections sales={content.sales} />
          <ContactScreen contact={content.contact} />
        </div>
      </main>

      <Footer footer={content.footer} />
      <BottomNav />
      <FloatingActions />
    </div>
  )
}
