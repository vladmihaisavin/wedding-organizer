import React, { useState, useEffect } from 'react'
import ContentResource from '../structure/ContentResource'
import UserForm from './UserForm'
import { useLoadResource } from '../../helpers'
import { resourceName, resourceUrl, resourceProperties } from '../../static/userResource'

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
    saveButtonClicked: () => {
      setDisplayUserForm(false)
    },
    cancelButtonClicked: () => setDisplayUserForm(false)
  }

  // This effect runs only when shouldLoad state field changes
  useEffect(() => {
    setShouldLoad(false)
  }, [shouldLoad])

  return (
    displayUserForm
    ? <UserForm customProps={{ labels, actions, resourceProperties }} />
    : <ContentResource customProps={{ labels, actions, resourceProperties }} resources={{ data, loading }} />
  )
}

export default Users