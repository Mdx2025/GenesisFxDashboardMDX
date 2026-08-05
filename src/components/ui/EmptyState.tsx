import { SearchIcon } from '@/components/icons'

interface EmptyStateProps {
  title?: string
  description?: string
}

export function EmptyState({ title = 'No results found', description = 'Try adjusting your search or filters to find what you\'re looking for.' }: EmptyStateProps) {
  return (
    <div className="p-10 flex flex-col items-center text-center max-w-md mx-auto">
      <SearchIcon size={32} color="#606060" className="mb-4" />
      <p className="text-body1 text-white mb-1">{title}</p>
      <p className="text-caption text-gfx-neutral-500">{description}</p>
    </div>
  )
}
