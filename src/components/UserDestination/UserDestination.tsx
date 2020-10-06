import React from 'react';
import APIURL from '../../helpers/environment'
// import './UserDestination.css';

type UserDestinationState = {}
type AcceptedProps = {
    sessionToken: string | undefined;
}

class UserDestination extends React.Component<AcceptedProps, UserDestinationState>{
    getUserDestinations = (): void => {
        console.log('UserDestination.tsx -> getUserDestinations.')
        fetch(`${APIURL}/destination/getalldestinations`), {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }
            .then(response => console.log(response))
    }

    render() {
        return (
            <div className='userDestinationMainDiv'>
                <h2>Hello from UserDestination.tsx</h2>
                <button onClick={() => this.getUserDestinations()}>getUserDestinations</button>
            </div>
        )
    }
}

export default UserDestination;