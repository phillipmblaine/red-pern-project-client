import React from 'react';
import './Register.css';
import { withStyles } from '@material-ui/core/styles';
import { Button, TextField } from '@material-ui/core';

type AcceptedProps = {
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    password: string;
    updateToken: (newToken: string) => void
    handleFirstNameRegisterInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleLastNameRegisterInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleUsernameRegisterInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleEmailRegisterInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handlePasswordRegisterInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleRegisterSubmit: (e: React.FormEvent) => void;
}

const ButtonStyles = withStyles({
    root: {
        background: '#339977'
    }
})(Button)

const Register: React.FunctionComponent<AcceptedProps> = (props) => {
    let passwordMessageStyling: HTMLElement | null = document.getElementById('passwordMessage')
    // let passwordInput: unknown = document.getElementById('registerPassword')
    let passwordInput: HTMLElement | null = document.getElementById('registerPassword')

    function onFocusPasswordMessageStyling() {
        if (passwordMessageStyling !== null) {
            passwordMessageStyling.style.display = 'block'
        }
    }

    function onBlurPasswordMessageStyling() {
        if (passwordMessageStyling !== null) {
            passwordMessageStyling.style.display = 'none'
        }
    }

    function validatePasswordFormat() {
        if (passwordInput instanceof HTMLInputElement) {
            // console.log(passwordInput.nodeName)
            let lowercaseCheck: any = document.getElementById('passwordLowercaseLetter')
            let lowercaseLetters: RegExp = /[a-z]/g;
            if (passwordInput !== null && lowercaseCheck !== null) {
                if (passwordInput.value.match(lowercaseLetters)) {
                    lowercaseCheck.classList.remove('invalid')
                    lowercaseCheck.classList.add('valid')
                } else {
                    lowercaseCheck.classList.remove('valid')
                    lowercaseCheck.classList.add('invalid')
                }
            }

            let uppercaseLetters: RegExp = /[A-Z]/g;
            let uppercaseCheck: HTMLElement | null = document.getElementById('passwordUppercaseLetter')
            if (passwordInput !== null && uppercaseCheck !== null) {
                if (passwordInput.value.match(uppercaseLetters)) {
                    uppercaseCheck.classList.remove('invalid')
                    uppercaseCheck.classList.add('valid')
                } else {
                    uppercaseCheck.classList.remove('valid')
                    uppercaseCheck.classList.add('invalid')
                }
            }

            let numbers: RegExp = /[0-9]/g;
            let numberCheck: HTMLElement | null = document.getElementById('passwordNumber')
            if (passwordInput != null && numberCheck !== null) {
                if (passwordInput.value.match(numbers)) {
                    numberCheck.classList.remove('invalid')
                    numberCheck.classList.add('valid')
                } else {
                    numberCheck.classList.remove('valid')
                    numberCheck.classList.add('invalid')
                }
            }

            let lengthCheck: HTMLElement | null = document.getElementById('passwordLength')
            if (passwordInput !== null && lengthCheck !== null) {
                if (passwordInput.value.length >= 8) {
                    lengthCheck.classList.remove('invalid')
                    lengthCheck.classList.add('valid')
                } else {
                    lengthCheck.classList.remove('valid')
                    lengthCheck.classList.add('invalid')
                }
            }
        }
    }

    return (
        <div className='registerMainDiv'>
            <h2>Hello from Register.tsx</h2>
            <form onSubmit={props.handleRegisterSubmit}>
                <label htmlFor='firstName'></label><br />
                <TextField
                    type='text'
                    id='firstName'
                    name='firstName'
                    placeholder='First Name'
                    onChange={props.handleFirstNameRegisterInput}
                    required
                    label='First Name'
                    variant='outlined'
                /><br /><br />

                <label htmlFor='lastName'></label><br />
                <TextField
                    type='text'
                    id='lastName'
                    name='lastName'
                    placeholder='Last Name'
                    onChange={props.handleLastNameRegisterInput}
                    required
                    label='Last Name'
                    variant='outlined'
                /><br /><br />

                <label htmlFor='registerUsername'></label><br />
                <TextField
                    type='text'
                    id='registerUsername'
                    name='registerUsername'
                    placeholder='Username'
                    onChange={props.handleUsernameRegisterInput}
                    required
                    label='Username'
                    variant='outlined'
                /><br /><br />

                <label htmlFor='registerEmail'></label><br />
                <TextField
                    type='registerEmail'
                    id='registerEmail'
                    name='registerEmail'
                    placeholder='email@email.com'
                    onChange={props.handleEmailRegisterInput}
                    // pattern='[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$'
                    title='Please use a valid email address format: example@example.com'
                    required
                    label='Email'
                    variant='outlined'
                    inputProps={{ pattern: '[a-z0-9._%+-]+@[a-z0-9.-]+[a-z]{2,}$' }}
                /><br /><br />

                <label htmlFor='registerPassword'></label><br />
                <TextField
                    type='password'
                    id='registerPassword'
                    name='registerPassword'
                    // pattern='(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}'
                    title='Password must contain: one number, one uppercase letter, one lowercase letter, at least 8 or more characters'
                    placeholder='Password'
                    onChange={props.handlePasswordRegisterInput}
                    onFocus={onFocusPasswordMessageStyling}
                    onBlur={onBlurPasswordMessageStyling}
                    onKeyUp={validatePasswordFormat}
                    variant='outlined'
                    label='Password'
                    inputProps={{ pattern: '(?=.*)(?=.*[a-z])(?=.*[A-Z]).{8,}' }}
                    required
                />
                <div id='passwordMessage'>
                    <h5>Password must contain:</h5>
                    <p id='passwordLowercaseLetter' className='invalid'>One lowercase letter</p>
                    <p id='passwordUppercaseLetter' className='invalid'>One uppercase letter</p>
                    <p id='passwordNumber' className='invalid'>One number</p>
                    <p id='passwordLength' className='invalid'>At least 8 characters in length</p>
                </div>

                <br /><br />

                <ButtonStyles type='submit' value='Submit' variant='contained'>Submit</ButtonStyles>
            </form>
        </div>
    )
}

export default Register;