import React from 'react'
import ContentResource from '../structure/ContentResource'
import { useLoadResource } from '../../helpers'

function Users(props) {
  const [data, loading] = useLoadResource('users')
  const labels = {
    addButton: 'Add user',
    searchText: 'Search...',
    resourceName: 'users'
  }
  const actions = {
    reload: () => console.log('Refreshing users...')
  }

  return (
    <ContentResource customProps={{ labels, actions }} resources={{ data, loading }} />
  )
}

export default Users