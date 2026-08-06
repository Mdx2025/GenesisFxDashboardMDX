import { SparkleButton } from './SparkleButton'

interface EBookCardProps {
  category: 'Crypto' | 'Forex' | 'Stocks'
  image: string
  readTime: string
  onClick?: () => void
}

const CATEGORY_STYLES = {
  Crypto: {
    surface: 'bg-[#000720]',
    media: 'h-[61.653%]',
    mediaOpacity: '',
    image: 'inset-0 h-full w-full',
    shade: 'bg-[linear-gradient(179.9058deg,rgba(0,0,0,0)_0.11285%,#000_81.43%)]',
    seamBlend: 'from-[#000720]',
  },
  Forex: {
    surface: 'bg-[linear-gradient(179.8885deg,#001c13_0%,#001f14_42.492%)]',
    media: 'h-[60.661%]',
    mediaOpacity: '',
    image: '-top-[3.82%] left-0 h-[103.82%] w-full',
    shade: 'bg-gradient-to-b from-transparent from-[19.482%] to-black',
    seamBlend: 'from-[#001f14]',
  },
  Stocks: {
    surface: 'bg-[#001810]',
    media: 'h-[70.248%]',
    mediaOpacity: 'opacity-50',
    image: 'inset-0 h-full w-full',
    shade: 'bg-[linear-gradient(179.9255deg,rgba(0,0,0,0)_0%,#000_90.407%)]',
    seamBlend: 'from-[#001810]',
  },
} as const

function ClockIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0">
      <path d="M15.2329 7.61647C15.2329 11.8229 11.8229 15.2329 7.61647 15.2329C3.41001 15.2329 0 11.8229 0 7.61647C0 3.41001 3.41001 0 7.61647 0C11.8229 0 15.2329 3.41001 15.2329 7.61647Z" fill="#404040"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M7.61647 3.99865C7.93195 3.99865 8.1877 4.2544 8.1877 4.56988V7.37985C8.1877 7.37985 9.70143 8.89358 9.92451 9.11666C10.1476 9.33974 10.1476 9.70143 9.92451 9.92451C9.70143 10.1476 9.33974 10.1476 9.11666 9.92451L7.21254 8.02039C7.10542 7.91327 7.04523 7.76797 7.04523 7.61647V4.56988C7.04523 4.2544 7.30098 3.99865 7.61647 3.99865Z" fill="black"/>
    </svg>
  )
}

export function EBookCard({ category, image, readTime, onClick }: EBookCardProps) {
  const categoryStyle = CATEGORY_STYLES[category]

  return (
    <article
      className={`group relative aspect-[376/443] overflow-hidden rounded-[21.99px] ${categoryStyle.surface} cursor-pointer transition-transform duration-300 ease-out hover:-translate-y-1 focus-within:ring-2 focus-within:ring-gfx-green-500 motion-reduce:transition-none motion-reduce:hover:translate-y-0`}
      onClick={onClick}
      data-ebook-card
      data-ebook-category={category}
    >
      <div
        className={`absolute inset-x-0 bottom-0 overflow-hidden rounded-b-[21.99px] ${categoryStyle.media} ${categoryStyle.mediaOpacity}`}
        data-ebook-media
      >
        <img
          src={image}
          alt={`${category} ebook cover`}
          className={`absolute max-w-none ${categoryStyle.image}`}
          loading="lazy"
        />
        <div className={`pointer-events-none absolute inset-0 ${categoryStyle.shade}`} aria-hidden="true" data-ebook-media-shade />
        {/* Browser color blending needs a short crossfade to reproduce Figma's seamless surface-to-media transition. */}
        <div
          className={`pointer-events-none absolute inset-x-0 top-0 h-[14%] bg-gradient-to-b to-transparent ${categoryStyle.seamBlend}`}
          aria-hidden="true"
          data-ebook-seam-blend
        />
      </div>

      <div className="pointer-events-none absolute inset-0 bg-[#10bc83] mix-blend-color" aria-hidden="true" />

      <h3 className="absolute inset-x-5 top-[16.36%] text-center font-acid text-[2.749rem] font-normal leading-none text-white">
        {category}
      </h3>

      <div className="absolute bottom-[4.38%] left-[5.32%] right-[5.45%] flex items-end justify-between">
        <SparkleButton className="!h-[46px] !w-[142px] !rounded-[30px] !px-[38px] [&>span]:!font-medium [&>span]:whitespace-nowrap">
          Read more<span className="sr-only"> about {category}</span>
        </SparkleButton>

        <div className="mb-2 flex items-center gap-1.5">
          <ClockIcon />
          <span className="whitespace-nowrap font-acid text-[13.19px] font-normal leading-none text-gfx-neutral-400">{readTime}</span>
        </div>
      </div>
    </article>
  )
}
