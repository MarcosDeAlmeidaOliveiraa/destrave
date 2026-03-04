import { useCountdown } from '../hooks/useCountdown'

export function CountdownTimer({ targetDate, labels, isCompact = false }) {
  const { days, hours, minutes, seconds, isExpired } = useCountdown(targetDate)

  if (isExpired) return null

  const items = [
    { value: days, label: labels?.days || 'Days' },
    { value: hours, label: labels?.hours || 'Hours' },
    { value: minutes, label: labels?.minutes || 'Mins' },
    { value: seconds, label: labels?.seconds || 'Secs' }
  ]

  if (isCompact) {
    return (
      <div className="flex items-center gap-2 font-mono text-sm font-bold text-white">
        {items.map((item, index) => (
          <div key={index} className="flex items-center gap-1">
            <span className="rounded bg-white/20 px-1.5 py-0.5">
              {String(item.value).padStart(2, '0')}
            </span>
            <span className="text-[10px] opacity-70">{item.label[0]}</span>
            {index < items.length - 1 && <span className="opacity-30">:</span>}
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="flex items-center justify-center gap-2 sm:gap-4">
      {items.map((item, index) => (
        <div key={index} className="flex flex-col items-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 text-xl font-black text-white backdrop-blur-md border border-white/20 sm:h-16 sm:w-16 sm:text-3xl">
            {String(item.value).padStart(2, '0')}
          </div>
          <span className="mt-1 text-[10px] font-bold uppercase tracking-widest text-white/70 sm:text-xs">
            {item.label}
          </span>
        </div>
      ))}
    </div>
  )
}
