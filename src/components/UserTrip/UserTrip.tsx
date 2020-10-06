import React from 'react';
import APIURL from '../../helpers/environment';
// import './UserTrip.css';

type UserTripState = {}
type AcceptedProps = {
    sessionToken: string | undefined;
}

class UserTrip extends React.Component<AcceptedProps, UserTripState>{
    getUserTrips = (): void => {
        console.log('UserTrip.tsx -> getUserTrips.')
        if (this.props.sessionToken !== undefined) {
            fetch(`${APIURL}/trip/getalltrips`, {
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
            <div className='userTripMainDiv'>
                <h2>Hello from UserTrip.tsx</h2>
                <button onClick={() => this.getUserTrips()}>getUserTrips</button>
            </div>
        )
    }
}

export default UserTrip;