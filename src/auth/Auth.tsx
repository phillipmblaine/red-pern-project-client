import React from 'react';
import './Auth.css';
import Login from './Login';
import Register from './Register';
import APIURL from '../helpers/environment';
import './Auth.css';
import { Redirect } from 'react-router-dom';

type AuthState = {
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    password: string;
    showRegister: boolean;
    loginFetchState: boolean;
    loginAttemptFailed: boolean;
}

type AcceptedProps = {
    updateToken: (newToken: string) => void;
    updateRole: (newRole: string) => void;
    role: string;
    sessionToken: string | undefined;
}

class Auth extends React.Component<AcceptedProps, AuthState> {
    constructor(props: AcceptedProps) {
        super(props)
        this.state = {
            firstName: '',
            lastName: '',
            username: '',
            email: '',
            password: '',
            showRegister: false,
            loginFetchState: false,
            loginAttemptFailed: false
        }
    }

    componentDidMount() {
        console.log('Auth.tsx => componentDidMount.')
        this.setState({ password: '' })
    }

    componentDidUpdate() {
        if (this.state.loginAttemptFailed === true && this.state.loginFetchState === false) {
            console.log('loginFetchState:', this.state.loginFetchState)
            console.log('loginAttemptFailed:', this.state.loginAttemptFailed)
        };
        if (this.state.showRegister === !this.state.showRegister) {
            console.log('showRegister state changed')
        }
    }

    // Login.tsx functions
    handleUsernameLoginInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
        console.log('Auth -> handleUsernameLoginInput.')
        this.setState({ username: e.target.value })
    }

    handlePasswordLoginInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
        console.log('Auth -> handlePasswordLoginInput.')
        this.setState({ password: e.target.value })
    }

    handleLoginSubmit = (e: React.FormEvent): void => {
        e.preventDefault();
        fetch(`${APIURL}/user/login`, {
            method: 'POST',
            headers: new Headers({ 'Content-Type': 'application/json' }),
            body: JSON.stringify({
                user: {
                    username: this.state.username,
                    password: this.state.password
                }
            })
        })
            .then(response => {
                if (response.ok === true) {
                    return response.json()
                        .then(data => {
                            this.props.updateToken(data.sessionToken)
                            this.props.updateRole(data.role)
                            this.setState({
                                loginFetchState: response.ok,
                                loginAttemptFailed: false
                            })
                        })
                } else {
                    this.setState({
                        loginFetchState: response.ok,
                        loginAttemptFailed: true
                    })
                }
            })
            .catch((error) => { console.log(error) })
    }

    // Register.tsx functions
    handleFirstNameRegisterInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
        console.log('Auth -> handleFirstNameRegisterInput.')
        this.setState({ firstName: e.target.value })
    }

    handleLastNameRegisterInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
        console.log('Auth -> handleLastNameRegisterInput.')
        this.setState({ lastName: e.target.value })
    }

    handleUsernameRegisterInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
        console.log('Auth -> handleUsernameRegisterInput.')
        this.setState({ username: e.target.value })
    }

    handleEmailRegisterInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
        console.log('Auth -> handleEmailRegisterInput.')
        this.setState({ email: e.target.value })
    }

    handlePasswordRegisterInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
        console.log('Auth -> handlePasswordRegisterInput.')
        this.setState({ password: e.target.value })
    }

    handleRegisterSubmit = (e: React.FormEvent): void => {
        e.preventDefault();
        fetch(`${APIURL}/user/register`, {
            method: 'POST',
            headers: new Headers({ 'Content-Type': 'application/json' }),
            body: JSON.stringify({
                user: {
                    firstName: this.state.firstName,
                    lastName: this.state.lastName,
                    username: this.state.username,
                    email: this.state.email,
                    password: this.state.password,
                    role: 'user'
                }
            })
        })
            .then(response => response.json())
            .then(data => {
                this.props.updateToken(data.sessionToken)
                this.props.updateRole('user')
            })
    }

    render() {
        return (
            <div className='authMainDiv'>
                {
                    this.props.role === 'admin' && this.props.sessionToken !== undefined
                        ? <Redirect to='/adminhome' /> : <Redirect to='/' />
                }
                <Login
                    username={this.state.username}
                    password={this.state.password}
                    loginAttemptFailed={this.state.loginAttemptFailed}
                    updateToken={this.props.updateToken}
                    handleUsernameLoginInput={this.handleUsernameLoginInput}
                    handlePasswordLoginInput={this.handlePasswordLoginInput}
                    handleLoginSubmit={this.handleLoginSubmit} /><br />
                <Register
                    firstName={this.state.firstName}
                    lastName={this.state.lastName}
                    username={this.state.username}
                    email={this.state.email}
                    password={this.state.password}
                    updateToken={this.props.updateToken}
                    handleFirstNameRegisterInput={this.handleFirstNameRegisterInput}
                    handleLastNameRegisterInput={this.handleLastNameRegisterInput}
                    handleUsernameRegisterInput={this.handleUsernameRegisterInput}
                    handleEmailRegisterInput={this.handleEmailRegisterInput}
                    handlePasswordRegisterInput={this.handlePasswordRegisterInput}
                    handleRegisterSubmit={this.handleRegisterSubmit} />
            </div>
        )
    }
}

export default Auth;