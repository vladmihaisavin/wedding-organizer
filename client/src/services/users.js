import httpClient from './httpClient'

export async function createUser(body) {
  return httpClient.post('/users', body)
}

export async function updateUser(userId, body) {
  return httpClient.put(`/users/${userId}`, body)
}

export async function deleteUser(userId) {
  return httpClient.delete(`/users/${userId}`)
}