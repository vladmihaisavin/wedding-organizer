import httpClient from '../httpClient'
import Cookies from 'js-cookie'

export function hasAuthToken() {
  return !!Cookies.get('AUTH_TOKEN')
}

export async function login(body) {
  return httpClient.post('/accounts/login', {
    email: body.email,
    password: body.password
  })
}

export function logout() {
  Cookies.remove('AUTH_TOKEN')
}