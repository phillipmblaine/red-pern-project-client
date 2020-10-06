import React from 'react';
// import './Home.css';

type HomeState = {}
type AcceptedProps = {}

class Home extends React.Component<AcceptedProps, HomeState>{
    render() {
        return (
            <div className='homeMainDiv'>
                <h2>Hello from Home.tsx</h2>
            </div>
        )
    }
}

export default Home;