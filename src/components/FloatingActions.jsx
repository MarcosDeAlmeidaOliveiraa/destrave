import { FiShoppingCart } from 'react-icons/fi'

export function FloatingActions({ onCheckout }) {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-4 md:bottom-8" style={{ marginBottom: 'env(safe-area-inset-bottom, 0px)' }}>
        <button
          onClick={onCheckout}
          className="flex h-16 w-16 items-center justify-center rounded-full bg-gold-gradient text-brand-dark shadow-gold-glow transition-all duration-300 hover:scale-110 hover:brightness-110 active:scale-95 animate-pulse-slow"
          aria-label="Comprar Agora"
        >
          <FiShoppingCart className="text-3xl" />
        </button>
    </div>
  )
}
