import React from 'react';
import APIURL from '../../helpers/environment';
import './AdminDestination.css';
import { Button } from '@material-ui/core'

type AdminDestinationState = {}
type AcceptedProps = {
    sessionToken: string | undefined;
}

class AdminDestination extends React.Component<AcceptedProps, AdminDestinationState>{
    getAllDestinations = (): void => {
        console.log('AdminDestination.tsx -> getAllDestinations.')
        if (this.props.sessionToken !== undefined) {
            fetch(`${APIURL}/destination/getalldestinations`, {
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
            <div className='adminDestinationMainDiv'>
                <h2>Hello from AdminDestination.tsx</h2>
                <Button variant='contained' color='primary' onClick={() => this.getAllDestinations()}>getAllDestinations</Button>
            </div>
        )
    }
}

export default AdminDestination;