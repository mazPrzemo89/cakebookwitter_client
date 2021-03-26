import { API } from '../config'

export const addCake = (cake: FormData) => {
  return fetch(`${API}/cake`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
    },
    body: cake,
  })
    .then((response) => {
      return response.json()
    })
    .catch((err) => {
      return err.json()
    })
}
