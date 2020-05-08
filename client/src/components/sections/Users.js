import React, { useState, useEffect } from 'react'
import ContentResource from '../structure/ContentResource'
import { useLoadResource } from '../../helpers'
import { resourceName, resourceUrl, resourceProperties } from '../../static/userResource'

const labels = {
  addButton: `Add ${resourceName}`,
  searchText: 'Search...',
  resourceName
}

function Users() {
  const [shouldLoad, setShouldLoad] = useState(true)
  const [data, loading] = useLoadResource(resourceUrl, shouldLoad)

  const actions = {
    reload: () => setShouldLoad(true)
  }

  // This effect runs only when shouldLoad state field changes
  useEffect(() => {
    setShouldLoad(false)
  }, [shouldLoad])

  return (
    <ContentResource customProps={{ labels, actions, resourceProperties }} resources={{ data, loading }} />
  )
}

export default Users