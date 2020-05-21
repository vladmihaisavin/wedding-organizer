import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import ResourceFormStyles from '../../styles/resourceForm'

function generateDefaultResourceObject(resourceFields, resourceObject = {}) {
  const defaultResourceObject = {}
  for (const field of resourceFields) {
    defaultResourceObject[field] = resourceObject[field]
  }
  return defaultResourceObject
}

function ResourceForm(props) {
  const { customProps, classes, oldResource } = props
  const [resource, setResource] = useState(generateDefaultResourceObject(customProps.resourceFields, oldResource))

  console.log(resource)
  
  return (
    <Paper className={classes.paper}>
      <Grid className={classes.grid} container alignItems="center">
        <Grid item xs={12}>
          {
            customProps.resourceProperties.map(property => {
              console.log(property)
              return (
                <TextField
                  key={property.id}
                  id={property.id}
                  value={resource[property.id]}
                  type={property.type || 'text'}
                  label={property.label}
                  variant="outlined"
                  className={classes.textField}
                  size={"small"}
                  fullWidth
                  margin="normal"
                  onChange={(e) => setResource({ ...resource, [property.id]: e.target.value })}
                />
              )
            })
          }
        </Grid>
      </Grid>
      <Grid className={classes.actions} container spacing={2} direction="row" alignItems="center" justify="flex-end" xs={12}>
        <Grid item>
          <Button color="secondary" onClick={customProps.actions.cancelButtonClicked}>Cancel</Button>
        </Grid>
        <Grid item>
         <Button variant="contained" color="primary" onClick={customProps.actions.saveButtonClicked}>Save {customProps.resourceName}</Button>
        </Grid>
      </Grid>
    </Paper>
  )
}

ResourceForm.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(ResourceFormStyles)(ResourceForm)