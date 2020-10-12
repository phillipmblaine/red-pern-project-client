import React from 'react';
import './Auth.css';
import Login from './Login';
import Register from './Register';
import APIURL from '../helpers/environment';
import './Auth.css';

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
        this.setState({
            password: ''
        })
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

    // Login.tsx functions // can I combine the input handlers into one?
    handleUsernameLoginInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
        console.log('Auth -> handleUsernameLoginInput.')
        this.setState({
            username: e.target.value
        })
    }

    handlePasswordLoginInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
        console.log('Auth -> handlePasswordLoginInput.')
        this.setState({
            password: e.target.value
        })
    }

    handleLoginSubmit = (e: React.FormEvent): void => {
        // handleLoginSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        fetch(`${APIURL}/user/login`, {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify({
                user: {
                    username: this.state.username,
                    password: this.state.password
                }
            })
        })
            .then(response => {
                if (response.ok === true) {
                    // console.log('Login response:', response.ok)
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
            .catch((error) => {
                console.log(error)
            })

        // let response: any = await fetch(`${APIURL}/user/login`, {
        //     method: 'POST',
        //     headers: new Headers({
        //         'Content-Type': 'application/json'
        //     }),
        //     body: JSON.stringify({
        //         user: {
        //             username: this.state.username,
        //             password: this.state.password
        //         }
        //     })
        // })
        // if (response.ok === true) {
        //     let data: any = await response.json();
        //     this.props.updateToken(data.sessionToken)
        //     this.props.updateRole(data.role)
        //     this.setState({
        //         loginFetchState: response.ok,
        //         loginAttemptFailed: false
        //     })
        // } else {
        //     this.setState({
        //         loginFetchState: response.ok,
        //         loginAttemptFailed: true
        //     })
        // }
    }


    // show Register.tsx toggle
    // ToggleShowRegister = () => {
    //     this.setState({
    //         showRegister: (!this.state.showRegister)
    //     })
    // }

    // tsr = () => {
    //     return (
    //         this.state.showRegister === true
    //             ? (
    //                 <div><Register
    //                     firstName={this.state.firstName}
    //                     lastName={this.state.lastName}
    //                     username={this.state.username}
    //                     email={this.state.email}
    //                     password={this.state.password}
    //                     updateToken={this.props.updateToken}
    //                     handleFirstNameRegisterInput={this.handleFirstNameRegisterInput}
    //                     handleLastNameRegisterInput={this.handleLastNameRegisterInput}
    //                     handleUsernameRegisterInput={this.handleUsernameRegisterInput}
    //                     handleEmailRegisterInput={this.handleEmailRegisterInput}
    //                     handlePasswordRegisterInput={this.handlePasswordRegisterInput}
    //                     handleRegisterSubmit={this.handleRegisterSubmit} />
    //                     <button onClick={() => this.setState({ showRegister: false })}>Click Me</button></div>
    //             ) : (
    //                 <button onClick={() => this.setState({ showRegister: true })}>Click Me</button>
    //             )
    //     )
    // }

    // handleShowRegister = () => {
    //     // { console.log('Register value', this.state.showRegister) }
    //     return (
    //         this.state.showRegister === true
    //             ? <div><Register
    //                 firstName={this.state.firstName}
    //                 lastName={this.state.lastName}
    //                 username={this.state.username}
    //                 email={this.state.email}
    //                 password={this.state.password}
    //                 updateToken={this.props.updateToken}
    //                 handleFirstNameRegisterInput={this.handleFirstNameRegisterInput}
    //                 handleLastNameRegisterInput={this.handleLastNameRegisterInput}
    //                 handleUsernameRegisterInput={this.handleUsernameRegisterInput}
    //                 handleEmailRegisterInput={this.handleEmailRegisterInput}
    //                 handlePasswordRegisterInput={this.handlePasswordRegisterInput}
    //                 handleRegisterSubmit={this.handleRegisterSubmit} />
    //                 <button onClick={this.ToggleShowRegister}>Close User Registration Form</button></div>
    //             : <button onClick={this.ToggleShowRegister}>New User?</button>
    //     )
    // }

    // Register.tsx functions // can I combine the input handlers into one?
    handleFirstNameRegisterInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
        console.log('Auth -> handleFirstNameRegisterInput.')
        this.setState({
            firstName: e.target.value
        })
    }

    handleLastNameRegisterInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
        console.log('Auth -> handleLastNameRegisterInput.')
        this.setState({
            lastName: e.target.value
        })
    }

    handleUsernameRegisterInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
        console.log('Auth -> handleUsernameRegisterInput.')
        this.setState({
            username: e.target.value
        })
    }

    handleEmailRegisterInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
        console.log('Auth -> handleEmailRegisterInput.')
        this.setState({
            email: e.target.value
        })
    }

    handlePasswordRegisterInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
        console.log('Auth -> handlePasswordRegisterInput.')
        this.setState({
            password: e.target.value
        })
    }

    handleRegisterSubmit = (e: React.FormEvent): void => {
        e.preventDefault();
        fetch(`${APIURL}/user/register`, {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
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
                // console.log(data.role)
            })
    }

    render() {
        return (
            <div className='authMainDiv'>
                {/* <h2>Hello from Auth.tsx</h2> */}
                {/* <p>this.state.loginAttemptFailed: {this.state.loginAttemptFailed.toString()}</p> */}
                <Login
                    username={this.state.username}
                    password={this.state.password}
                    loginAttemptFailed={this.state.loginAttemptFailed}
                    updateToken={this.props.updateToken}
                    handleUsernameLoginInput={this.handleUsernameLoginInput}
                    handlePasswordLoginInput={this.handlePasswordLoginInput}
                    handleLoginSubmit={this.handleLoginSubmit} /><br />
                {/* {this.handleShowRegister()} */}
                {/* <button onClick={this.ToggleShowRegister}>New User?</button> */}
                {/* {this.tsr()} */}
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