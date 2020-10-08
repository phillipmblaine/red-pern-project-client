import React from 'react';
import APIURL from '../../helpers/environment';
import { Button } from '@material-ui/core'
// import './UserTrip.css';

type UserTripState = {
    allUserTrips: [TripData | null];
    tripData: TripData;
    // response: [TripData | null];
}

type AcceptedProps = {
    sessionToken: string | undefined;
}

interface Response {
    response: [TripData | null];
    // response: TripData[];
}

interface TripData {
    id: number | null;
    tripName: string;
    stops: string[];
    numberOfStops?: number;
    tripBeginDate?: number;
    tripEndDate?: number;
    userId?: number | null;
}

// interface MapTripData {
//     id: number | null;
//     tripName: string;
//     stops: string[];
//     numberOfStops?: number;
//     tripBeginDate?: number;
//     tripEmdDate?: number;
//     userId?: number | null;
// }[]



// interface TripFetchedData TripData[]


class UserTrip extends React.Component<AcceptedProps, UserTripState>{
    constructor(props: AcceptedProps) {
        super(props)
        this.state = {
            allUserTrips: [null],
            // response: null,
            tripData: {
                id: null,
                tripName: '',
                stops: [],
                numberOfStops: 0,
                tripBeginDate: 0,
                tripEndDate: 0,
                userId: null
            }
        }
    }

    allUserTripsMapper = () => {
        if (this.props.sessionToken !== undefined
            && this.state.allUserTrips !== undefined
            && this.state.allUserTrips !== null
            && this.state.allUserTrips !== [null]
            && Array.isArray(this.state.allUserTrips) === true) {
            console.log('UserTrip.tsx -> tripMapper.')
            return this.state.allUserTrips.map((value: TripData | null, index: number) => {
                console.log(value, index)
                if (value !== null) {
                    console.log('Trip with ID ->', value.id)
                    console.log('numberOfStops:', value.numberOfStops)
                    console.log('stops:', value.tripBeginDate)
                    console.log('tripBeginDate:', value.tripEndDate)
                    console.log('tripEndDate:', value.tripName)
                    console.log('userId:', value.userId)
                }
            })
        }
    }

    getUserTrips = (): void => {
        console.log('UserTrip.tsx -> getUserTrips.')
        if (this.props.sessionToken !== undefined) {
            fetch(`${APIURL}/trip/getalltrips`, {
                method: 'GET',
                headers: new Headers({
                    'Content-Type': 'application/json',
                    Authorization: this.props.sessionToken
                })
            })
                .then(response => {
                    // console.log(response)
                    return response.json()
                })
                .then((tripFetchedData: [TripData]) => {
                    // console.log(tripFetchedData)
                    this.setState({ allUserTrips: tripFetchedData })
                })
                .then(() => {
                    if (this.state.allUserTrips !== null
                        && this.state.allUserTrips !== [null]) {
                        console.log(this.state.allUserTrips)
                    }
                })
                .catch(error => console.log(error))
        }
    }
    render() {
        return (
            <div className='userTripMainDiv'>
                <h2>Hello from UserTrip.tsx</h2>
                <Button color='primary' variant='contained' onClick={() => this.getUserTrips()}>getUserTrips Test</Button>
                {/* <Button color='primary' variant='contained' onClick={() => {
                    console.log(typeof (this.state.tripData))
                    console.log(Array.isArray(this.state.allUserTrips))
                }}>tripData Console Log Tests</Button> */}
                <Button color='secondary' variant='contained' onClick={() => this.allUserTripsMapper()}>allUsertripsMapper Test</Button>
            </div>
        )
    }
}

export default UserTrip;