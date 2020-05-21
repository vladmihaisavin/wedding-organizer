import React from 'react'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import { logout } from '../../services/auth'

export default function AvatarMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const logoutAction = () => {
    logout()
    window.location.reload()
  }

  return (
    <div>
      <IconButton color="inherit" style={{padding: 4}} aria-controls="avatar-menu" aria-haspopup="true" onClick={handleClick}>
        <Avatar src="/static/images/avatar/1.jpg" alt="My Avatar" />
      </IconButton>
      <Menu
        id="avatar-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <MenuItem onClick={logoutAction}>Logout</MenuItem>
      </Menu>
    </div>
  )
}