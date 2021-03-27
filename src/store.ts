import { createStore } from 'redux'
import { urlReducer } from './urlReducer'

export const store = createStore(urlReducer)
