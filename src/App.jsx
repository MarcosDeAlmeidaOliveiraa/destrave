import { useEffect, useMemo, useState } from 'react'
import { Header } from './components/Header'
import { TopBanner } from './components/TopBanner'
import { BottomNav } from './components/BottomNav'
import { HomeScreen } from './screens/Home'
import { QuizScreen } from './screens/Quiz'
import { SalesSections } from './components/SalesSections'
import { Footer } from './components/Footer'
import { ContactScreen } from './screens/Contact'
import { baseContent, languages } from './data/content'
import { FloatingActions } from './components/FloatingActions'
import { useAutoTranslate } from './hooks/useAutoTranslate'

const getInitialLang = () => {
  if (typeof navigator === 'undefined') return 'pt';
  const browserLang = (navigator.language || 'pt').toLowerCase();
  const exactMatch = languages.find(l => browserLang === l.code.toLowerCase());
  if (exactMatch) return exactMatch.code;
  const partialMatch = languages.find(l => browserLang.startsWith(l.code.toLowerCase()));
  if (partialMatch) return partialMatch.code;
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
  }
}

export default function App() {
  const [language, setLanguage] = useState(() => readStorage('language', getInitialLang()))
  const [showBanner, setShowBanner] = useState(() => readStorage('showBanner', true))
  const [currentScreen, setCurrentScreen] = useState('home') // 'home' | 'quiz'

  const { content, loading } = useAutoTranslate(baseContent, language)

  useEffect(() => {
    if (currentScreen === 'quiz') {
      document.body.style.overflow = 'hidden'
      document.body.style.position = 'fixed'
      document.body.style.width = '100%'
      document.body.style.height = '100%'
    } else {
      document.body.style.overflow = ''
      document.body.style.position = ''
      document.body.style.width = ''
      document.body.style.height = ''
    }
  }, [currentScreen])

  useEffect(() => {
    document.documentElement.lang = language
    writeStorage('language', language)
  }, [language])

  const handleDismissBanner = () => {
    setShowBanner(false)
    writeStorage('showBanner', false)
  }

  const navLabels = useMemo(() => content.nav, [content])

  if (currentScreen === 'quiz') {
    return (
      <QuizScreen 
        onBack={() => setCurrentScreen('home')} 
        checkoutUrl={content.hero.checkoutUrl}
      />
    )
  }

  return (
    <div className="min-h-screen text-zinc-950">
      <div className="sticky top-0 z-50">
        {showBanner && content.limitedOffer && (
          <TopBanner offer={content.limitedOffer} onDismiss={handleDismissBanner} />
        )}
        <Header
          labels={navLabels}
          languages={languages}
          currentLanguage={language}
          onSelectLanguage={setLanguage}
          loading={loading}
        />
      </div>

      <main className="space-y-16 md:space-y-32">
        <HomeScreen
          slides={content.hero.slides}
          ctaLink={content.hero.ctaLink}
          checkoutUrl={content.hero.checkoutUrl}
          onStartQuiz={() => setCurrentScreen('quiz')}
        />
        <div className="space-y-20 md:space-y-40">
          <SalesSections sales={content.sales} />
          <ContactScreen contact={content.contact} />
        </div>
      </main>

      <Footer footer={content.footer} />
      <FloatingActions />
    </div>
  )
}
