import React from 'react'
import EmptyResourceTable from '../reusable/EmptyResourceTable'
import Content from '../structure/ContentResource'
import { getUsers } from '../../services/users'

function Users(props) {
  const labels = {
    addButton: 'Add user',
    searchText: 'Search...',
    resourceName: 'users'
  }
  const actions = {
    reload: () => console.log('Refreshing users...')
  }
  const users = getUsers()
  const resourceTable = users.length > 0 ? '' : EmptyResourceTable
  return (
    <Content customProps={{ labels, actions, resourceTable }} />
  )
}

export default Users