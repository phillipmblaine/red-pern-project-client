import React from 'react';
// import './Header.css';

type HeaderState = {}
type AcceptedProps = {}

class Header extends React.Component<AcceptedProps, HeaderState>{
    render() {
        return (
            <div className='headerMainDiv'>
                <h2>Hello from Header.tsx</h2>
            </div>
        )
    }
}

export default Header;