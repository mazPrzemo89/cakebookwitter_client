export type Action = { type: 'CHANGE_URL'; payload: string }

const addNote = (url: string): Action => ({
  type: 'CHANGE_URL',
  payload: url,
})
