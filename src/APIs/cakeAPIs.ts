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

export const fetchCakes = () => {
  return fetch(`${API}/cake/all`, {
    method: 'GET',
  })
    .then((response) => {
      return response.json()
    })
    .catch((err) => {
      console.log(err)
    })
}

export const fetchCake = (id: string) => {
  return fetch(`${API}/cake/${id}`, {
    method: 'GET',
  })
    .then((response) => {
      return response.json()
    })
    .catch((err) => {
      console.log(err)
    })
}

export const deleteCake = (cakeId: string) => {
  return fetch(`${API}/cake/delete/${cakeId}`, {
    method: 'DELETE',
  })
    .then((response) => {
      return response.json()
    })
    .catch((err) => {
      console.log(err)
    })
}
