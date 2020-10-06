import React from 'react';
import './AdminUser.css';

type AcceptedProps = {}
type AdminUserState = {}

class AdminUser extends React.Component<AcceptedProps, AdminUserState>{
    render() {
        return (
            <div className='adminUserMainDiv'>
                <h2>Hello from AdminUser.tsx</h2>
            </div>
        )
    }
}

export default AdminUser;