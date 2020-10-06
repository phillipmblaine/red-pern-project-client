import React from 'react';
import './Login.css';
import { withStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';

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
                <label htmlFor="loginUsername">Username: </label><br />
                <input
                    type="text"
                    id="loginUsername"
                    name="loginUsername"
                    placeholder='Username'
                    onChange={props.handleUsernameLoginInput}
                /><br /><br />

                <label htmlFor="loginPassword">Password: </label><br />
                <input
                    type="password"
                    id="loginPassword"
                    name="loginPassword"
                    placeholder='Password'
                    onChange={props.handlePasswordLoginInput}
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