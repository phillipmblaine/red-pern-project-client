import React from 'react';
import APIURL from '../helpers/environment';
import './AdminHome.css';
import { Button } from '@material-ui/core'

type AdminHomeState = {}
type AcceptedProps = {
    sessionToken: string | undefined;
}

// AdminHome can be the AdminPortal
class AdminHome extends React.Component<AcceptedProps, AdminHomeState>{
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
            <div className='adminHomeMainDiv'>
                <h2>Home</h2>
                <Button variant='contained' color='primary' onClick={() => this.getUser()}>getUser</Button>
            </div>
        )
    }
}

export default AdminHome;