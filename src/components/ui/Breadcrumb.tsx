interface BreadcrumbItem {
  label: string
  href?: string
  current?: boolean
  onClick?: () => void
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
}

function BreadcrumbIcon() {
  return (
    <svg width="21" height="21" viewBox="0 0 21 21" fill="none" aria-hidden="true">
      <path fillRule="evenodd" clipRule="evenodd" d="M1.70312 5.65366C1.70312 3.47238 3.4714 1.7041 5.65268 1.7041C7.83396 1.7041 9.60224 3.47238 9.60224 5.65366C9.60224 7.83494 7.83396 9.60321 5.65268 9.60321C3.4714 9.60321 1.70312 7.83494 1.70312 5.65366Z" fill="#B3B3B3"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M10.8495 14.8C10.8495 12.6187 12.6177 10.8504 14.799 10.8504C16.9803 10.8504 18.7486 12.6187 18.7486 14.8C18.7486 16.9813 16.9803 18.7496 14.799 18.7496C12.6177 18.7496 10.8495 16.9813 10.8495 14.8Z" fill="#B3B3B3"/>
      <path d="M1.70312 14.9143C1.70312 13.1064 1.70312 12.2024 2.26478 11.6408C2.82644 11.0791 3.73041 11.0791 5.53835 11.0791C7.3463 11.0791 8.25027 11.0791 8.81192 11.6408C9.37358 12.2024 9.37358 13.1064 9.37358 14.9143C9.37358 16.7223 9.37358 17.6262 8.81192 18.1879C8.25027 18.7496 7.3463 18.7496 5.53835 18.7496C3.73041 18.7496 2.82644 18.7496 2.26478 18.1879C1.70312 17.6262 1.70312 16.7223 1.70312 14.9143Z" fill="#B3B3B3"/>
      <path d="M11.0781 5.53933C11.0781 3.73139 11.0781 2.82741 11.6398 2.26576C12.2014 1.7041 13.1054 1.7041 14.9134 1.7041C16.7213 1.7041 17.6253 1.7041 18.1869 2.26576C18.7486 2.82741 18.7486 3.73139 18.7486 5.53933C18.7486 7.34727 18.7486 8.25124 18.1869 8.8129C17.6253 9.37456 16.7213 9.37456 14.9134 9.37456C13.1054 9.37456 12.2014 9.37456 11.6398 8.8129C11.0781 8.25124 11.0781 7.34727 11.0781 5.53933Z" fill="#B3B3B3"/>
    </svg>
  )
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex items-center gap-4 text-[#B3B3B3] text-[1rem]">
        <li><BreadcrumbIcon /></li>
        {items.map((item, i) => (
          <li key={i} className="flex items-center gap-4">
            {i > 0 && <span>/</span>}
            {item.current ? (
              <span className="text-gfx-neutral-400" aria-current="page">{item.label}</span>
            ) : item.onClick ? (
              <button type="button" onClick={item.onClick} className="hover:text-white transition-colors cursor-pointer">{item.label}</button>
            ) : (
              <a href={item.href || '#'} className="hover:text-white transition-colors">{item.label}</a>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}
