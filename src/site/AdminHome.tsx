import React from 'react';
import './AdminHome.css';

type AdminHomeState = {}
type AcceptedProps = {}

// AdminHome can be the AdminPortal
class AdminHome extends React.Component<AcceptedProps, AdminHomeState>{
    
    render() {
        return (
            <div className='adminHomeMainDiv' >
                <h2>Hello from AdminHome.tsx</h2>
                <div className='adminUsersTableDiv'>
                    <h4>Display the user table.</h4>
                </div>
                <div className='adminDestinationsTableDiv'>
                    <h4>Display the destinations table.</h4>
                </div>
                <div className='adminTripsTableDiv'>
                    <h4>Display the trips table.</h4>
                </div>
            </div>
        )
    }
}

export default AdminHome;