import React from 'react';
// import './UserTrip.css';

type UserTripState = {}
type AcceptedProps = {
    sessionToken: string | undefined;
}

class UserTrip extends React.Component<AcceptedProps, UserTripState>{
    render() {
        return (
            <div className='userTripMainDiv'>
                <h2>Hello from UserTrip.tsx</h2>
            </div>
        )
    }
}

export default UserTrip;