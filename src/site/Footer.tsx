import React from 'react';
import './Footer.css';
import siteLogoOne from './../assets/site-logo-1.png'
import githubLogoOne from './../assets/github-logo-1.svg'

type FooterState = {}
type AcceptedProps = {
    sessionToken: string | undefined;
    clearUserLogin: () => void;
}

class Footer extends React.Component<AcceptedProps, FooterState>{
    render() {
        return (
            <div className='footerMainDiv'>
                <footer>
                    <div className='footerContainer'>
                        <span><img className='githubLogoOne' src={githubLogoOne} alt='github-logo-1' height='25px' width='25px' /><a href="https://github.com/phillipmblaine" target='_blank' rel="noopener noreferrer">Travel Planning App</a></span>
                        <span><a className='linkTwo' href="https://phillipmblaine.github.io/" target='_blank' rel="noopener noreferrer">&copy; Phillip M. Blaine 2020 </a><img className='siteLogoOne' src={siteLogoOne} alt='site-logo-1' width='40px' height='40px' /></span>
                    </div>
                </footer>
            </div>
        )
    }
}

export default Footer;