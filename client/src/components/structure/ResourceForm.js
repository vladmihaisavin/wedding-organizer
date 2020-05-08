import React from 'react'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}))

function UserForm(props) {
  const classes = useStyles()
  const { customProps } = props
  return (
    <Paper>
      <form className={classes.root} noValidate autoComplete="off">
          {
            customProps.resourceProperties.map(property => (
              <div>
                <TextField
                  id={property.id}
                  label={property.label}
                  variant="outlined"
                />
              </div>
            ))
          }
      </form>
      <Button variant="contained" color="primary" onClick={customProps.actions.cancelButtonClicked}>Cancel</Button>
    </Paper>
  )
}

export default UserForm