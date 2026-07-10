import { useState, useEffect } from 'react'

function CloseIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M18 6L6 18M6 6L18 18" stroke="#808080" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

interface NewFolderModalProps {
  open: boolean
  onClose: () => void
  onSave?: (name: string) => void
}

export default function NewFolderModal({ open, onClose, onSave }: NewFolderModalProps) {
  const [folderName, setFolderName] = useState('')

  useEffect(() => {
    if (!open) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [open, onClose])

  useEffect(() => {
    if (open) setFolderName('')
  }, [open])

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-[300] flex items-center justify-center"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-[4px]" />

      <div
        className="relative w-[500px] rounded-[30px] bg-[#0c1311] border border-white/6 p-[40px] shadow-[0px_4.64px_23.2px_rgba(0,0,0,0.2)]"
        onClick={e => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-[20px] right-[20px] cursor-pointer hover:opacity-80 transition-opacity"
        >
          <CloseIcon />
        </button>

        {/* Title */}
        <h2 className="text-white text-[32px] font-acid font-normal text-center mb-[30px]">
          Create a New Folder
        </h2>

        {/* Folder Name */}
        <div className="mb-[30px]">
          <label className="text-white text-[16px] font-acid font-medium mb-[10px] block">
            Folder Name
          </label>
          <input
            type="text"
            value={folderName}
            onChange={e => setFolderName(e.target.value)}
            placeholder="Enter folder name"
            className="w-full h-[50px] rounded-[30px] bg-[#0c1311] border border-[#064b34] px-[26px] text-white text-[16px] font-acid outline-none focus:border-[#00b38c] transition-colors placeholder:text-[#808080]"
            autoFocus
          />
        </div>

        {/* Actions */}
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={onClose}
            className="h-[44px] px-[36px] rounded-[300px] border border-[#303030] bg-transparent text-white text-[16px] font-acid cursor-pointer hover:border-[#505050] transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              if (folderName.trim()) {
                onSave?.(folderName.trim())
                onClose()
              }
            }}
            className="h-[44px] px-[36px] rounded-[300px] bg-[#00b38c] text-[#0c1311] text-[16px] font-acid font-medium cursor-pointer hover:bg-[#00c99a] transition-colors"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  )
}
