import './GlossaryCard.css'

interface GlossaryCardProps {
  term: string
  definition: string
}

export function GlossaryCard({ term, definition }: GlossaryCardProps) {
  return (
    <div className="glossary-card rounded-[1.625rem] px-[2.3125rem] py-[3rem]">
      <h3 className="text-white text-[1rem] font-normal leading-[1.528rem]">{term}</h3>
      <p className="text-[#808080] text-[0.875rem] font-normal leading-[1.175rem] mt-[0.6875rem] max-w-[26.875rem]">{definition}</p>
    </div>
  )
}
