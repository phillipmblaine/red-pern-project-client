import React from 'react';
import './Footer.css';

type FooterState = {}
type AcceptedProps = {}

class Footer extends React.Component<AcceptedProps, FooterState>{
    render() {
        return (
            <div className='footerMainDiv'>
                {/* <h2>Hello from Footer.tsx</h2> */}
            </div>
        )
    }
}

export default Footer;