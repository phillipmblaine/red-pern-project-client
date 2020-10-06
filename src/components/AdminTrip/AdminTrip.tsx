import React from 'react';
import './AdminTrip.css';

type AcceptedProps = {}
type AdminTripState = {}

class AdminTrip extends React.Component<AcceptedProps, AdminTripState>{
    render() {
        return (
            <div className='adminTripMainDiv'>
                <h2>Hello from AdminTrip.tsx</h2>
            </div>
        )
    }
}

export default AdminTrip;