import { Action } from './actions'

export interface UrlState {
  url: string
}

const initialState = {
  url: '',
}

export const urlReducer = (state: UrlState = initialState, action: Action) => {
  switch (action.type) {
    case 'CHANGE_URL': {
      return { url: action.payload }
    }
    default:
      return state
  }
}
