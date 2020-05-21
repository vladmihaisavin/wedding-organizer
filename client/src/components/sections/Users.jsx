import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import ContentResource from '../structure/ContentResource.jsx'
import { useLoadResource } from '../../services/loadResourceHook'
import { resourceName, resourceUrl, listProperties } from '../../static/userResource.json'

function Users(props) {
  const [shouldLoad, setShouldLoad] = useState(true)
  const [data, loading] = useLoadResource(resourceUrl, shouldLoad)

  const actions = {
    reload: () => setShouldLoad(true),
    delete: () => {

    }
  }

  // This effect runs only when shouldLoad state field changes
  useEffect(() => {
    setShouldLoad(false)
  }, [shouldLoad])

  return (
    <ContentResource customProps={{ actions, listProperties, resourceName, resourceUrl }} resources={{ data, loading }} />
  )
}

export default withRouter(Users)