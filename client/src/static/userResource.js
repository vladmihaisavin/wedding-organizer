export const resourceName = 'user'
export const resourceUrl = 'users'
export const resourceProperties = [
  { id: 'name', numeric: false, disablePadding: true, label: 'Name' },
  { id: 'email', numeric: false, disablePadding: false, label: 'Email' },
  { id: 'type', numeric: false, disablePadding: false, label: 'Type' },
  { id: 'password', numeric: false, disablePadding: false, label: 'Password', type: 'password' },
  { id: 'createdAt', numeric: false, disablePadding: false, label: 'Created At' }
]
export const resourceFields = [
  'name',
  'email',
  'type',
  'password',
  'createdAt'
]