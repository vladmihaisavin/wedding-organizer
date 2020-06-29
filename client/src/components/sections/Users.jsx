import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import ContentResource from '../structure/ContentResource.jsx'
import { useLoadResource } from '../../services/loadResourceHook'
import { resourceName, resourceUrl, listProperties, bulkUpdateFields, tableType } from '../../static/userResource.json'
import { bulkUpdateResource, deleteResource } from '../../services/users'

function Users() {
  const [shouldLoad, setShouldLoad] = useState(true)
  const [data, loading] = useLoadResource(resourceUrl, shouldLoad)
  const [preloader, setPreloader] = useState(true)
  const [resources, setResources] = useState([])

  const actions = {
    reload: () => setShouldLoad(true),
    delete: async (selectedResources) => {
      setPreloader(true)
      for (const resourceId of Array.from(selectedResources.keys())) {
        await deleteResource(resourceId)
      }
      setShouldLoad(true)
    },
    bulkUpdate: bulkUpdateFields.length > 0 ? async (selectedResources) => {
      setPreloader(true)
      await bulkUpdateResource({
        criteria: [{
          field: 'id',
          op: 'in',
          value: Array.from(selectedResources.keys())
        }],
        set: bulkUpdateFields.reduce((acc, item) => {
          acc[item.field] = item.defaultValue
          return acc
        }, {})
      })
      setShouldLoad(true)
    } : undefined,
    search: (term, field) => {
      setResources(data.filter((item) => item[field].split(term).length > 1))
    }
  }

  useEffect(() => {
    setResources(data)
  }, [data])

  useEffect(() => {
    setPreloader(loading)
  }, [loading])
  
  useEffect(() => {
    setShouldLoad(false)
  }, [shouldLoad])

  return (
    <ContentResource customProps={{ actions, listProperties, resourceName, resourceUrl, tableType }} resources={resources} preloader={preloader} />
  )
}

export default withRouter(Users)