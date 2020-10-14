import React from 'react';
import './Footer.css';

type FooterState = {}
type AcceptedProps = {
    sessionToken: string | undefined;
    clearUserLogin: () => void;
}

class Footer extends React.Component<AcceptedProps, FooterState>{
    render() {
        return (
            <div className='footerMainDiv'></div>
        )
    }
}

export default Footer;