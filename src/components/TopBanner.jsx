import { FiX } from 'react-icons/fi'
import { CountdownTimer } from './CountdownTimer'

export function TopBanner({ offer, onDismiss }) {
  if (!offer) return null

  return (
    <div className="relative z-[60] bg-premium-gradient py-2 px-4 text-white shadow-xl">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-6 gap-y-2 pr-8 text-center sm:pr-0">
        <p className="text-[10px] font-black uppercase tracking-widest sm:text-xs">
          {offer.title}
        </p>
        <CountdownTimer targetDate={offer.targetDate} labels={offer.timerLabels} isCompact />
      </div>
      <button
        onClick={onDismiss}
        className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full p-1 text-white/80 transition-all hover:bg-white/20 hover:text-white"
        aria-label="Dismiss banner"
      >
        <FiX className="text-lg" />
      </button>
    </div>
  )
}
