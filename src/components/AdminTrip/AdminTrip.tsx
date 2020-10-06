import React from 'react';
import APIURL from '../../helpers/environment';
import './AdminTrip.css';

type AdminTripState = {}
type AcceptedProps = {
    sessionToken: string | undefined;
}

class AdminTrip extends React.Component<AcceptedProps, AdminTripState>{
    getAllTrips = (): void => {
        console.log('AdminTrip.tsx -> getAllTrips.')
        if (this.props.sessionToken !== undefined) {
            fetch(`${APIURL}/trip/getalltrips`, {
                method: 'GET',
                headers: new Headers({
                    'Content-Type': 'application/json',
                    Authorization: this.props.sessionToken
                })
            })
                .then(response => response.json())
                .then(data => console.log(data))
                .catch(error => console.log(error))
        }
    }
    render() {
        return (
            <div className='adminTripMainDiv'>
                <h2>Hello from AdminTrip.tsx</h2>
                <button onClick={() => this.getAllTrips()}>getAllTrips</button>
            </div>
        )
    }
}

export default AdminTrip;