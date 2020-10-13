import React from 'react';
import APIURL from '../helpers/environment';
import './UserHome.css';
import { Grid, Paper } from '@material-ui/core';
import { Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import UserHomeDisplay from './UserHomeDisplay';
import Radium from 'radium';
import { CSSProperties } from '@material-ui/core/styles/withStyles';

type UserHomeState = {
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
        // backgroundColor: '#232020',
        // backgroundColor: '#36243f',
        // backgroundColor: '#272636',
        backgroundColor: '#292032',
        padding: '0.5rem',
        width: '70vw',
        borderRadius: '1rem',
        fontSize: '1.2rem'
    },
    paper: {
        // padding: theme.spacing(2),
        textAlign: 'center',
        paddingTop: '1rem',
        paddingBottom: '1rem'
        // width: '80%'
        // padding: '1rem'
        // color: theme.palette.text.secondary
    }
})(Grid)

const GridStylesTwo = withStyles({
    root: {
        flexGrow: 1,
        // backgroundColor: '#232020',
        // backgroundColor: '#36243f',
        // backgroundColor: '#272636',
        backgroundColor: '#302340',
        padding: '0.5rem',
        width: '70vw',
        borderRadius: '1rem',
        fontSize: '1.2rem'
    },
    paper: {
        // padding: theme.spacing(2),
        textAlign: 'center',
        paddingTop: '1rem',
        paddingBottom: '1rem'
        // width: '80%'
        // padding: '1rem'
        // color: theme.palette.text.secondary
    }
})(Grid)

const centering: CSSProperties = { textAlign: 'center', margin: '1rem auto' }
const stylePaperOne: CSSProperties = {
    color: 'whitesmoke',
    // backgroundColor: '#272636'
    backgroundColor: '#46243f',
}

const stylePaperTwo: CSSProperties = {
    color: 'whitesmoke',
    // backgroundColor: '#272636'
    // backgroundColor: '#46243f',
    // backgroundColor: '#613C49',
    backgroundColor: '#6E7AA9',
}

// let c: CSSProperties = center

class UserHome extends React.Component<AcceptedProps, UserHomeState>{
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
        console.log('UserHome.tsx -> componentDidMount.')
        // this.getUser()
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
            console.log('UserHome.tsx -> userTripMapper.')
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
            console.log('UserHome.tsx -> userTripMapper.')
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
        console.log('UserHome.tsx -> showUser.')
        return (
            this.state.fetchedUserData.info.id !== null
                ? (
                    <div>
                        <h2>Hello, {this.state.fetchedUserData.info.username}</h2>
                        <UserHomeDisplay
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
            <div className='userHomeMainDiv'>
                <h2>Home</h2>
                {/* <Button variant='contained' color='primary' onClick={() => this.getUser()}>getUser</Button> */}
                {/* <Button variant='contained' color='primary' onClick={() => this.userTripMapper()}>Mapper Test</Button> */}
                {/* <Button variant='contained' color='primary' onClick={() => this.getUser()}>getUser</Button> */}
                <Button variant='contained' color='primary' onClick={() => this.getUser()}>&#8595; Show My User Information &#8595;</Button>
                {this.showUser()}
                {console.log('fetchedUserData:', this.state.fetchedUserData)}
            </div>
        )
    }
}

export default Radium(UserHome);