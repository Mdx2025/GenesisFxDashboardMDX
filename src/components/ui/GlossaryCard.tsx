interface GlossaryCardProps {
  term: string
  definition: string
}

export function GlossaryCard({ term, definition }: GlossaryCardProps) {
  return (
    <div
      className="rounded-[26px] backdrop-blur-[56px] border border-[rgba(0,66,44,0.5)] px-[37px] py-[48px]"
      style={{ background: 'radial-gradient(ellipse at 65.7% 3%, #08110e 19.2%, #050a09 72.6%)' }}
    >
      <h3 className="text-white text-[1rem] font-normal leading-[24.44px]">{term}</h3>
      <p className="text-[#808080] text-[0.875rem] font-normal leading-[18.8px] mt-[11px] max-w-[430px]">{definition}</p>
    </div>
  )
}
