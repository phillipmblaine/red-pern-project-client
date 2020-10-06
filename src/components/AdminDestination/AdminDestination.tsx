import React from 'react';
import './AdminDestination.css';

type AcceptedProps = {}
type AdminDestinationState = {}

class AdminDestination extends React.Component<AcceptedProps, AdminDestinationState>{
    render() {
        return (
            <div className='adminDestinationMainDiv'>
                <h2>Hello from AdminDestination.tsx</h2>
            </div>
        )
    }
}

export default AdminDestination;