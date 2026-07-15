import { SparkleButton } from './SparkleButton'

interface EBookCardProps {
  category: string
  image: string
  readTime: string
  onClick?: () => void
}

function ClockIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0">
      <path d="M15.2329 7.61647C15.2329 11.8229 11.8229 15.2329 7.61647 15.2329C3.41001 15.2329 0 11.8229 0 7.61647C0 3.41001 3.41001 0 7.61647 0C11.8229 0 15.2329 3.41001 15.2329 7.61647Z" fill="#404040"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M7.61647 3.99865C7.93195 3.99865 8.1877 4.2544 8.1877 4.56988V7.37985C8.1877 7.37985 9.70143 8.89358 9.92451 9.11666C10.1476 9.33974 10.1476 9.70143 9.92451 9.92451C9.70143 10.1476 9.33974 10.1476 9.11666 9.92451L7.21254 8.02039C7.10542 7.91327 7.04523 7.76797 7.04523 7.61647V4.56988C7.04523 4.2544 7.30098 3.99865 7.61647 3.99865Z" fill="black"/>
    </svg>
  )
}

export function EBookCard({ category, image, readTime, onClick }: EBookCardProps) {
  return (
    <div
      className="group relative rounded-[22px] overflow-hidden cursor-pointer hover:scale-[1.02] transition-transform duration-300"
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      <div className="relative aspect-[376/443]">
        <img
          src={image}
          alt={category}
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/80" />
        <div className="absolute inset-0 bg-gfx-green-500 mix-blend-color" />
      </div>

      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/90 via-black/50 to-transparent pointer-events-none" />

      <div className="absolute inset-0 flex flex-col justify-between p-[22px]">
        <h3 className="text-white text-[clamp(1.75rem,1rem+1.5vw,2.75rem)] font-normal leading-none text-center mt-[50px]">
          {category}
        </h3>

        <div className="relative flex items-center justify-between">
          <SparkleButton>Read More</SparkleButton>

          <div className="flex items-center gap-1.5">
            <ClockIcon />
            <span className="text-gfx-neutral-400 text-[13px] font-normal">{readTime}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
