import React from 'react';
import './UserNavbar.css';

type UserNavbarState = {}
type AcceptedProps = {
    clearUserLogin: () => void;
    // clearToken: () => void;
    // clearRole: () => void; 
}

class UserNavbar extends React.Component<AcceptedProps, UserNavbarState>{
    render() {
        return (
            <div className='userNavbarMainDiv'>
                <h2>Hello from UserNavbar.tsx</h2>
                <button onClick={this.props.clearUserLogin}>Logout</button>
            </div>
        )
    }
}

export default UserNavbar;