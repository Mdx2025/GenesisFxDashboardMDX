import { useState } from 'react'
import { GlassCard, GlowEllipse, SparkleButton, GlowButton, ModeToggle } from '@/components/ui'
import { notebookFolders, notebookNotes } from '@/data/notebook'
import type { NotebookNote } from '@/data/notebook'

/* ─── Icons ─── */

function NewFolderIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path fillRule="evenodd" clipRule="evenodd" d="M0.723807 3.38329C0.666016 3.68959 0.666016 4.05732 0.666016 4.79276V10.668C0.666016 13.8107 0.666016 15.382 1.64233 16.3583C2.61864 17.3346 4.18999 17.3346 7.33268 17.3346H10.666C13.8087 17.3346 15.3801 17.3346 16.3564 16.3583C17.3327 15.382 17.3327 13.8107 17.3327 10.668V8.83289C17.3327 6.63925 17.3327 5.54243 16.6915 4.82949C16.6325 4.76392 16.5701 4.7015 16.5045 4.64252C15.7916 4.0013 14.6947 4.0013 12.5011 4.0013H12.1897C11.2283 4.0013 10.7476 4.0013 10.2996 3.87362C10.0536 3.80347 9.81638 3.70523 9.59278 3.58082C9.18574 3.35436 8.84583 3.01445 8.16602 2.33464L7.70747 1.87609C7.47962 1.64824 7.36569 1.53431 7.24597 1.43506C6.72978 1.00716 6.09656 0.744874 5.42899 0.682448C5.27415 0.667969 5.11304 0.667969 4.79081 0.667969C4.05536 0.667969 3.68764 0.667969 3.38134 0.725761C2.03294 0.980169 0.978216 2.03489 0.723807 3.38329ZM9.20768 7.33464C9.20768 6.98946 9.4875 6.70964 9.83268 6.70964H13.9993C14.3445 6.70964 14.6243 6.98946 14.6243 7.33464C14.6243 7.67981 14.3445 7.95964 13.9993 7.95964H9.83268C9.4875 7.95964 9.20768 7.67981 9.20768 7.33464Z" fill="#C6C6C6" />
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
    <svg width="14" height="15" viewBox="0 0 14 15" fill="none">
      <path d="M0 3.39286C0 3.09699 0.245032 2.85714 0.547295 2.85714H4.13841C4.14328 2.22622 4.21166 1.36128 4.83778 0.762511C5.33052 0.291289 6.00606 0 6.74999 0C7.49393 0 8.16946 0.291289 8.66221 0.76251C9.28833 1.36128 9.35671 2.22622 9.36158 2.85714H12.9527C13.255 2.85714 13.5 3.09699 13.5 3.39286C13.5 3.68872 13.255 3.92857 12.9527 3.92857H0.547295C0.245032 3.92857 0 3.68872 0 3.39286Z" fill="#808080" />
      <path d="M6.45492 15H7.04512C9.07574 15 10.091 15 10.7512 14.3526C11.4113 13.7052 11.4789 12.6432 11.6139 10.5193L11.8086 7.4589C11.8819 6.30648 11.9185 5.73027 11.5873 5.36514C11.2562 5 10.6969 5 9.5784 5H3.92163C2.80312 5 2.24387 5 1.9127 5.36514C1.58153 5.73027 1.61817 6.30648 1.69146 7.4589L1.88609 10.5193C2.02117 12.6432 2.08871 13.7052 2.74885 14.3526C3.40899 15 4.4243 15 6.45492 15Z" fill="#808080" />
    </svg>
  )
}

function GalleryIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <g clipPath="url(#galleryClip)">
        <path d="M11.9987 5.33203C11.9987 6.06841 11.4017 6.66536 10.6654 6.66536C9.92898 6.66536 9.33203 6.06841 9.33203 5.33203C9.33203 4.59565 9.92898 3.9987 10.6654 3.9987C11.4017 3.9987 11.9987 4.59565 11.9987 5.33203Z" fill="white" />
        <path fillRule="evenodd" clipRule="evenodd" d="M7.96045 0.832031H8.03695C9.57587 0.832023 10.7819 0.832017 11.7229 0.958529C12.6861 1.08802 13.4461 1.35825 14.0426 1.95479C14.6391 2.55133 14.9094 3.31134 15.0389 4.2745C15.1654 5.21549 15.1654 6.42152 15.1654 7.96045V8.01931C15.1654 9.29183 15.1654 10.3336 15.0963 11.1817C15.0268 12.0341 14.8845 12.7463 14.566 13.3378C14.4255 13.5988 14.2528 13.8324 14.0426 14.0426C13.4461 14.6391 12.6861 14.9094 11.7229 15.0389C10.7819 15.1654 9.57588 15.1654 8.03695 15.1654H7.96045C6.42152 15.1654 5.21549 15.1654 4.2745 15.0389C3.31134 14.9094 2.55133 14.6391 1.95479 14.0426C1.42594 13.5138 1.15283 12.8555 1.0076 12.039C0.864931 11.2369 0.838833 10.2389 0.833411 8.99968C0.832031 8.68447 0.832031 8.35109 0.832031 7.99936V7.96044C0.832023 6.42152 0.832017 5.21549 0.958529 4.2745C1.08802 3.31134 1.35825 2.55133 1.95479 1.95479C2.55133 1.35825 3.31134 1.08802 4.2745 0.958529C5.21549 0.832017 6.42152 0.832023 7.96045 0.832031ZM4.40775 1.94961C3.55548 2.0642 3.04167 2.28212 2.6619 2.6619C2.28212 3.04167 2.0642 3.55548 1.94961 4.40775C1.83309 5.2744 1.83203 6.41321 1.83203 7.9987C1.83203 8.19237 1.83203 8.37967 1.83226 8.56103L2.49968 7.97704C3.1072 7.44547 4.02281 7.47596 4.59362 8.04676L7.45343 10.9066C7.91159 11.3647 8.63279 11.4272 9.16289 11.0546L9.36169 10.9149C10.1245 10.3788 11.1566 10.4409 11.8496 11.0647L13.7366 12.7629C13.9265 12.364 14.0393 11.8399 14.0996 11.1005C14.165 10.2975 14.1654 9.29595 14.1654 7.9987C14.1654 6.41321 14.1643 5.2744 14.0478 4.40775C13.9332 3.55548 13.7153 3.04167 13.3355 2.6619C12.9557 2.28212 12.4419 2.0642 11.5896 1.94961C10.723 1.83309 9.58418 1.83203 7.9987 1.83203C6.41321 1.83203 5.2744 1.83309 4.40775 1.94961Z" fill="white" />
      </g>
      <defs>
        <clipPath id="galleryClip"><rect width="16" height="16" fill="white" /></clipPath>
      </defs>
    </svg>
  )
}

/* ─── Note Card (using GlassCard) ─── */

function NoteCard({ note }: { note: NotebookNote }) {
  return (
    <div className="flex-1 min-w-0 rounded-[0.9375rem] border border-gfx-green-900 bg-transparent">
      <div className="p-[1.125rem] flex flex-col gap-3 h-full">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <span className="text-white text-sm sm:text-base font-acid font-medium">{note.label}</span>
          </div>
          <button className="hover:opacity-80 transition-opacity cursor-pointer">
            <TrashIcon />
          </button>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-white text-sm sm:text-base font-acid font-medium">{note.date}</span>
          <span className="text-gfx-neutral-400 text-xs sm:text-sm font-acid">Account: {note.account}</span>
        </div>

        <p className="text-gfx-neutral-500 text-sm sm:text-base font-acid font-medium">{note.preview}</p>

        <div className="flex items-center gap-3 mt-auto">
          {note.tags.map(tag => (
            <div
              key={tag}
              className="h-[1.5rem] px-[1.125rem] rounded-full border border-gfx-green-200 bg-gfx-green-800 flex items-center justify-center"
            >
              <span className="text-gfx-green-300 text-[0.75rem] font-acid">{tag}</span>
            </div>
          ))}
          {note.attachments > 0 && (
            <div className="flex items-center gap-1.5">
              <GalleryIcon />
              <span className="text-white text-[1rem] font-acid font-medium">{note.attachments}</span>
            </div>
          )}
        </div>
      </div>
    </div>
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
        <GlowEllipse className="left-[10%] top-[-20%]" />
        <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 px-4 sm:px-6 py-6 sm:py-10">
          <div>
            <h3 className="text-white text-xl sm:text-2xl font-acid font-normal leading-tight">Notebook</h3>
            <p className="text-gfx-neutral-400 text-sm sm:text-base font-acid font-medium mt-1">
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
              width={180}
              height={44}
              radius={300}
              onClick={() => onNewNote?.()}
            />
          </div>
        </div>
      </GlassCard>

      <div className="flex flex-col gap-6">
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
          <GlowEllipse className="left-1/2 -translate-x-1/2 top-[-80px]" />
          <div className="relative p-3 sm:p-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
            {notebookNotes.map(note => (
              <NoteCard key={note.id} note={note} />
            ))}
          </div>
        </GlassCard>
      </div>
    </div>
  )
}
