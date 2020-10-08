import React from 'react';
import APIURL from '../../helpers/environment';
import { Button, withStyles } from '@material-ui/core';
import Radium from 'radium';
// for now, the data table seems more approachable. The customized sortable table for stretch ...
import { DataGrid, ColDef, ValueGetterParams } from '@material-ui/data-grid';
import './UserTrip.css';
// Maybe table is more appealing, with effort I can probably get the sort table working
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

type UserTripState = {
    // allUserTrips: [TripData | null];
    allUserTrips: TripData[];
    tripData: TripData;
    // rows: any[];
    columns: ColDef[];
    // response: [TripData | null];
}

type AcceptedProps = {
    sessionToken: string | undefined;
}

// interface Response {
//     // response: [TripData | null];
//     response: TripData[];
// }

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

const styles = {
    table: {
        minWidth: 650
    }
}

class UserTrip extends React.Component<AcceptedProps, UserTripState>{
    constructor(props: AcceptedProps) {
        super(props)
        this.state = {
            allUserTrips: [],
            // response: null,
            tripData: {
                id: null,
                tripName: '',
                stops: [],
                numberOfStops: 0,
                tripBeginDate: 0,
                tripEndDate: 0,
                userId: null
            },
            columns: [
                { field: 'id', headerName: 'Id', type: 'number', width: 70 },
                { field: 'tripName', headerName: 'Trip Name', width: 130 },
                { field: 'stops', headerName: 'Stops', width: 130 },
                { field: 'numberOfStops', headerName: 'Number of Stops', type: 'number', width: 130 },
                { field: 'tripBeginDate', headerName: 'Trip Begin Date', type: 'number', width: 130 },
                { field: 'tripEndDate', headerName: 'Trip End Date', type: 'number', width: 130 },
                { field: 'userId', headerName: 'User Id', type: 'number', width: 70 }
            ],
            // rows: []
        }
    }

    allUserTripsMapper = () => {
        if (this.props.sessionToken !== undefined
            && this.state.allUserTrips !== undefined
            && this.state.allUserTrips !== null
            // && this.state.allUserTrips !== [null]
            && Array.isArray(this.state.allUserTrips) === true) {
            console.log('UserTrip.tsx -> tripMapper.')
            // return this.state.allUserTrips.map((value: TripData | null, index: number) => {

            return this.state.allUserTrips.map((value: TripData, index: number) => {
                // console.log(value, index)
                if (value !== null) {
                    console.log('Trip with ID ->', value.id, 'mapped.')
                    // console.log('numberOfStops:', value.numberOfStops)
                    // console.log('stops:', value.tripBeginDate)
                    // console.log('tripBeginDate:', value.tripEndDate)
                    // console.log('tripEndDate:', value.tripName)
                    // console.log('userId:', value.userId)
                    return (

                        <TableRow key={index}>
                            <TableCell component="th" scope="row">{value.id}</TableCell>
                            <TableCell align="right">{value.tripName}</TableCell>
                            <TableCell align="right">{value.stops}</TableCell>
                            <TableCell align="right">{value.tripBeginDate}</TableCell>
                            <TableCell align="right">{value.tripEndDate}</TableCell>
                            <TableCell align="right">{value.userId}</TableCell>
                        </TableRow>
                    )
                }
            })
        }
    }

    // createDataTableRow = (
    //     id: number | null,
    //     tripName: string,
    //     stops: string[],
    //     numberOfStops?: number,
    //     tripBeginDate?: number,
    //     tripEndDate?: number,
    //     userId?: number | null): TripData => {
    //     return { id, tripName, stops, numberOfStops, tripBeginDate, tripEndDate, userId }
    // }

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
                // .then((tripFetchedData: [TripData]) => {
                .then((tripFetchedData: TripData[]) => {
                    // console.log(tripFetchedData)
                    this.setState({ allUserTrips: tripFetchedData })
                    // this.setState({ rows: tripFetchedData })
                })
                .then(() => {
                    if (this.state.allUserTrips !== null)
                    // && this.state.allUserTrips !== [null])
                    {
                        console.log(this.state.allUserTrips)
                    }
                })
                .catch(error => console.log(error))
        }
    }
    render() {
        return (
            <div className='userTripMainDiv'>
                {/* <h2>Hello from UserTrip.tsx</h2> */}
                <h2>Your Trips</h2>
                <Button color='primary' variant='contained' onClick={() => this.getUserTrips()}>getUserTrips Test</Button>
                {/* <Button color='primary' variant='contained' onClick={() => {
                    console.log(typeof (this.state.tripData))
                    console.log(Array.isArray(this.state.allUserTrips))
                }}>tripData Console Log Tests</Button> */}
                <Button color='primary' variant='contained' onClick={() => this.allUserTripsMapper()}>allUsertripsMapper Test</Button>
                {/* <DataGrid rows={this.state.rows} columns={this.state.columns} pageSize={5} checkboxSelection /> */}
                <TableContainer component={Paper}>
                    <Table style={styles.table} aria-label='simple table'>
                        <TableHead>
                            <TableRow>
                                <TableCell align='right'>id</TableCell>
                                <TableCell align='right'>TripName</TableCell>
                                <TableCell align='right'>stops</TableCell>
                                <TableCell align='right'>tripBeginDate</TableCell>
                                <TableCell align='right'>tripEndDate</TableCell>
                                <TableCell align='right'>userId</TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {/* if using basic table, map here */}
                            {this.allUserTripsMapper()}
                        </TableBody>

                    </Table>
                </TableContainer>
            </div>
        )
    }
}

export default Radium(UserTrip);