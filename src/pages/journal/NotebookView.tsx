import { useState } from 'react'
import { GlassCard, GlowEllipse, SparkleButton, GlowButton, ModeToggle } from '@/components/ui'
import { notebookFolders, notebookNotes } from '@/data/notebook'
import type { NotebookNote } from '@/data/notebook'

/* ─── Icons ─── */

function NewFolderIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path d="M2 6C2 4.89543 2.89543 4 4 4H9L11 6H20C21.1046 6 22 6.89543 22 8V18C22 19.1046 21.1046 20 20 20H4C2.89543 20 2 19.1046 2 18V6Z" stroke="#c6c6c6" strokeWidth="1.5" />
      <path d="M12 10V16M9 13H15" stroke="#c6c6c6" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

function NoteIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path d="M12 5V19M5 12H19" stroke="#0c1311" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

function TrashIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path d="M3 6H5H21" stroke="#606060" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M8 6V4C8 3.44772 8.44772 3 9 3H15C15.5523 3 16 3.44772 16 4V6" stroke="#606060" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M19 6V20C19 20.5523 18.5523 21 18 21H6C5.44772 21 5 20.5523 5 20V6" stroke="#606060" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

function GalleryIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <rect x="2" y="2" width="20" height="20" rx="3" stroke="#808080" strokeWidth="1.5" />
      <circle cx="8.5" cy="8.5" r="2" stroke="#808080" strokeWidth="1.5" />
      <path d="M2 17L7 12L11 16L15 12L22 19" stroke="#808080" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function BookmarkIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path d="M5 7C5 4.79086 6.79086 3 9 3H15C17.2091 3 19 4.79086 19 7V21L12 17L5 21V7Z" stroke="#606060" strokeWidth="1.5" />
    </svg>
  )
}

/* ─── Note Card (using GlassCard) ─── */

function NoteCard({ note }: { note: NotebookNote }) {
  return (
    <GlassCard variant="light" divider="none" rounded="15px" className="min-w-[420px] flex-1 overflow-hidden">
      <div className="p-[18px] flex flex-col gap-3 h-full">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <BookmarkIcon />
            <span className="text-white text-[16px] font-acid font-medium">{note.label}</span>
          </div>
          <button className="hover:opacity-80 transition-opacity cursor-pointer">
            <TrashIcon />
          </button>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-white text-[16px] font-acid font-medium">{note.date}</span>
          <span className="text-[#808080] text-[14px] font-acid">Account: {note.account}</span>
        </div>

        <p className="text-[#a0a0a0] text-[16px] font-acid font-medium">{note.preview}</p>

        <div className="flex items-center gap-3 mt-auto">
          {note.tags.map(tag => (
            <div
              key={tag}
              className="h-[24px] px-[18px] rounded-full border border-[#064b34] bg-[#0c1311] flex items-center justify-center"
            >
              <span className="text-[#00b38c] text-[12px] font-acid">{tag}</span>
            </div>
          ))}
          {note.attachments > 0 && (
            <div className="flex items-center gap-1.5">
              <GalleryIcon />
              <span className="text-white text-[16px] font-acid font-medium">{note.attachments}</span>
            </div>
          )}
        </div>
      </div>
    </GlassCard>
  )
}

/* ─── Main Component ─── */

interface NotebookViewProps {
  onNewNote?: () => void
  onNewFolder?: () => void
}

export default function NotebookView({ onNewNote, onNewFolder }: NotebookViewProps) {
  const [activeFolder, setActiveFolder] = useState(0)

  return (
    <div className="flex flex-col gap-4">
      {/* Header Card */}
      <GlassCard variant="light" divider="none" rounded="19px" className="overflow-hidden">
        <GlowEllipse className="left-[-20px] top-[-20px]" />
        <div className="relative flex items-center justify-between px-6 py-6">
          <div>
            <h3 className="text-white text-[24px] font-acid font-normal leading-tight">Notebook</h3>
            <p className="text-[#808080] text-[16px] font-acid font-medium mt-1">
              All your trading notes in one place
            </p>
          </div>
          <div className="flex items-center gap-3">
            <SparkleButton className="px-6" onClick={() => onNewFolder?.()}>
              <NewFolderIcon />
              <span>New folder</span>
            </SparkleButton>
            <GlowButton
              label="New Note"
              icon={<NoteIcon />}
              height={44}
              radius={300}
              onClick={() => onNewNote?.()}
            />
          </div>
        </div>
      </GlassCard>

      {/* Folder Tabs — ModeToggle */}
      <div className="max-w-3xl">
        <ModeToggle
          options={[...notebookFolders]}
          defaultIndex={0}
          activeIndex={activeFolder}
          onChange={setActiveFolder}
        />
      </div>

      {/* Notes Grid */}
      <GlassCard variant="light" divider="none" rounded="19px" className="overflow-hidden">
        <div className="p-5 flex gap-5 overflow-x-auto">
          {notebookNotes.map(note => (
            <NoteCard key={note.id} note={note} />
          ))}
        </div>
      </GlassCard>
    </div>
  )
}
