import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import ResourceFormStyles from '../../styles/resourceForm'

function ResourceForm(props) {
  const { customProps, classes } = props
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

ResourceForm.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(ResourceFormStyles)(ResourceForm)