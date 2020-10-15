import React from 'react';
import APIURL from '../helpers/environment';
import './AdminHome.css';
import { Button } from '@material-ui/core';
import { Grid, Paper } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import AdminHomeDisplay from './AdminHomeDisplay';
import Radium from 'radium';
import { CSSProperties } from '@material-ui/core/styles/withStyles';

type AdminHomeState = {
    fetchedUserData: FetchedUserData;
}
type AcceptedProps = { sessionToken: string | undefined; }

interface FetchedUserData {
    info: UserData;
    message: string;
}

interface UserData {
    id: number | null,
    firstName: string,
    lastName: string,
    username: string,
    trips: TripData[],
    destinations: DestinationData[]
}

interface TripData {
    id: number | null,
    tripName: string,
    tripBeginDate?: string,
    tripEndDate?: string
}

interface DestinationData {
    name: string,
    country?: string
}

const GridStylesOne = withStyles({
    root: {
        flexGrow: 1,
        backgroundColor: '#292032',
        padding: '0.5rem',
        width: '70vw',
        borderRadius: '1rem',
        fontSize: '1.2rem'
    },
    paper: {
        textAlign: 'center',
        paddingTop: '1rem',
        paddingBottom: '1rem'
    }
})(Grid)

const GridStylesTwo = withStyles({
    root: {
        flexGrow: 1,
        backgroundColor: '#302340',
        padding: '0.5rem',
        width: '70vw',
        borderRadius: '1rem',
        fontSize: '1.2rem'
    },
    paper: {
        textAlign: 'center',
        paddingTop: '1rem',
        paddingBottom: '1rem'
    }
})(Grid)

const centering: CSSProperties = { textAlign: 'center', margin: '1rem auto' }
const stylePaperOne: CSSProperties = {
    color: 'whitesmoke',
    backgroundColor: '#46243f',
}

const stylePaperTwo: CSSProperties = {
    color: 'whitesmoke',
    backgroundColor: '#6E7AA9',
}

// AdminHome can be the AdminPortal
class AdminHome extends React.Component<AcceptedProps, AdminHomeState>{
    constructor(props: AcceptedProps) {
        super(props)
        this.state =
        {
            fetchedUserData: {
                info: {
                    id: null,
                    firstName: '',
                    lastName: '',
                    username: '',
                    trips: [],
                    destinations: []
                },
                message: ''
            }
        }
    }

    componentDidMount() {
        console.log('AdminHome.tsx -> componentDidMount.')
    }

    getUser = (): void => {
        console.log('AdminHome.tsx -> getUser.')
        if (this.props.sessionToken !== undefined) {
            fetch(`${APIURL}/user/getuser`, {
                method: 'GET',
                headers: new Headers({
                    'Content-Type': 'application/json',
                    Authorization: this.props.sessionToken
                })
            })
                .then(response => response.json())
                .then((userData: FetchedUserData) => {
                    this.setState({ fetchedUserData: userData })
                })
                .catch((error: Error) => console.log(error))
        }
    }

    userTripMapper = () => {
        if (this.props.sessionToken !== undefined &&
            this.state.fetchedUserData.info.id !== null &&
            this.state.fetchedUserData.info.trips.length !== 0) {
            console.log('AdminHome.tsx -> userTripMapper.')
            return this.state.fetchedUserData.info.trips.map((value: TripData, index: number): (JSX.Element | undefined) => {
                if (value !== null) {
                    console.log(value.id)
                    console.log(value.tripName)
                    console.log(value.tripBeginDate)
                    console.log(value.tripEndDate)
                    return (
                        <GridStylesOne style={centering} container spacing={1}>
                            <GridStylesOne item xs={12}>
                                <Paper style={stylePaperOne}>Trip Name: {value.tripName}</Paper>
                            </GridStylesOne>
                            {
                                value.tripBeginDate !== undefined && value.tripBeginDate !== null

                                    ? <GridStylesOne item xs={6}><Paper style={stylePaperOne}>Begin Date: {value.tripBeginDate}</Paper></GridStylesOne>
                                    : <GridStylesOne item xs={6}><Paper style={stylePaperOne}>Begin Date: N/A</Paper></GridStylesOne>
                            }
                            {
                                value.tripEndDate !== undefined && value.tripEndDate !== null
                                    ? <GridStylesOne item xs={6}><Paper style={stylePaperOne}>End Date: {value.tripEndDate}</Paper></GridStylesOne>
                                    : <GridStylesOne item xs={6}><Paper style={stylePaperOne}>End Date: N/A</Paper></GridStylesOne>
                            }
                        </GridStylesOne>
                    )
                }
            })
        }
    }

    userDestinationMapper = () => {
        if (this.props.sessionToken !== undefined &&
            this.state.fetchedUserData.info.id !== null &&
            this.state.fetchedUserData.info.destinations.length !== 0) {
            console.log('AdminHome.tsx -> userTripMapper.')
            return this.state.fetchedUserData.info.destinations.map((value: DestinationData, index: number): (JSX.Element | undefined) => {
                if (value !== null) {
                    console.log(value.name)
                    console.log(value.country)
                    return (
                        <GridStylesTwo style={centering} container spacing={1}>
                            <GridStylesTwo item xs={12}>
                                <Paper style={stylePaperTwo}>Destination: {value.name}</Paper>
                            </GridStylesTwo>
                            {
                                value.country !== undefined && value.country !== null && value.country !== ''
                                    ? <GridStylesTwo item xs={12}><Paper style={stylePaperTwo}>Country: {value.country}</Paper></GridStylesTwo>
                                    : <GridStylesTwo item xs={12}><Paper style={stylePaperTwo}>Country: N/A</Paper></GridStylesTwo>
                            }
                        </GridStylesTwo >
                    )
                }
            })
        }
    }

    showUser = () => {
        console.log('AdminHome.tsx -> showUser.')
        return (
            this.state.fetchedUserData.info.id !== null
                ? (
                    <div>
                        <h2>Hello, {this.state.fetchedUserData.info.username}</h2>
                        <AdminHomeDisplay
                            userTripMapper={this.userTripMapper}
                            userDestinationMapper={this.userDestinationMapper}
                            tripLength={this.state.fetchedUserData.info.trips.length}
                            destinationLength={this.state.fetchedUserData.info.destinations.length}
                        />
                    </div>
                ) : (
                    console.log('fetchedUserData not available.')
                )
        )
    }

    render() {
        return (
            <div className='adminHomeMainDiv'>
                <h2>Home</h2>
                <Button variant='contained' color='primary' onClick={() => this.getUser()}>&#8595; Show Your User Information &#8595;</Button>
                <br />
                {this.showUser()}
                <br />
                {console.log('fetchedUserData:', this.state.fetchedUserData)}
            </div>
        )
    }
}

export default Radium(AdminHome);