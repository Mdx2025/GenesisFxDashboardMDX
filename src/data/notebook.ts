export interface NotebookNote {
  id: string
  label: string
  date: string
  account: string
  preview: string
  tags: string[]
  attachments: number
}

export const notebookFolders = ['All notes', 'Trade', 'Day', 'Account', 'Text1'] as const

export const notebookNotes: NotebookNote[] = [
  {
    id: '1',
    label: 'Day',
    date: 'Monday, Apr 20, 2026',
    account: 'L#716445',
    preview: 'Example of a note',
    tags: ['#trade'],
    attachments: 1,
  },
  {
    id: '2',
    label: 'Day',
    date: 'Monday, Apr 20, 2026',
    account: 'L#716445',
    preview: 'Example of a note',
    tags: ['#trade'],
    attachments: 1,
  },
]
