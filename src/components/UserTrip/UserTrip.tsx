import React from 'react';
import APIURL from '../../helpers/environment';
import { Button, Card, CardActions, CardContent, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Snackbar, TableCell, TableRow, TextField, Typography } from '@material-ui/core';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import Radium from 'radium';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import AddLocationIcon from '@material-ui/icons/AddLocation';
import './UserTrip.css';
import UserTripDisplay from './UserTripDisplay/UserTripDisplay';
import { UpdateOutputFileStampsProject } from 'typescript';
import { withStyles } from '@material-ui/core/styles';
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
    openCreateDialog: boolean;
    openEditDialog: boolean;
    openDeleteDialog: boolean;
    openDeletedAlert: boolean;
    openUpdatedAlert: boolean;
    openCreatedAlert: boolean;
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
    createTripBeginDate: Date | null; // i can use Date datatype
    createTripEndDate: Date | null;
    fetchedTripData: FetchedTripData;
    // allUserTrips: [TripData | null];
    // rows: any[];
    // columns: ColDef[];
    // response: [TripData | null];
}

type AcceptedProps = {
    sessionToken: string | undefined;
}

interface FetchedTripData {
    id: number | null;
    destinations: FetchedDestination[]
    tripName: string;
    stops: string[];
    numberOfStops?: number;
    tripBeginDate?: string;
    tripEndDate?: string;
    userId?: number | null;
}

interface TripData {
    id: number | null;
    tripName: string;
    stops: string[];
    numberOfStops?: number;
    tripBeginDate?: string;
    tripEndDate?: string;
    userId?: number | null;
}

interface FetchedDestination {
    id: number | null,
    xid?: string,
    name: string,
    country?: string,
    latitude?: number,
    longitude?: number,
    description?: string,
    kinds?: string,
    rating?: number,
    favorite?: boolean,
    tripId: number | null
}

