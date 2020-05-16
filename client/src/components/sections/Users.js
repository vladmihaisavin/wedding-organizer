import React, { useState, useEffect } from 'react'
import ContentResource from '../structure/ContentResource'
import ResourceForm from '../structure/ResourceForm'
import { useLoadResource } from '../../services/loadResourceHook'
import { resourceName, resourceUrl, resourceProperties } from '../../static/userResource'
import { createUser } from '../../services/users'

const labels = {
  addButton: `Add ${resourceName}`,
  searchText: 'Search...',
  resourceName
}

function Users() {
  const [shouldLoad, setShouldLoad] = useState(true)
  const [displayUserForm, setDisplayUserForm] = useState(false)
  const [data, loading] = useLoadResource(resourceUrl, shouldLoad)

  const actions = {
    reload: () => setShouldLoad(true),
    addButtonClicked: () => setDisplayUserForm(true),
    saveButtonClicked: async () => {
      await createUser({
        name: 'Vlad',
        email: 'vlad@gmail.com',
        password: 'asd123'
      })
      setDisplayUserForm(false)
      setShouldLoad(true)
    },
    cancelButtonClicked: () => setDisplayUserForm(false)
  }

  // This effect runs only when shouldLoad state field changes
  useEffect(() => {
    setShouldLoad(false)
  }, [shouldLoad])

  return (
    displayUserForm
    ? <ResourceForm customProps={{ labels, actions, resourceProperties, resourceName }} />
    : <ContentResource customProps={{ labels, actions, resourceProperties }} resources={{ data, loading }} />
  )
}

export default Users