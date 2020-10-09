import React from 'react';
import './UserHome.css';

type UserHomeState = {}
type AcceptedProps = {
    sessionToken: string | undefined;
}

class UserHome extends React.Component<AcceptedProps, UserHomeState>{
    render() {
        return (
            <div className='userHomeMainDiv'>
                <h2>Home</h2>
            </div>
        )
    }
}

export default UserHome;