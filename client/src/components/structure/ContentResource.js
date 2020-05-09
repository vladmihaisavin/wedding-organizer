import React from 'react'
import PropTypes from 'prop-types'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Tooltip from '@material-ui/core/Tooltip'
import IconButton from '@material-ui/core/IconButton'
import { withStyles } from '@material-ui/core/styles'
import SearchIcon from '@material-ui/icons/Search'
import RefreshIcon from '@material-ui/icons/Refresh'
import ContentResourceStyles from '../../styles/contentResource'
import EmptyResourceTable from '../structure/EmptyResourceTable'
import Preloader from '../reusable/Preloader'
import ResourceTable from '../structure/ResourceTable'

function Content(props) {
  const { classes, customProps, resources } = props

  return (
    <Paper className={classes.paper}>
      <AppBar className={classes.searchBar} position="static" color="default" elevation={0}>
        <Toolbar>
          <Grid container spacing={2} alignItems="center">
            <Grid item>
              <SearchIcon className={classes.block} color="inherit" />
            </Grid>
            <Grid item xs>
              <TextField
                fullWidth
                placeholder={customProps.labels.searchText}
                InputProps={{
                  disableUnderline: true,
                  className: classes.searchInput
                }}
              />
            </Grid>
            <Grid item>
              <Button variant="contained" color="primary" className={classes.addButton} onClick={customProps.actions.addButtonClicked}>
                { customProps.labels.addButton }
              </Button>
              <Tooltip title="Reload" onClick={customProps.actions.reload}>
                <IconButton>
                  <RefreshIcon className={classes.block} color="inherit" />
                </IconButton>
              </Tooltip>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <div className={resources.loading ? classes.contentWrapper : classes.tableContentWrapper}>
        {
          resources.loading
          ? (<Preloader />)
          : resources.data.length > 0
            ? (<ResourceTable data={resources.data} resourceProperties={customProps.resourceProperties} />)
            : (<EmptyResourceTable resourceName={ customProps.labels.resourceName }/>)
        }
      </div>
    </Paper>
  )
}

Content.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(ContentResourceStyles)(Content)