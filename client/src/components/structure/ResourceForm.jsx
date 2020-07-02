import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import Preloader from '../reusable/Preloader.jsx'
import ResourceFormStyles from '../../styles/resourceForm'
import httpClient from '../../services/httpClient'

function generateDefaultResourceObject(formFields, resourceObject = {}) {
  const defaultResourceObject = {}
  for (const field of formFields) {
    defaultResourceObject[field] = resourceObject[field] || ''
  }
  return defaultResourceObject
}

function ResourceForm(props) {
  const { customProps, classes, oldResource, loading } = props
  const [resource, setResource] = useState(generateDefaultResourceObject(customProps.formFields, oldResource))
  const [fetchedFields, setFetchedFields] = useState({})

  useEffect(() => {
    async function fetchFields() {
      for (const formProperty of customProps.formProperties) {
        if (formProperty.type === 'select') {
          const response = await httpClient.get(`/${formProperty.slug}`)
          let data = {}
          if (response.status === 200) {
            data = response.data
          }
          setFetchedFields(prevFetchedFields => ({
            ...prevFetchedFields,
            [formProperty.id]: data
          }))
        }
      }
    }
    fetchFields()
  }, [customProps.formProperties])

  useEffect(() => {
    setResource(generateDefaultResourceObject(customProps.formFields, oldResource))
  }, [customProps, oldResource])

  const formatSelectValue = (value) => {
    const particles = value.toString().split('/')
    return particles.length > 1 ? particles[particles.length - 1] : particles[0]
  }

  return (
    <Paper className={classes.paper}>
      {
        props.action === 'update' && loading
          ? (
            <div className={classes.preloaderWrapper}>
              <Preloader />
            </div>
          )
          : (
          <React.Fragment>
            <Grid className={classes.grid} container alignItems="center">
              <Grid item xs={12}>
                {
                  customProps.formProperties.map(property => property.type === 'select'
                  ? (
                    <React.Fragment key={property.id}>
                      <InputLabel id={`${property.id}-label`}>{`${property.label}${ property.required ? '*' : '' }`}</InputLabel>
                      <Select
                        labelId={`${property.id}-label`}
                        key={property.id}
                        id={property.id}
                        name={property.id}
                        value={formatSelectValue(resource[property.id])}
                        variant="outlined"
                        size={"small"}
                        fullWidth
                        onChange={(e) => setResource({ ...resource, [property.id]: e.target.value })}
                      >
                        {
                          fetchedFields[property.id] && fetchedFields[property.id].map((item) => (
                            <MenuItem key={ item.id } value={ item.id }>{ item[property.itemLabel] }</MenuItem>
                          ))
                        }
                      </Select>
                    </React.Fragment>
                  ): (
                    <TextField
                      key={property.id}
                      name={property.id}
                      value={resource[property.id]}
                      type={property.type || 'text'}
                      label={`${property.label}${ property.required ? '*' : '' }`}
                      variant="outlined"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      className={classes.textField}
                      size={"small"}
                      fullWidth
                      margin="normal"
                      onChange={(e) => setResource({ ...resource, [property.id]: e.target.value })}
                    />
                  ))
                }
              </Grid>
            </Grid>
            <Grid className={classes.actions} container spacing={2} direction="row" alignItems="center" justify="flex-end" item xs={12}>
              <Grid item>
                <Button color="secondary" onClick={customProps.actions.cancelButtonClicked}>Cancel</Button>
              </Grid>
              <Grid item>
              <Button variant="contained" color="primary" onClick={() => customProps.actions.saveButtonClicked(resource)}>Save {customProps.resourceName}</Button>
              </Grid>
            </Grid>
          </React.Fragment>
        )
      }
    </Paper>
  )
}

ResourceForm.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(ResourceFormStyles)(ResourceForm)