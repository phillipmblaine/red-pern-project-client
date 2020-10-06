import React from 'react';
import './AdminHome.css';

type AdminHomeState = {}
type AcceptedProps = {
    sessionToken: string | undefined;
}

// AdminHome can be the AdminPortal
class AdminHome extends React.Component<AcceptedProps, AdminHomeState>{
    render() {
        return (
            <div className='adminHomeMainDiv'>
                <h2>Hello from AdminHome.tsx</h2>
            </div>
        )
    }
}

export default AdminHome;