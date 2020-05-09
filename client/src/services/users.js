import httpClient from './httpClient'

export async function createUser(body) {
  return httpClient.post('/users', body)
}