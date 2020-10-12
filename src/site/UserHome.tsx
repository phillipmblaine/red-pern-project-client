import React from 'react';
import APIURL from '../helpers/environment';
import './UserHome.css';
import { Button } from '@material-ui/core';

type UserHomeState = {}
type AcceptedProps = { sessionToken: string | undefined; }

class UserHome extends React.Component<AcceptedProps, UserHomeState>{
    getUser = (): void => {
        console.log('AdminHome.tsx -> getUser.')
        if (this.props.sessionToken !== undefined) {
            fetch(`${APIURL}/user/getuser`, {
                method: 'GET',
                headers: new Headers({
                    'Content-Type': 'application/json',
                    Authorization: this.props.sessionToken
                })
            })
                .then(response => response.json())
                .then(data => console.log(data))
                .catch(error => console.log(error))
        }
    }
    render() {
        return (
            <div className='userHomeMainDiv'>
                <h2>Home</h2>
                <Button variant='contained' color='primary' onClick={() => this.getUser()}>getUser</Button>
            </div>
        )
    }
}

export default UserHome;