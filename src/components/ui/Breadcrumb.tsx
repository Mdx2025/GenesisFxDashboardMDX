import { HomeIcon } from '@/components/icons'

interface BreadcrumbItem {
  label: string
  href?: string
  current?: boolean
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex items-center gap-4 text-body2" style={{ color: '#606060' }}>
        <li><HomeIcon size={21} color="#606060" /></li>
        {items.map((item, i) => (
          <li key={i} className="flex items-center gap-4">
            <span aria-hidden="true">/</span>
            {item.current ? (
              <span aria-current="page">{item.label}</span>
            ) : (
              <a href={item.href || '#'} className="hover:text-white transition-colors">{item.label}</a>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}
