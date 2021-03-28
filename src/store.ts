import { createStore } from 'redux'
import { urlReducer } from './urlReducer'
// Redux is not necessary at this point (used cookies)
// Leaving it for possible future use
export const store = createStore(urlReducer)
