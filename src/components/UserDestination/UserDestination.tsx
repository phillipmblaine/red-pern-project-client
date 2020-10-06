import React from 'react';
import APIURL from '../../helpers/environment';
// import './UserDestination.css';

type UserDestinationState = {}
type AcceptedProps = {
    sessionToken: string | undefined;
}

class UserDestination extends React.Component<AcceptedProps, UserDestinationState>{
    getUserDestinations = (): void => {
        console.log('UserDestination.tsx -> getUserDestinations.')
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
            <div className='userDestinationMainDiv'>
                {/* {this.props.sessionToken} */}
                <h2>Hello from UserDestination.tsx</h2>
                <button onClick={() => this.getUserDestinations()}>getUserDestinations</button>
            </div>
        )
    }
}

export default UserDestination;