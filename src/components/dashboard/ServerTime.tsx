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
    <div className="flex flex-col gap-2 relative bg-[#09241C] rounded-lg border-1 border-[#064B34] p-5">
      <div className="flex items-center justify-between gap-2">
        <span className="text-[#A0A0A0] text-xs xl:text-sm leading-tight">Server Time</span>
        <div className="flex items-center gap-1 shrink-0">
          <svg width="10" height="10" viewBox="0 0 12 12" fill="none" aria-hidden="true">
            <circle cx="6" cy="6" r="3" fill="#10BC83" />
            <circle cx="6" cy="6" r="5" stroke="#10BC83" strokeWidth="0.5" opacity="0.3" />
          </svg>
          <span className="text-gfx-green-500 text-[10px] xl:text-sm leading-tight">Markets Open</span>
        </div>
      </div>
      <div className="flex flex-row items-center gap-6">
        <span className="text-white text-lg xl:text-xl 2xl:text-2xl leading-none tabular-nums">{time}</span>
        <span className="text-[#A0A0A0] text-xs">UTC-3</span>
      </div>
    </div>
  )
}
