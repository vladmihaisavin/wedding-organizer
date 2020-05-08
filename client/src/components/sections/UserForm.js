import React from 'react'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'

function UserForm(props) {
  const { customProps } = props
  return (
    <Paper><Button onClick={customProps.actions.cancelButtonClicked}>Cancel</Button></Paper>
  )
}

export default UserForm