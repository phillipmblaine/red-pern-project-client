import React from 'react';
import APIURL from '../../helpers/environment';
import { Button, Snackbar, TableCell, TableRow } from '@material-ui/core';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import Radium from 'radium';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import AddLocationIcon from '@material-ui/icons/AddLocation';
import './UserTrip.css';
import UserTripDisplay from './UserTripDisplay/UserTripDisplay';
// for now, the data table seems more approachable. The customized sortable table for stretch ...
// { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Paper, Table, TableBody, TableContainer, TableHead, TextField }
// { MenuItem, withStyles }
// import { ColDef } from '@material-ui/data-grid';
// DataGrid, ValueGetterParams
// import OpenInNewIcon from '@material-ui/icons/OpenInNew';
// import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
// import PostAddIcon from '@material-ui/icons/PostAdd';
// import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
// Maybe table is more appealing, with effort I can probably get the sort table working

type UserTripState = {
    allUserTrips: TripData[];
    tripData: TripData;
    openEditDialog: boolean;
    openDeleteDialog: boolean;
    openDeletedAlert: boolean;
    openUpdatedAlert: boolean;
    editDialogData: TripData;
    emptyEditDialogData: TripData;
    updateTripName: string; // draw from the already-created editDialogData instead of dedicated values like this?
    updateStops: string[];
    updateNumberOfStops: number;
    updateTripBeginDate: string; // looks like string is what i need to use for date?
    updateTripEndDate: string;
    createTripName: string;
    createStops: string[];
    createNumberOfStops: number;
    createTripBeginDate: number;
    createTripEndDate: number;
    // allUserTrips: [TripData | null];
    // rows: any[];
    // columns: ColDef[];
    // response: [TripData | null];
}

