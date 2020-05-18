import React, { useState, useEffect } from 'react'
import ContentResource from '../structure/ContentResource'
import ResourceForm from '../structure/ResourceForm'
import { useLoadResource } from '../../services/loadResourceHook'

import { resourceName, resourceUrl, resourceProperties, resourceFields } from '../../static/userResource'
import { createUser } from '../../services/users'

const labels = {
  addButton: `Add ${resourceName}`,
  searchText: 'Search...',
  resourceName
}

function Users(props) {
  // Used for component management
  const [shouldLoad, setShouldLoad] = useState(true)
  const [displayResourceForm, setDisplayResourceForm] = useState(false)

  //Used for listing the resources
  const [data, loading] = useLoadResource(resourceUrl, shouldLoad)

  // Used for updating the resource
  const [resourceId, setResourceId] = useState(props.matchedParams.userId)

  const actions = {
    reload: () => setShouldLoad(true),
    addButtonClicked: () => setDisplayResourceForm(true),
    saveButtonClicked: async (resourceBody) => {
      await createUser({
        name: 'Vlad',
        email: 'vlad@gmail.com',
        password: 'asd123'
      })
      setDisplayResourceForm(false)
      setShouldLoad(true)
    },
    cancelButtonClicked: () => {
      setDisplayResourceForm(false)
      setResourceId(undefined)
    }
  }

  // This effect runs only when shouldLoad state field changes
  useEffect(() => {
    setShouldLoad(false)
  }, [shouldLoad])

  return (
    displayResourceForm
    ? <ResourceForm 
      customProps={{ labels, actions, resourceName, resourceProperties, resourceFields }}
      oldResource={data.find(resource => resource.id === parseInt(resourceId)) || {}}
    />
    : <ContentResource customProps={{ labels, actions, resourceProperties }} resources={{ data, loading }} />
  )
}

export default Users