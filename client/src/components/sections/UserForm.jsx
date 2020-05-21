import React from 'react'
import { withRouter } from 'react-router-dom'
import ResourceForm from '../structure/ResourceForm.jsx'
import { useLoadResource } from '../../services/loadResourceHook'
import { resourceName, resourceUrl, formProperties, formFields } from '../../static/userResource.json'
import { createUser, updateUser } from '../../services/users'

function UserForm(props) {
  const resourceId = props.match.params.userId
  const [data, loading] = useLoadResource(`${resourceUrl}/${resourceId}`, !!resourceId)

  const actions = {
    saveButtonClicked: async (resourceBody) => {
      switch(props.action) {
        case 'create':
          await createUser(resourceBody)
          break
        case 'update':
          await updateUser(resourceId, resourceBody)
          break
        default:
          break
      }
      props.history.push('/users')
    },
    cancelButtonClicked: () => {
      props.history.push('/users')
    }
  }

  return (
    <ResourceForm 
      customProps={{ actions, resourceName, formProperties, formFields }}
      action={props.action}
      oldResource={data[0] || {}}
      loading={loading}
    />
  )
}

export default withRouter(UserForm)