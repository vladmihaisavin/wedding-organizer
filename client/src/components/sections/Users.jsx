import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import ContentResource from '../structure/ContentResource.jsx'
import { useLoadResource } from '../../services/loadResourceHook'
import { resourceName, resourceUrl, listProperties } from '../../static/userResource.json'
import { deleteResource } from '../../services/users'

function Users(props) {
  const [shouldLoad, setShouldLoad] = useState(true)
  const [preloader, setPreloader] = useState(true)
  const [data, loading] = useLoadResource(resourceUrl, shouldLoad)

  const actions = {
    reload: () => setShouldLoad(true),
    delete: async (selectedIds) => {
      setPreloader(true)
      for (const resourceId of selectedIds) {
        await deleteResource(resourceId)
      }
      setShouldLoad(true)
    }
  }

  useEffect(() => {
    setPreloader(loading)
  }, [loading])
  
  useEffect(() => {
    setShouldLoad(false)
  }, [shouldLoad])

  return (
    <ContentResource customProps={{ actions, listProperties, resourceName, resourceUrl }} resources={{ data, preloader }} />
  )
}

export default withRouter(Users)