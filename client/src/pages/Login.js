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
import httpClient from '../httpClient'
import CustomizedSnackbar from '../components/reusable/Snackbar'
import { isTokenValid } from '../auth/utils'
import LoginStyles from '../styles/login'

class SignIn extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            success: false,
            errors: false,
            errorMessage: '',
            email: '',
            password: ''
        }
    }

    signalError = (message) => {
        this.setState({ 
            errors: true,
            errorMessage: message
        })
    }

    signalSuccess = () => {
        this.setState({ 
            success: true
        })
    }

    login = (e) => {
        e.preventDefault()
        httpClient.post('/accounts/login', {
            email: this.state.email,
            password: this.state.password
        })
        .then((response) => {
            console.log(response)
            if (response.status === 403) {
                this.signalError('Email and password do not match.')
            } else {
                localStorage.setItem('token', response.data.token)
                this.signalSuccess()
            }
        })
        .catch((error) => {
            this.signalError('Internal server error.')
        })
    }

    render() {
        if (isTokenValid() || this.state.success) {
            return (<Redirect to={{ pathname: '/dashboard' }}/>)
        }
        return (
            <main className={this.props.classes.main}>
                {this.state.errors ? <CustomizedSnackbar severity="error" message={this.state.errorMessage} /> : ''}
                <CssBaseline />
                <Paper className={this.props.classes.paper}>
                    <Avatar className={this.props.classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <form className={this.props.classes.form} onSubmit={this.login} >
                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="email">Email Address</InputLabel>
                            <Input id="email" name="email" autoComplete="email" autoFocus value={this.state.email} onChange={(e) => {this.setState({email: e.target.value})}} />
                        </FormControl>
                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="password">Password</InputLabel>
                            <Input name="password" type="password" id="password" autoComplete="current-password" value={this.state.password} onChange={(e) => {this.setState({password: e.target.value})}}/>
                        </FormControl>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={this.props.classes.submit}
                        >
                            Sign in
                        </Button>
                    </form>
                </Paper>
            </main>
        )
    }
}

SignIn.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(LoginStyles)(SignIn)
