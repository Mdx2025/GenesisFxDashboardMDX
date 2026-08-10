import type { ReactNode } from 'react'
import { SearchIcon } from '@/components/icons'

interface EmptyStateProps {
  title?: string
  description?: string
  /** Renders the 70px circular badge treatment instead of the bare search glyph. */
  icon?: ReactNode
  action?: ReactNode
  className?: string
}

export function EmptyState({
  title = 'No results found',
  description = 'Try adjusting your search or filters to find what you\'re looking for.',
  icon,
  action,
  className = '',
}: EmptyStateProps) {
  if (!icon) {
    return (
      <div className={`p-10 flex flex-col items-center text-center max-w-md mx-auto ${className}`}>
        <SearchIcon size={32} color="#606060" className="mb-4" />
        <p className="text-body1 text-white mb-1">{title}</p>
        <p className="text-caption text-gfx-neutral-500">{description}</p>
      </div>
    )
  }

  return (
    <div className={`flex flex-col items-center text-center px-6 ${className}`}>
      <div className="w-[4.375rem] h-[4.375rem] rounded-full bg-gfx-green-900 flex items-center justify-center">
        {icon}
      </div>
      <p className="mt-[2.115rem] text-2xl font-acid font-normal leading-none text-white">{title}</p>
      {description && (
        <p className="mt-2 max-w-[36rem] text-base font-acid font-normal leading-[1.2] text-gfx-neutral-400">
          {description}
        </p>
      )}
      {action && <div className="mt-7">{action}</div>}
    </div>
  )
}
