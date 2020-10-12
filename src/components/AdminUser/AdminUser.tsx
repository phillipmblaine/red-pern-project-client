import React from 'react';
import APIURL from '../../helpers/environment';
import './AdminUser.css';
import { Button } from '@material-ui/core'

type AdminUserState = {}
type AcceptedProps = {
    sessionToken: string | undefined;
}

class AdminUser extends React.Component<AcceptedProps, AdminUserState>{
    getAllUsers = (): void => {
        console.log('AdminUser.tsx -> getAllUsers.')
        if (this.props.sessionToken !== undefined) {
            fetch(`${APIURL}/user/getallusers`, {
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
            <div className='adminUserMainDiv'>
                <h2>Hello from AdminUser.tsx</h2>
                <Button variant='contained' color='primary' onClick={() => this.getAllUsers()}>getAllUsers</Button>
            </div>
        )
    }
}

export default AdminUser;