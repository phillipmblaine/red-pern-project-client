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
    root: {
        background: '#993355'
    }
})(Button)

const Login: React.FunctionComponent<AcceptedProps> = (props) => {
    // let loginFailMessageStyling: HTMLElement | null = document.getElementById('loginFailMessage')
    // function loginFailMessageHide() {
    //     if (props.loginAttemptFailed === false && loginFailMessageStyling !== null) {
    //         // console.log(props.loginAttemptFailed)
    //         loginFailMessageStyling.style.display = 'none';
    //     }
    // }

    // function loginFailMessageShow() {
    //     if (props.loginAttemptFailed === true && loginFailMessageStyling !== null)
    //         loginFailMessageStyling.style.display = 'block';
    // }
    // function toggleLoginFailMessage() {
    //     console.log('Login.tsx -> toggleLoginFailMessage.')
    //     if (props.loginAttemptFailed === true) {
    //         loginFailMessageShow()
    //     } else {
    //         loginFailMessageHide()
    //     }
    // }

    function toggleLoginFailMessage() {
        return (
            props.loginAttemptFailed === true
                ? (
                    <div>
                        {/* <p>props.loginAttemptedFailed is true.</p> */}
                        <div id='loginFailMessage'>
                            <p>Login failed. Please try again, or register new user.</p>
                        </div>
                    </div>
                ) : (
                    <div></div>
                    // <div><p>props.loginAttemptFailed is false.</p></div>
                )
        )
    }

    return (
        <div className='loginMainDiv'>
            <h2>Hello from Login.tsx</h2>
            {/* <p>props.loginAttemptedFailed: {props.loginAttemptFailed.toString()}</p> */}
            <form
                onSubmit={props.handleLoginSubmit}
            >
                <label htmlFor="loginUsername"></label><br />
                <TextField
                    type='text'
                    id='loginUsername'
                    name='loginUsername'
                    placeholder='Username'
                    onChange={props.handleUsernameLoginInput}
                    label='Username'
                    variant='outlined'
                    InputProps={{
                        startAdornment: <InputAdornment position="start"><AccountCircleIcon /></InputAdornment>
                    }}
                /><br /><br />

                <label htmlFor="loginPassword"></label><br />
                <TextField
                    type='password'
                    id='loginPassword'
                    name='loginPassword'
                    placeholder='Password'
                    onChange={props.handlePasswordLoginInput}
                    label='Password'
                    variant='outlined'
                    InputProps={{
                        startAdornment: <InputAdornment position="start"><LockIcon /></InputAdornment>
                    }}
                    // inputProps={{ pattern: '[a-g]{1,15}' }}
                /><br /><br />
                {/* <input
                    type='submit'
                    value='Submit'
                /> */}
                <ButtonStyles type='submit' value='Submit' variant='contained'>Submit</ButtonStyles>
            </form>
            {toggleLoginFailMessage()}
        </div >
    )
}

export default Login;