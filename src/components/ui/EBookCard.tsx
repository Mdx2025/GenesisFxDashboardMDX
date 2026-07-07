import { SparkleButton } from './SparkleButton'

interface EBookCardProps {
  category: string
  image: string
  readTime: string
  onClick?: () => void
}

function ClockIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 19 19" fill="none" className="shrink-0">
      <path d="M18.2899 9.14495C18.2899 14.1956 14.1956 18.2899 9.14495 18.2899C4.09433 18.2899 0 14.1956 0 9.14495C0 4.09433 4.09433 0 9.14495 0C14.1956 0 18.2899 4.09433 18.2899 9.14495Z" fill="#021B13" />
      <path fillRule="evenodd" clipRule="evenodd" d="M9.14495 4.8011C9.52374 4.8011 9.83082 5.10817 9.83082 5.48697V8.86085L11.9162 10.9462C12.184 11.2141 12.184 11.6483 11.9162 11.9162C11.6483 12.184 11.2141 12.184 10.9462 11.9162L8.65996 9.62993C8.53134 9.50131 8.45908 9.32685 8.45908 9.14495V5.48697C8.45908 5.10817 8.76615 4.8011 9.14495 4.8011Z" fill="#808080" />
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
        <div className="absolute inset-0 bg-[#10BC83] mix-blend-color" />
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
            <span className="text-[#808080] text-[13px] font-normal">{readTime}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
