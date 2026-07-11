import { SearchIcon } from '@/components/icons'

interface SearchInputProps {
  placeholder?: string
  value?: string
  onChange?: (value: string) => void
}

export function SearchInput({ placeholder = 'Search for', value, onChange }: SearchInputProps) {
  const inputProps = value !== undefined
    ? { value, onChange: (e: React.ChangeEvent<HTMLInputElement>) => onChange?.(e.target.value) }
    : { defaultValue: '', onChange: (e: React.ChangeEvent<HTMLInputElement>) => onChange?.(e.target.value) }

  return (
    <div className="relative">
      <SearchIcon size={14} color="#A0A0A0" className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
      <input
        type="search"
        placeholder={placeholder}
        {...inputProps}
        aria-label="Search accounts"
        className="pl-9 pr-4 py-2.5 border border-[#064B34] rounded-full bg-transparent text-white text-body2 w-full sm:w-[17.9rem] focus:border-gfx-green-500/30 focus:outline-none transition-colors placeholder:text-gfx-neutral-300"
      />
    </div>
  )
}
