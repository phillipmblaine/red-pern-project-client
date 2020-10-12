import React from 'react';
import './Login.css';
import { withStyles } from '@material-ui/core/styles';
import { Button, InputAdornment, TextField } from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import LockIcon from '@material-ui/icons/Lock';

type AcceptedProps = {
    username: string;
    password: string;
    loginAttemptFailed: boolean;
    updateToken: (newToken: string) => void;
    handleUsernameLoginInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handlePasswordLoginInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleLoginSubmit: (e: React.FormEvent) => void;
}

const ButtonStyles = withStyles({
    root: { background: '#993355' }
})(Button)

const TextFieldStyles = { width: '40vw' }

const Login: React.FunctionComponent<AcceptedProps> = (props) => {
    function toggleLoginFailMessage() {
        return (
            props.loginAttemptFailed === true
                ? (
                    <div>
                        <div id='loginFailMessage'>
                            <p>Login failed. Please try again, or register new user.</p>
                        </div>
                    </div>
                ) : (
                    <div></div>
                )
        )
    }

    return (
        <div className='loginMainDiv'>
            <h2>Welcome</h2>
            <h3>Login</h3>
            <form onSubmit={props.handleLoginSubmit}>
                <label htmlFor="loginUsername"></label><br />
                <TextField
                    required
                    type='text'
                    id='loginUsername'
                    name='loginUsername'
                    placeholder='Username'
                    label='Username'
                    variant='outlined'
                    autoComplete='off'
                    onChange={props.handleUsernameLoginInput}
                    style={TextFieldStyles}
                    InputProps={{
                        startAdornment: <InputAdornment position="start"><AccountCircleIcon /></InputAdornment>
                    }}
                /><br /><br />

                <label htmlFor="loginPassword"></label><br />
                <TextField
                    required
                    type='password'
                    id='loginPassword'
                    name='loginPassword'
                    placeholder='Password'
                    label='Password'
                    variant='outlined'
                    style={TextFieldStyles}
                    onChange={props.handlePasswordLoginInput}
                    InputProps={{
                        startAdornment: <InputAdornment position="start"><LockIcon /></InputAdornment>
                    }}
                /><br /><br />

                <ButtonStyles type='submit' value='Submit' variant='contained'>Submit</ButtonStyles>
            </form>
            {toggleLoginFailMessage()}
        </div >
    )
}

export default Login;