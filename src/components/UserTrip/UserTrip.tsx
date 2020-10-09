import React from 'react';
import APIURL from '../../helpers/environment';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@material-ui/core';
// { MenuItem, withStyles }
import Radium from 'radium';
// for now, the data table seems more approachable. The customized sortable table for stretch ...
import { ColDef } from '@material-ui/data-grid';
// DataGrid, ValueGetterParams
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
// import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import AddLocationIcon from '@material-ui/icons/AddLocation';
// import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
// import PostAddIcon from '@material-ui/icons/PostAdd';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import './UserTrip.css';
// Maybe table is more appealing, with effort I can probably get the sort table working
import UserTripDisplayTable from './UserTripDisplayTable/UserTripDisplayTable';

type UserTripState = {
    // allUserTrips: [TripData | null];
    allUserTrips: TripData[];
    tripData: TripData;
    // rows: any[];
    columns: ColDef[];
    // response: [TripData | null];
    openEditDialog: boolean;
    openDeleteDialog: boolean;
    editDialogData: TripData;
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
        minWidth: 650,
    },
    // aligning not needed since tables have their own align properties
    TableRow: {
        // textAlign: 'center'
        // background: '#232020'
        // color: 'white',
        // fontWeight: 'bold'
    },
    TableCell: {
        textAlign: 'center',
        color: 'white',
        background: 'gray'
    },
    TableHead: {
        backgroundColor: 'gray',
        color: 'white'
    },
    DialogContent: {
        // textAlign: 'center'
        justifyContent: 'center',
        alignItems: 'center'
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
            openEditDialog: false,
            openDeleteDialog: false,
            editDialogData: {
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

    componentDidMount() {
        console.log('UserTrip.tsx => componentDidMount.')
        // this.showTrips()
    }

    componentDidUpdate() {
        console.log('UserTrip.tsx -> componentDidUpdate.')
        // console.log(this.state.allUserTrips)
    }

    allUserTripsMapper = () => {
        if (this.props.sessionToken !== undefined
            && this.state.allUserTrips !== undefined
            && this.state.allUserTrips !== null
            // && this.state.allUserTrips !== [null]
            && Array.isArray(this.state.allUserTrips) === true) {
            console.log('UserTrip.tsx -> tripMapper.')
            // return this.state.allUserTrips.map((value: TripData | null, index: number) => {

            return this.state.allUserTrips.map((value: TripData, index: number): (JSX.Element | undefined) => {
                // console.log(value, index)
                if (value !== null) {
                    console.log('Trip with ID ->', value.id, 'mapped.', this.state.allUserTrips[index])
                    // console.log('numberOfStops:', value.numberOfStops)
                    // console.log('stops:', value.tripBeginDate)
                    // console.log('tripBeginDate:', value.tripEndDate)
                    // console.log('tripEndDate:', value.tripName)
                    // console.log('userId:', value.userId)
                    return (
                        <TableRow key={index}>
                            <TableCell align='right' component='th' scope='row'>{value.id}</TableCell>
                            <TableCell align='right'>{value.tripName}</TableCell>
                            {
                                value.stops !== [] && value.stops !== null && value.stops.length !== null
                                    ? <TableCell align='right'>{value.stops.length}</TableCell>
                                    : <TableCell align='right'>N/A</TableCell>
                            }
                            {
                                value.tripBeginDate !== null
                                    ? <TableCell align='right'>{value.tripBeginDate}</TableCell>
                                    : <TableCell align='right'>N/A</TableCell>
                            }
                            {
                                value.tripEndDate !== null
                                    ? <TableCell align='right'>{value.tripEndDate}</TableCell>
                                    : <TableCell align='right'>N/A</TableCell>
                            }
                            <TableCell align='right'>{value.userId}</TableCell>

                            <TableCell align='right'>
                                <IconButton color='primary' aria-label="editTrip" onClick={this.handleClickEditDialogOpen(value)}><AddLocationIcon /></IconButton>
                            </TableCell>

                            <TableCell align='right'>
                                <IconButton color='secondary' aria-label="delete" onClick={this.handleClickDeleteDialogOpen}><DeleteIcon /></IconButton>
                            </TableCell>
                        </TableRow>
                    )
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

    showTrips = () => {
        return (
            this.state.allUserTrips !== [] && this.state.allUserTrips.length !== 0
                ? (
                    <div>
                        <UserTripDisplayTable
                            openEditDialog={this.state.openEditDialog}
                            openDeleteDialog={this.state.openDeleteDialog}
                            allUserTrips={this.state.allUserTrips}
                            sessionToken={this.props.sessionToken}
                            allUserTripsMapper={this.allUserTripsMapper}
                            handleClickEditDialogOpen={this.handleClickEditDialogOpen}
                            handleEditDialogClose={this.handleEditDialogClose}
                            handleClickDeleteDialogOpen={this.handleClickDeleteDialogOpen}
                            handleDeleteDialogClose={this.handleDeleteDialogClose}
                            editDialogData={this.state.editDialogData}
                            setEditDialogDataState={this.setEditDialogDataState}
                        />
                        {console.log(this.state.allUserTrips)}
                    </div>
                ) : (
                    console.log(this.state.allUserTrips)
                )
        )
    }

    handleClickEditDialogOpen = (a: TripData) => () => {
        this.setState({
            openEditDialog: true,
            editDialogData: a
        })
    }
    handleEditDialogClose = () => {
        this.setState({ openEditDialog: false })
    }
    handleClickDeleteDialogOpen = () => {
        this.setState({ openDeleteDialog: true })
    }
    handleDeleteDialogClose = () => {
        this.setState({ openDeleteDialog: false })
    }

    setEditDialogDataState = (a: TripData) => {
        this.setState({ editDialogData: a })
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
                <Button color='primary' variant='contained' onClick={() => this.allUserTripsMapper()}>allUserTripsMapper Test</Button>
                {/* <DataGrid rows={this.state.rows} columns={this.state.columns} pageSize={5} checkboxSelection /> */}
                {/* {this.showTrips()} */}
                {this.showTrips()}
            </div>
        )
    }
}

export default Radium(UserTrip);