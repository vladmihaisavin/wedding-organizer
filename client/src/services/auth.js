import httpClient from '../httpClient'
import Cookies from 'js-cookie'

export function hasAuthToken() {
  return !!Cookies.get('AUTH_TOKEN')
}

export async function login(body) {
  return httpClient.post('/accounts/login', {
    email: body.email,
    password: body.password
  }).then((response) => {
    Cookies.set('AUTH_TOKEN', response.data.token, { expires: 1/24 })
    httpClient.defaults.headers.common['Authorization'] = `Bearer ${ response.data.token }`
    return response
  })
}

export function logout() {
  Cookies.remove('AUTH_TOKEN')
}