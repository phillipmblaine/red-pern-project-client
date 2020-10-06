import React from 'react';

type UserHomeState = {}
type AcceptedProps = {
    sessionToken: string | undefined;
}

class UserHome extends React.Component<AcceptedProps, UserHomeState>{
    render() {
        return (
            <div className='userHomeMainDiv'>
                <h2>Hello from UserHome.tsx</h2>
            </div>
        )
    }
}

export default UserHome;