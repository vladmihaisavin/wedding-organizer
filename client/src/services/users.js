import httpClient from './httpClient'

export async function createResource(body) {
  return httpClient.post('/users', body)
}

export async function bulkUpdateResource(body) {
  return httpClient.patch('/users', body)
}

export async function partialUpdateResource(userId, body) {
  return httpClient.patch(`/users/${userId}`, body)
}

export async function deleteResource(userId) {
  return httpClient.delete(`/users/${userId}`)
}