type AcceptedProps = {
    sessionToken: string | undefined;
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

class UserTrip extends React.Component<AcceptedProps, UserTripState>{
    constructor(props: AcceptedProps) {
        super(props)
        this.state = {
            allUserTrips: [],
            tripData: {
                id: null,
                tripName: '',
                stops: [],
                numberOfStops: 0,
                tripBeginDate: 0,
                tripEndDate: 0,
                userId: null
            },
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
            },
            emptyEditDialogData: {
                id: null,
                tripName: '',
                stops: [],
                numberOfStops: 0,
                tripBeginDate: 0,
                tripEndDate: 0,
                userId: null,
            },
            openDeletedAlert: false,
            openUpdatedAlert: false,
            updateTripName: '',
            updateStops: [],
            updateNumberOfStops: 0,
            updateTripBeginDate: '',
            updateTripEndDate: '',
            createTripName: '',
            createStops: [],
            createNumberOfStops: 0,
            createTripBeginDate: 0,
            createTripEndDate: 0,
            // columns: [
            //     { field: 'id', headerName: 'Id', type: 'number', width: 70 },
            //     { field: 'tripName', headerName: 'Trip Name', width: 130 },
            //     { field: 'stops', headerName: 'Stops', width: 130 },
            //     { field: 'numberOfStops', headerName: 'Number of Stops', type: 'number', width: 130 },
            //     { field: 'tripBeginDate', headerName: 'Trip Begin Date', type: 'number', width: 130 },
            //     { field: 'tripEndDate', headerName: 'Trip End Date', type: 'number', width: 130 },
            //     { field: 'userId', headerName: 'User Id', type: 'number', width: 70 }
            // ],
            // rows: []
        }
    }

    componentDidMount() { console.log('UserTrip.tsx => componentDidMount.') }
    componentDidUpdate() { console.log('UserTrip.tsx -> componentDidUpdate.') }

    // ******************** USER TRIP MAPPER ******************** //
    allUserTripsMapper = () => {
        if (this.props.sessionToken !== undefined
            && this.state.allUserTrips !== undefined
            && this.state.allUserTrips !== null
            && Array.isArray(this.state.allUserTrips) === true) {
            console.log('UserTrip.tsx -> tripMapper.')
            return this.state.allUserTrips.map((value: TripData, index: number): (JSX.Element | undefined) => {
                if (value !== null) {
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
                                <IconButton color='secondary' aria-label="delete" onClick={this.handleClickDeleteDialogOpen(value)}><DeleteIcon /></IconButton>
                            </TableCell>
                        </TableRow>
                    )
                }
            })
        }
    }

    showTrips = () => {
        return (
            this.state.allUserTrips !== [] && this.state.allUserTrips.length !== 0
                ? (
                    <div>
                        <UserTripDisplay
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
                            handleDeleteTrip={this.handleDeleteTrip}
                            handleUpdateTripNameInput={this.handleUpdateTripNameInput}
                            handleUpdateTripBeginDateInput={this.handleUpdateTripBeginDateInput}
                            handleUpdateTripEndDateInput={this.handleUpdateTripEndDateInput}
                            handleUpdateTrip={this.handleUpdateTrip} />
                    </div>
                ) : (
                    console.log(this.state.allUserTrips)
                )
        )
    }

    // ******************** HANDLERS AND RELATED FUNCTIONS ******************** //

    handleClickEditDialogOpen = (a: TripData) => () => {
        console.log('UserTrip.tsx -> handleClickEditDialogOpen.')
        this.setState({
            openEditDialog: true,
            editDialogData: a
        })
    }

    handleClickDeleteDialogOpen = (a: TripData) => () => {
        console.log('UserTrip.tsx -> handleClickDeleteDialogOpen.')
        this.setState({
            openDeleteDialog: true,
            editDialogData: a
        })
    }

    handleEditDialogClose = () => {
        console.log('UserTrip.tsx -> handleEditDialogClose.')
        this.setState({ openEditDialog: false })
    }

    handleDeleteDialogClose = () => {
        console.log('UserTrip.tsx -> handleDeleteDialogClose.')
        this.setState({ openDeleteDialog: false })
    }

    handleDeleteTrip = (b: any) => () => {
        console.log('UserTrip.tsx -> handleDeleteTrip.')
        this.deleteTrip(b)
        this.setState({
            editDialogData: this.state.emptyEditDialogData,
            openDeleteDialog: false
        })
    }

    TripDeletedAlert(props: AlertProps) {
        console.log('UserTrip.tsx -> TripDeletedAlert.')
        return <MuiAlert elevation={6} variant="filled" {...props} />;
    }

    handleUpdateTripNameInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
        console.log('UserTrip.tsx -> handleUpdateTripNameInput.')
        this.setState({
            updateTripName: e.target.value
        })
    }

    handleUpdateTripBeginDateInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
        console.log('UserTrip.tsx -> handleUpdateTripBeginDateInput.')
        this.setState({
            updateTripBeginDate: e.target.value
        })
    }

    handleUpdateTripEndDateInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
        console.log('UserTrip.tsx -> handleUpdateTripEndDateInput.')
        this.setState({
            updateTripEndDate: e.target.value
        })
    }

    handleUpdateTrip = (c: any) => () => {
        console.log('UserTrip.tsx -> handleUpdateTrip.')
        this.updateTrip(c)
        this.setState({
            editDialogData: this.state.emptyEditDialogData,
            openEditDialog: false
        })
    }

    TripUpdatedAlert(props: AlertProps) {
        console.log('UserTrip.tsx -> TripUpdatedAlert.')
        return <MuiAlert elevation={6} variant="filled" {...props} />;
    }

    handleDeletedAlertOpen = () => { this.setState({ openDeletedAlert: true }) }
    handleDeletedAlertClose = () => { this.setState({ openDeletedAlert: false }) }
    handleUpdatedAlertOpen = () => { this.setState({ openUpdatedAlert: true }) }
    handleUpdatedAlertClose = () => { this.setState({ openUpdatedAlert: false }) }

    // ******************** CREATE, READ, UPDATE, DELETE TRIPS ******************** //
    // C (POST) //
    createTrip = () => {
        console.log('UserTrip.tsx -> createTrip.tsx.')
        if (this.props.sessionToken !== undefined) {
            fetch(`${APIURL}/trip/create`, {
                method: 'POST',
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'Authorization': this.props.sessionToken,
                }),
                body: JSON.stringify(
                    {
                        trip: {
                            tripName: this.state.createTripName,
                            stops: this.state.createStops,
                            numberOfStops: this.state.createNumberOfStops,
                            tripBeginDate: this.state.createTripBeginDate,
                            tripEndDate: this.state.createTripEndDate
                        }
                    }
                )
            })
                .then(response => {
                    if (response.ok === true) {
                        return response.json()
                            .then(createdData => {
                                console.log('Trip created.')
                                console.log('createdData:', createdData)
                            })
                    } else {
                        console.log('Trip not created.')
                    }
                })
                .catch((error: Error) => console.log(error))
        }
    }

    // R (GET) //
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
                .then(response => response.json())
                .then((tripFetchedData: TripData[]) => {
                    this.setState({ allUserTrips: tripFetchedData })
                })
                .then(() => {
                    if (this.state.allUserTrips !== null) { console.log(this.state.allUserTrips) }
                })
                .catch(error => console.log(error))
        }
    }

    // U (PUT) //
    updateTrip = (updateTripId: any) => {
        console.log('UserTrip.tsx -> updateTrip.tsx.')
        if (this.props.sessionToken !== undefined) {
            fetch(`${APIURL}/trip/edit/${updateTripId}`, {
                method: 'PUT',
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'Authorization': this.props.sessionToken,
                }),
                body: JSON.stringify(
                    {
                        trip: {
                            tripName: this.state.updateTripName,
                            stops: this.state.updateStops,
                            numberOfStops: this.state.updateNumberOfStops,
                            tripBeginDate: this.state.updateTripBeginDate,
                            tripEndDate: this.state.updateTripEndDate
                        }
                    }
                )
            })
                .then(response => {
                    if (response.ok === true) {
                        return response.json()
                            .then(updatedData => {
                                console.log(`Trip at id ${updateTripId} updated.`)
                                console.log('updatedData:', updatedData)
                                this.handleUpdatedAlertOpen()
                            })
                    } else {
                        console.log('Trip not updated.')
                    }
                })
                .then(() => this.getUserTrips())
                .catch((error: Error) => console.log(error))
        } else {
            console.log('Trip not updated.')
        }
    }

    // D (DELETE) //
    deleteTrip = (deleteTripId: any) => {
        console.log('UserTrip.tsx -> deleteTrip.')
        // console.log(this.props.sessionToken)
        if (this.props.sessionToken !== undefined) {
            fetch(`${APIURL}/trip/delete/${deleteTripId}`, {
                method: 'DELETE',
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'Authorization': this.props.sessionToken,
                })
            })
                .then(response => {
                    console.log(response.ok)
                    if (response.ok === true) {
                        console.log(`Trip with the id ${deleteTripId} deleted.`)
                        this.handleDeletedAlertOpen()
                    } else {
                        console.log('Trip not deleted.')
                    }
                })
                .then(() => this.getUserTrips())
                .catch((error: Error) => console.log(error))
        } else {
            console.log('Trip not deleted.')
        }
    }

    // ******************** RENDER USERTRIP ******************** //
    render() {
        return (
            <div className='userTripMainDiv'>
                <h2>Your Trips</h2>
                <Button color='primary' variant='contained' onClick={() => this.getUserTrips()}>getUserTrips Test</Button>
                <Button color='primary' variant='contained' onClick={() => this.allUserTripsMapper()}>allUserTripsMapper Test</Button>
                {this.showTrips()}
                <Snackbar open={this.state.openDeletedAlert} autoHideDuration={5000} onClose={this.handleDeletedAlertClose}>
                    <this.TripDeletedAlert onClose={this.handleDeletedAlertClose} severity="warning">
                        Trip Deleted.
                    </this.TripDeletedAlert>
                </Snackbar>
                <Button variant='contained' color='default' onClick={() => this.handleDeletedAlertOpen()}>Click Me (Test Deleted Snackbar)</Button>
                <Snackbar open={this.state.openUpdatedAlert} autoHideDuration={5000} onClose={this.handleUpdatedAlertClose}>
                    <this.TripUpdatedAlert onClose={this.handleUpdatedAlertClose} severity="success">
                        Trip Updated.
                    </this.TripUpdatedAlert>
                </Snackbar>
                <Button variant='contained' color='default' onClick={() => this.handleUpdatedAlertOpen()}>Click Me (Test Updated Snackbar)</Button>
                {console.log("editDialogData:", this.state.editDialogData)}
                {/* <DataGrid rows={this.state.rows} columns={this.state.columns} pageSize={5} checkboxSelection /> */}
                {/* {this.showTrips()} */}
            </div>
        )
    }
}

export default Radium(UserTrip);