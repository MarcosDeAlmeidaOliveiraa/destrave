import { useEffect, useState } from 'react'
import { FiHelpCircle, FiHome, FiGlobe } from 'react-icons/fi'

const navItems = [
  { href: '#home', icon: FiHome },
  { href: '#details', icon: FiGlobe },
  { href: '#faq', icon: FiHelpCircle }
]

export function BottomNav() {
  const [active, setActive] = useState('#home')

  useEffect(() => {
    const handler = () => {
      const sections = navItems.map((item) => document.querySelector(item.href))
      const scrollY = window.scrollY + 120
      const current = sections.findIndex((section) => {
        if (!section) return false
        return scrollY >= section.offsetTop && scrollY < section.offsetTop + section.offsetHeight
      })
      if (current >= 0) setActive(navItems[current].href)
    }
    handler()
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 flex items-center justify-around border-t border-slate-200 bg-white/90 backdrop-blur py-3 text-slate-400 md:hidden">
      {navItems.map(({ href, icon: Icon }) => (
  <a key={href} href={href} className={`flex flex-1 flex-col items-center text-sm transition ${active === href ? 'text-brand-primary' : 'text-slate-400 hover:text-brand-primary'}`}>
          <Icon className="text-xl" />
        </a>
      ))}
    </nav>
  )
}
