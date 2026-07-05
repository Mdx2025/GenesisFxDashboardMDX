import { useState, useEffect } from 'react'

export function ServerTime() {
  const [time, setTime] = useState('')

  useEffect(() => {
    function update() {
      const now = new Date()
      const h = ((now.getUTCHours() - 3) + 24) % 24
      const m = now.getUTCMinutes().toString().padStart(2, '0')
      const s = now.getUTCSeconds().toString().padStart(2, '0')
      const ampm = h >= 12 ? 'PM' : 'AM'
      const h12 = h % 12 || 12
      setTime(`${h12}:${m}:${s} ${ampm}`)
    }
    update()
    const id = setInterval(update, 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="mt-2 2xl:mt-3 relative bg-gfx-green-50 rounded-lg outline outline-[1.25px] outline-offset-[-1.25px] outline-teal-500/10 px-[18px] py-3 2xl:py-5">
      <div className="flex items-center justify-between mb-2 2xl:mb-3">
        <span className="text-gfx-neutral-300 text-sm">Server Time</span>
        <div className="flex items-center gap-1.5">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
            <circle cx="6" cy="6" r="3" fill="#10BC83" />
            <circle cx="6" cy="6" r="5" stroke="#10BC83" strokeWidth="0.5" opacity="0.3" />
          </svg>
          <span className="text-gfx-green-500 text-xs">Markets Open</span>
        </div>
      </div>
      <div className="flex items-baseline gap-2">
        <span className="text-white text-2xl">{time}</span>
        <span className="text-white/30 text-xs">UTC-3</span>
      </div>
    </div>
  )
}
