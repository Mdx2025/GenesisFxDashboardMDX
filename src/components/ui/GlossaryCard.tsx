import './GlossaryCard.css'

interface GlossaryCardProps {
  term: string
  definition: string
}

export function GlossaryCard({ term, definition }: GlossaryCardProps) {
  return (
    <div className="glossary-card rounded-xl px-4 py-5 sm:px-[2.3125rem] sm:py-[3rem]">
      <h3 className="text-white text-base font-normal leading-6">{term}</h3>
      <p className="text-gfx-neutral-400 text-sm font-normal leading-5 mt-[0.6875rem] max-w-[26.875rem]">{definition}</p>
    </div>
  )
}
