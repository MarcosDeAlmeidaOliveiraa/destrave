import { useEffect, useState } from 'react'
import { Header } from './components/Header'
import { TopBanner } from './components/TopBanner'
import { HomeScreen } from './screens/Home'
import { QuizScreen } from './screens/Quiz'
import { CheckoutScreen } from './screens/Checkout'
import { CourseScreen } from './screens/Course'
import { SalesSections } from './components/SalesSections'
import { Footer } from './components/Footer'
import { baseContent } from './data/content'
import { FloatingActions } from './components/FloatingActions'

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
  const [showBanner, setShowBanner] = useState(() => readStorage('showBanner', true))
  const [currentScreen, setCurrentScreen] = useState('home') // 'home' | 'quiz' | 'checkout' | 'course'

  const content = baseContent

  useEffect(() => {
    if (currentScreen === 'quiz' || currentScreen === 'checkout' || currentScreen === 'course') {
      window.scrollTo(0, 0);
    }
    
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

  const handleDismissBanner = () => {
    setShowBanner(false)
    writeStorage('showBanner', false)
  }

  if (currentScreen === 'quiz') {
    return (
      <QuizScreen 
        onBack={() => setCurrentScreen('home')} 
        onComplete={() => setCurrentScreen('checkout')}
      />
    )
  }

  if (currentScreen === 'checkout') {
    return (
      <CheckoutScreen 
        content={content}
        onBack={() => setCurrentScreen('home')}
        onSuccess={() => setCurrentScreen('course')}
      />
    )
  }

  if (currentScreen === 'course') {
    return (
      <CourseScreen 
        onBack={() => setCurrentScreen('home')}
      />
    )
  }

  return (
    <div className="min-h-screen text-zinc-950">
      <div className="sticky top-0 z-50">
        {showBanner && content.limitedOffer && (
          <TopBanner offer={content.limitedOffer} onDismiss={handleDismissBanner} />
        )}
        <Header onCheckout={() => setCurrentScreen('checkout')} />
      </div>

      <main className="space-y-16 md:space-y-32">
        <HomeScreen
          slides={content.hero.slides}
          onStartQuiz={() => setCurrentScreen('quiz')}
          onCheckout={() => setCurrentScreen('checkout')}
        />
        <div className="space-y-20 md:space-y-40 pb-20">
          <SalesSections sales={content.sales} onCheckout={() => setCurrentScreen('checkout')} />
        </div>
      </main>

      <Footer footer={content.footer} />
      <FloatingActions onCheckout={() => setCurrentScreen('checkout')} />
    </div>
  )
}
