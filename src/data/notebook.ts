export const notebookFolders = ['All notes', 'Trade', 'Day', 'Account', 'Text1'] as const

export type NotebookFolder = (typeof notebookFolders)[number]
export type NoteFolder = Exclude<NotebookFolder, 'All notes'>

export interface NotebookNote {
  id: string
  folder: NoteFolder
  label: string
  date: string
  account: string
  preview: string
  tags: string[]
  attachments: number
}

export const notebookNotes: NotebookNote[] = [
  {
    id: '1',
    folder: 'Trade',
    label: 'Day',
    date: 'Monday, Apr 20, 2026',
    account: 'L#716445',
    preview: 'Example of a note',
    tags: ['#trade'],
    attachments: 1,
  },
  {
    id: '2',
    folder: 'Day',
    label: 'Day',
    date: 'Monday, Apr 20, 2026',
    account: 'L#716445',
    preview: 'Example of a note',
    tags: ['#trade'],
    attachments: 1,
  },
  {
    id: '3',
    folder: 'Account',
    label: 'Day',
    date: 'Monday, Apr 20, 2026',
    account: 'L#716445',
    preview: 'Example of a note',
    tags: ['#trade'],
    attachments: 1,
  },
  {
    id: '4',
    folder: 'Text1',
    label: 'Day',
    date: 'Monday, Apr 20, 2026',
    account: 'L#716445',
    preview: 'Example of a note',
    tags: ['#trade'],
    attachments: 1,
  },
]
