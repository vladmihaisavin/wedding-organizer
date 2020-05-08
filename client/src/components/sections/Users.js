import React from 'react'
import ContentResource from '../structure/ContentResource'
import { useLoadResource } from '../../helpers'
import { resourceName, resourceUrl } from '../../static/userResource'

function Users(props) {
  const [data, loading] = useLoadResource(resourceUrl)
  const labels = {
    addButton: `Add ${resourceName}`,
    searchText: 'Search...',
    resourceName
  }
  const actions = {
    reload: () => console.log(`Refreshing ${resourceName}s...`)
  }

  return (
    <ContentResource customProps={{ labels, actions }} resources={{ data, loading }} />
  )
}

export default Users