import React from 'react'
import { Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import FormControl from '@material-ui/core/FormControl'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import withStyles from '@material-ui/core/styles/withStyles'
import CustomizedSnackbar from '../reusable/Snackbar.jsx'
import { hasAuthToken, login } from '../../services/auth'
import LoginStyles from '../../styles/login'

function Login(props) {
    const [success, signalSuccess] = React.useState(false)
    const [error, setError] = React.useState({ active: false, message: '' })
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')

    const loginAction = (e) => {
        e.preventDefault()
        login({ email, password })
        .then((response) => {
            if (response.status === 403) {
                setError({
                    active: true,
                    message: 'Email and password do not match.'
                })
            } else {
                signalSuccess(true)
            }
        })
        .catch((err) => {
            setError({
                active: true,
                message: 'Internal server error.'
            })
        })
    }

    if (hasAuthToken() || success) {
        return (<Redirect to={{ pathname: '/dashboard' }}/>)
    }

    return (
        <main className={props.classes.main}>
            {error.active ? <CustomizedSnackbar severity="error" message={error.message} /> : ''}
            <CssBaseline />
            <Paper className={props.classes.paper}>
                <Avatar className={props.classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <form className={props.classes.form} onSubmit={loginAction} >
                    <FormControl margin="normal" required fullWidth>
                        <InputLabel htmlFor="email">Email Address</InputLabel>
                        <Input id="email" name="email" autoComplete="email" autoFocus value={email} onChange={(e) => setEmail(e.target.value)} />
                    </FormControl>
                    <FormControl margin="normal" required fullWidth>
                        <InputLabel htmlFor="password">Password</InputLabel>
                        <Input name="password" type="password" id="password" autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                    </FormControl>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={props.classes.submit}
                    >
                        Sign in
                    </Button>
                </form>
            </Paper>
        </main>
    )
}

Login.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(LoginStyles)(Login)