const CardStyles = withStyles({
    root: {
        minWidth: 275,
        color: '#d5c8d3',
        backgroundColor: '#1e1545'
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
})(Card)

const TypographyStyles = withStyles({
    root: {
        color: '#6b63b2'
    }
})(Typography)


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
                tripBeginDate: '',
                tripEndDate: '',
                userId: null
            },
            openCreateDialog: false,
            openEditDialog: false,
            openDeleteDialog: false,
            editDialogData: {
                id: null,
                tripName: '',
                stops: [],
                numberOfStops: 0,
                tripBeginDate: '',
                tripEndDate: '',
                userId: null
            },
            emptyEditDialogData: {
                id: null,
                tripName: '',
                stops: [],
                numberOfStops: 0,
                tripBeginDate: '',
                tripEndDate: '',
                userId: null,
            },
            openDeletedAlert: false,
            openUpdatedAlert: false,
            openCreatedAlert: false,
            updateTripName: '',
            updateStops: [],
            updateNumberOfStops: 0,
            updateTripBeginDate: '',
            updateTripEndDate: '',
            createTripName: '',
            createStops: [],
            createNumberOfStops: 0,
            // createTripBeginDate: new Date(),
            createTripBeginDate: null,
            // createTripEndDate: new Date('9000/09/09')
            createTripEndDate: null,
            fetchedTripData: {
                id: null,
                destinations: [],
                tripName: '',
                stops: [],
                numberOfStops: 0,
                tripBeginDate: '',
                tripEndDate: '',
                userId: null
            }
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

    // componentDidMount() { console.log('UserTrip.tsx -> componentDidMount.') }
    // componentDidUpdate() { console.log('UserTrip.tsx -> componentDidUpdate.') }

    // ******************** USER TRIP MAPPER ******************** //
    allUserTripsMapper = () => {
        if (this.props.sessionToken !== undefined
            && this.state.allUserTrips !== undefined
            && this.state.allUserTrips !== null
            && Array.isArray(this.state.allUserTrips) === true) {
            console.log('UserTrip.tsx -> allUserTripsMapper.')
            return this.state.allUserTrips.map((value: TripData, index: number): (JSX.Element | undefined) => {
                if (value !== null) {
                    return (
                        <TableRow key={index}>
                            <TableCell align='right' component='th' scope='row'>{value.id}</TableCell>

                            <TableCell align='right'>{value.tripName}</TableCell>

                            {/* {
                                value.stops !== [] && value.stops !== null && value.stops.length !== null
                                    ? <TableCell align='right'>{value.stops.length}</TableCell>
                                    : <TableCell align='right'>N/A</TableCell>
                            } */}
                            {
                                value.id !== null
                                    ? (
                                        <TableCell align='right'>
                                            <Button
                                                variant='contained'
                                                color="default"
                                                onClick={() => {
                                                    console.log('Fetch the selected with its destinations.')
                                                    if (value.id !== null) {
                                                        this.getTrip(value.id)
                                                    }
                                                }}
                                            >Info
                                </Button>
                                        </TableCell>
                                    ) : (
                                        <TableCell align='right'>N/A</TableCell>
                                    )
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

    fetchedDestinationsMapper = () => {
        if (this.props.sessionToken !== undefined
            && this.state.fetchedTripData.destinations !== []
            && this.state.fetchedTripData.destinations.length !== 0) {
            console.log('UserTrip.tsx -> fetchedDestinationsMapper.')
            return this.state.fetchedTripData.destinations.map((value: FetchedDestination, index: number): (JSX.Element | undefined) => {
                if (value !== null) {
                    return (
                        <CardStyles variant="outlined">
                            <CardContent>
                                <TypographyStyles color="textSecondary" gutterBottom>
                                    {value.id}
                                </TypographyStyles>
                                <Typography variant="h5" component="h2">
                                    Destination: {value.name}
                                </Typography>
                                {
                                    value.country !== null && value.country !== undefined && value.country !== ''
                                        ?
                                        <Typography variant="h5" component="h2">
                                            Country: {value.country}
                                        </Typography>
                                        :
                                        <Typography variant="h5" component="h2">
                                            Country: N/A
                                        </Typography>
                                }
                                {
                                    value.latitude !== null && value.latitude !== undefined
                                        ?
                                        <TypographyStyles color="textSecondary">
                                            Latitude: {value.latitude}
                                        </TypographyStyles>
                                        :
                                        <TypographyStyles color="textSecondary">
                                            Latitude: N/A
                                        </TypographyStyles>
                                }
                                {
                                    value.longitude !== null && value.longitude !== undefined
                                        ?
                                        <TypographyStyles color="textSecondary">
                                            Longitude: {value.longitude}
                                        </TypographyStyles>
                                        :
                                        <TypographyStyles color="textSecondary">
                                            Longitude: N/A
                                        </TypographyStyles>
                                }
                                {
                                    value.description !== null && value.description !== undefined && value.description !== ''
                                        ?
                                        <TypographyStyles>
                                            Description: {value.description}
                                        </TypographyStyles>
                                        :
                                        <TypographyStyles>
                                            Description: N/A
                                        </TypographyStyles>
                                }
                                {
                                    value.kinds !== null && value.kinds !== undefined && value.kinds !== ''
                                        ?
                                        <TypographyStyles variant="body2">
                                            Kinds: {value.kinds}
                                        </TypographyStyles>
                                        :
                                        <TypographyStyles variant="body2">
                                            Kinds: N/A
                                        </TypographyStyles>
                                }
                                {
                                    value.rating !== null && value.rating !== undefined
                                        ?
                                        <TypographyStyles>
                                            Rating: {value.rating}
                                        </TypographyStyles>
                                        :
                                        <TypographyStyles>
                                            Rating: N/A
                                        </TypographyStyles>
                                }
                                {
                                    value.favorite === true
                                        ? (
                                            <TypographyStyles>
                                                Favorite: Yes
                                            </TypographyStyles>
                                        ) :
                                        value.favorite === false
                                            ? (
                                                <TypographyStyles>
                                                    Favorite: No
                                                </TypographyStyles>

                                            ) : (
                                                <TypographyStyles>
                                                    Favorite: N/A
                                                </TypographyStyles>

                                            )
                                }

                            </CardContent>
                            {/* <CardActions>
                                <Button size="small">Click Me</Button>
                            </CardActions> */}
                        </CardStyles >
                    )
                }
            })
        }
    }

    // ******************** HANDLERS AND RELATED FUNCTIONS ******************** //
    handleClickCreateDialogOpen = () => {
        console.log('UserTrip.tsx -> handleClickCreateDialogOpen.')
        this.setState({ openCreateDialog: true })
    }

    handleCreateDialogClose = () => {
        console.log('UserTrip.tsx -> handleCreateDialogClose.')
        this.setState({ openCreateDialog: false })
    }

    handleClickEditDialogOpen = (a: TripData) => () => {
        console.log('UserTrip.tsx -> handleClickEditDialogOpen.')
        this.setState({
            openEditDialog: true,
            editDialogData: a
        })
    }

    handleEditDialogClose = () => {
        console.log('UserTrip.tsx -> handleEditDialogClose.')
        this.setState({ openEditDialog: false })
    }

    handleClickDeleteDialogOpen = (a: TripData) => () => {
        console.log('UserTrip.tsx -> handleClickDeleteDialogOpen.')
        this.setState({
            openDeleteDialog: true,
            editDialogData: a
        })
    }

    handleDeleteDialogClose = () => {
        console.log('UserTrip.tsx -> handleDeleteDialogClose.')
        this.setState({ openDeleteDialog: false })
    }

    handleCreateTripNameInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
        console.log('UserTrip.tsx -> handleCreateTripNameInput.')
        this.setState({ createTripName: e.target.value })
    }

    handleUpdateTripNameInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
        console.log('UserTrip.tsx -> handleUpdateTripNameInput.')
        this.setState({ updateTripName: e.target.value })
    }

    handleUpdateTripBeginDateInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
        console.log('UserTrip.tsx -> handleUpdateTripBeginDateInput.')
        this.setState({ updateTripBeginDate: e.target.value })
    }

    handleUpdateTripEndDateInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
        console.log('UserTrip.tsx -> handleUpdateTripEndDateInput.')
        this.setState({ updateTripEndDate: e.target.value })
    }

    handleCreateTrip = (e: React.FormEvent): void => {
        e.preventDefault()
        console.log('UserTrip.tsx -> handleCreateTrip.')
        this.createTrip()
        this.setState({ openCreateDialog: false })
    }

    handleUpdateTrip = (e: React.FormEvent): void => {
        e.preventDefault()
        console.log('UserTrip.tsx -> handleUpdateTrip.')
        this.updateTrip(this.state.editDialogData.id)
        this.setState({ openEditDialog: false })
    }

    handleDeleteTrip = (b: any) => () => {
        console.log('UserTrip.tsx -> handleDeleteTrip.')
        this.deleteTrip(b)
        this.setState({
            editDialogData: this.state.emptyEditDialogData,
            openDeleteDialog: false
        })
    }

    TripCreatedAlert(props: AlertProps) {
        console.log('UserTrip.tsx -> TripCreatedAlert.')
        return <MuiAlert elevation={6} variant="filled" {...props} />;
    }

    TripUpdatedAlert(props: AlertProps) {
        console.log('UserTrip.tsx -> TripUpdatedAlert.')
        return <MuiAlert elevation={6} variant="filled" {...props} />;
    }

    TripDeletedAlert(props: AlertProps) {
        console.log('UserTrip.tsx -> TripDeletedAlert.')
        return <MuiAlert elevation={6} variant="filled" {...props} />;
    }

    handleDeletedAlertOpen = () => { this.setState({ openDeletedAlert: true }) }
    handleDeletedAlertClose = () => { this.setState({ openDeletedAlert: false }) }
    handleUpdatedAlertOpen = () => { this.setState({ openUpdatedAlert: true }) }
    handleUpdatedAlertClose = () => { this.setState({ openUpdatedAlert: false }) }
    handleCreatedAlertOpen = () => { this.setState({ openCreatedAlert: true }) }
    handleCreatedAlertClose = () => { this.setState({ openCreatedAlert: false }) }

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
                body: JSON.stringify({
                    trip: {
                        tripName: this.state.createTripName,
                        stops: this.state.createStops,
                        numberOfStops: this.state.createNumberOfStops,
                        tripBeginDate: this.state.createTripBeginDate,
                        tripEndDate: this.state.createTripEndDate
                        // tripBeginDate: 100,
                        // tripEndDate: 200
                    }
                })
            })
                .then(response => {
                    if (response.ok === true) {
                        return response.json()
                            .then(createdData => {
                                console.log('Trip created.')
                                console.log('createdData:', createdData)
                                this.handleCreatedAlertOpen()
                            })
                    } else {
                        console.log('Trip not created.')
                    }
                })
                .then(() => this.getUserTrips())
                .catch((error: Error) => console.log(error))
        }
    }

    // R (GET) //
    getUserTrips = (): void => {
        console.log('UserTrip.tsx -> getUserTrips.')
        if (this.props.sessionToken !== undefined) {
            fetch(`${APIURL}/trip/getusertrips`, {
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

    getTrip = (getTripId: number): void => {
        console.log('UserTrip.tsx -> getTrip.')
        if (this.props.sessionToken !== undefined) {
            fetch(`${APIURL}/trip/gettrip/${getTripId}`, {
                method: 'GET',
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'Authorization': this.props.sessionToken
                })
            })
                .then(response => {
                    return response.json()
                })
                .then((response) => {
                    // console.log(response)
                    this.setState({ fetchedTripData: response })
                })
                .then(() => console.log('fetchedTripData:', this.state.fetchedTripData))
                .catch((error: Error) => console.log(error))
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
                    })
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

    showTripDestinationInfo = () => {

    }

    // ******************** PROPS FOR UserTripDisplay.tsx, DISPLAY UserTripDisplay.tsx, CALLED IN THE RENDER BELOW ******************** //
    showTrips = () => {
        return (
            this.state.allUserTrips !== [] && this.state.allUserTrips.length !== 0
                ? (
                    <div>
                        <UserTripDisplay
                            openEditDialog={this.state.openEditDialog}
                            openDeleteDialog={this.state.openDeleteDialog}
                            openCreateDialog={this.state.openCreateDialog}
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
                            handleUpdateTrip={this.handleUpdateTrip}
                            handleClickCreateDialogOpen={this.handleClickCreateDialogOpen}
                            handleCreateDialogClose={this.handleCreateDialogClose}
                            handleCreateTripNameInput={this.handleCreateTripNameInput}
                            handleCreateTrip={this.handleCreateTrip}
                        />
                    </div>
                ) : (
                    console.log(this.state.allUserTrips)
                )
        )
    }

    // ******************** SHOW DESTINATIONS INFO ******************** //
    showDestinationsInfo = () => {
        return (
            this.state.fetchedTripData.id === null
                ? (
                    <div>
                        {/* <h4>
                            'Destinations Info' has not been pressed yet.
                        </h4> */}
                    </div>
                ) :
                this.state.fetchedTripData.destinations !== [] && this.state.fetchedTripData.destinations.length !== 0
                    ? (
                        <div>
                            <h4>Destination Information is available:</h4>
                            <h2>{this.state.fetchedTripData.tripName}'s Destinations</h2>
                            {this.fetchedDestinationsMapper()}
                        </div>
                    ) : (
                        <div>
                            <h4>
                                No Destination Information Available. Click on a 'Destinations Info' button to check the destinations of a trip!
                            </h4>
                        </div>
                    )
        )
    }

    // ******************** RENDER USERTRIP ******************** //
    render() {
        return (
            <div className='userTripMainDiv'>
                <h2>Your Trips</h2>
                <Button color='primary' variant='contained' onClick={this.handleClickCreateDialogOpen}>+ Create New Trip +</Button><br /><br />

                <Button color='primary' variant='contained' onClick={() => this.getUserTrips()}>&#8595; Show Your Trips &#8595;</Button>
                {this.showTrips()}<br /><br />
                {this.showDestinationsInfo()}

                <Dialog open={this.state.openCreateDialog} onClose={this.handleCreateDialogClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Create Trip</DialogTitle>
                    <form onSubmit={this.handleCreateTrip}>
                        <DialogContent>
                            <DialogContentText>Create Trip {this.state.editDialogData.tripName}</DialogContentText>
                            <TextField
                                autoFocus
                                margin="dense"
                                label="Trip Name"
                                type="text"
                                variant='outlined'
                                fullWidth
                                onChange={this.handleCreateTripNameInput}
                                required
                                helperText='Please enter a trip name.'
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.handleCreateDialogClose} color="secondary" variant='contained'>Cancel</Button>
                            {/* <Button onClick={props.handleUpdateTrip(props.editDialogData.id)} color="primary" variant='contained'>Accept Changes</Button> */}
                            <Button type='submit' value='Submit' color="primary" variant='contained'>Create Trip</Button>
                        </DialogActions>
                    </form>
                </Dialog>

                <Snackbar open={this.state.openCreatedAlert} autoHideDuration={5000} onClose={this.handleCreatedAlertClose}>
                    <this.TripCreatedAlert onClose={this.handleCreatedAlertClose} severity="success">
                        Trip Created.
                    </this.TripCreatedAlert>
                </Snackbar>

                <Snackbar open={this.state.openUpdatedAlert} autoHideDuration={5000} onClose={this.handleUpdatedAlertClose}>
                    <this.TripUpdatedAlert onClose={this.handleUpdatedAlertClose} severity="warning">
                        Trip Updated.
                    </this.TripUpdatedAlert>
                </Snackbar>

                <Snackbar open={this.state.openDeletedAlert} autoHideDuration={5000} onClose={this.handleDeletedAlertClose}>
                    <this.TripDeletedAlert onClose={this.handleDeletedAlertClose} severity="error">
                        Trip Deleted.
                    </this.TripDeletedAlert>
                </Snackbar>

                {/* <Button variant='contained' color='default' onClick={() => this.handleCreatedAlertOpen()}>Test Created Snackbar</Button>
                <Button variant='contained' color='default' onClick={() => this.handleUpdatedAlertOpen()}>Test Updated Snackbar</Button>
                <Button variant='contained' color='default' onClick={() => this.handleDeletedAlertOpen()}>Test Deleted Snackbar</Button> */}

                {/* {console.log("editDialogData:", this.state.editDialogData)} */}
                {console.log("fetchedTripData:", this.state.fetchedTripData)}
                {/* <DataGrid rows={this.state.rows} columns={this.state.columns} pageSize={5} checkboxSelection /> */}
                {/* {this.showTrips()} */}
                {/* {console.log()} */}
                <br />
            </div>
        )
    }
}

export default Radium(UserTrip);