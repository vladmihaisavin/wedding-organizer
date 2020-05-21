import httpClient from './httpClient'

export async function createResource(body) {
  return httpClient.post('/users', body)
}

export async function updateResource(userId, body) {
  return httpClient.put(`/users/${userId}`, body)
}

export async function deleteResource(userId) {
  return httpClient.delete(`/users/${userId}`)
}