import React from 'react';
import APIURL from '../../helpers/environment';
import { Button, FormControl, InputAdornment, List, ListItem, Snackbar, TableCell, TableRow, TextField } from '@material-ui/core';
import AssignmentIcon from '@material-ui/icons/Assignment';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import LocationSearchingIcon from '@material-ui/icons/LocationSearching';
import './UserDestination.css';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import LocationCityIcon from '@material-ui/icons/LocationCity';
import PlaceIcon from '@material-ui/icons/Place';
import NavigationIcon from '@material-ui/icons/Navigation';
import EmojiPeopleIcon from '@material-ui/icons/EmojiPeople';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import UserDestinationDisplay from './UserDestinationDisplay/UserDestinationDisplay';
import { withStyles } from '@material-ui/core/styles';

let key: string = '5ae2e3f221c38a28845f05b6df066c617c109b7aa5380d2ef8cef9ee'
let baseUrl: string = 'https://api.opentripmap.com/0.1/en/places/geoname?'

type UserDestinationState = {
    geonameSearchTerm: string;
    geonameFetchedData: GeonameData;
    openGeonameSearchAlert: boolean;
    destinationData: DestinationData;
    allUserDestinations: DestinationData[];
    emptyGeonameFetchedData: GeonameData;
    editDialogData: DestinationData;
    emptyEditDialogData: DestinationData;
    openDeleteDialog: boolean;
    openCreatedAlert: boolean;
    openUpdatedAlert: boolean;
    openDeletedAlert: boolean;
    openEditDialog: boolean;
    updateDescription: string;
    updateKinds: string;
    updateRating: number;
    updateFavorite: boolean;
    updateAssignTripId: number | null;
    updateAssignTripName: string;
    updateAssignTripOpen: boolean;
    assignTripData: AssignTripData[];
}

type AcceptedProps = {
    sessionToken: string | undefined;
}

type DestinationData = {
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

interface AssignTripData {
    id: number;
    tripName: string;
}

interface GeonameData {
    country: string;
    lat: number;
    lon: number;
    name: string;
    population: number;
    status: string;
    timezone: string;
    tripId?: number;
}

const ButtonStyles = withStyles({
    root: {
        backgroundColor: '#5bc0de',
        color: 'white',
        '&:hover': {
            backgroundColor: 'goldenrod',
            color: 'black'
        }
    },
})(Button)

class UserDestination extends React.Component<AcceptedProps, UserDestinationState>{
    constructor(props: AcceptedProps) {
        super(props)
        this.state = {
            geonameSearchTerm: '',
            geonameFetchedData: {
                country: '',
                lat: 0,
                lon: 0,
                name: '',
                population: 0,
                status: '',
                timezone: ''
            },
            emptyGeonameFetchedData: {
                country: '',
                lat: 0,
                lon: 0,
                name: '',
                population: 0,
                status: '',
                timezone: ''
            },
            openGeonameSearchAlert: false,
            destinationData: {
                id: null,
                xid: '',
                name: '',
                country: '',
                latitude: 0,
                longitude: 0,
                description: '',
                kinds: '',
                // rating: 0,
                favorite: false,
                tripId: null
            },
            editDialogData: {
                id: null,
                xid: '',
                name: '',
                country: '',
                latitude: 0,
                longitude: 0,
                description: '',
                kinds: '',
                rating: 0,
                favorite: false,
                tripId: null
            },
            emptyEditDialogData: {
                id: null,
                xid: '',
                name: '',
                country: '',
                latitude: 0,
                longitude: 0,
                description: '',
                kinds: '',
                rating: 0,
                favorite: false,
                tripId: null
            },
            allUserDestinations: [],
            openEditDialog: false,
            openDeleteDialog: false,
            openCreatedAlert: false,
            openUpdatedAlert: false,
            openDeletedAlert: false,
            updateDescription: '',
            updateKinds: '',
            updateRating: 0,
            updateFavorite: false,
            updateAssignTripId: null,
            updateAssignTripName: '',
            updateAssignTripOpen: false,
            assignTripData: []
        }
    }

    componentDidMount() {
        console.log('UserDestination.tsx -> componentDidMount.')
        this.assignTripFetch()
    }

    // ******************** USER DESTINATION MAPPER ******************** //
    allUserDestinationsMapper = () => {
        if (this.props.sessionToken !== undefined
            && this.state.allUserDestinations !== undefined
            && this.state.allUserDestinations !== null
            && Array.isArray(this.state.allUserDestinations) === true) {
            console.log('UserDestination.tsx -> allUserDestinationsMapper.')
            return this.state.allUserDestinations.map((value: DestinationData, index: number): (JSX.Element | undefined) => {
                if (value !== null) {
                    return (
                        <TableRow key={index}>
                            <TableCell align='right' component='th' scope='row'>{value.id}</TableCell>
                            <TableCell align='right'>{value.name}</TableCell>
                            {
                                value.country !== null && value.country !== ''
                                    ? <TableCell align='right'>{value.country}</TableCell>
                                    : <TableCell align='right'>N/A</TableCell>
                            }
                            {
                                value.latitude !== null && value.latitude !== undefined && isNaN(value.latitude) === false
                                    ? <TableCell align='right'>{value.latitude}</TableCell>
                                    : <TableCell align='right'>N/A</TableCell>
                            }
                            {
                                value.longitude !== null && value.longitude !== undefined && isNaN(value.longitude) === false
                                    ? <TableCell align='right'>{value.longitude}</TableCell>
                                    : <TableCell align='right'>N/A</TableCell>
                            }
                            {
                                value.description !== null && value.description !== ''
                                    ? <TableCell align='right'>{value.description}</TableCell>
                                    : <TableCell align='right'>N/A</TableCell>
                            }
                            {
                                value.kinds !== null && value.kinds !== ''
                                    ? < TableCell align='right'>{value.kinds}</TableCell>
                                    : <TableCell align='right'>N/A</TableCell>
                            }
                            {
                                value.rating !== null && value.rating !== undefined && value.rating !== 0
                                    ? <TableCell align='right'>{value.rating}</TableCell>
                                    : <TableCell align='right'>N/A</TableCell>
                            }
                            {
                                value.favorite !== null && value.favorite !== undefined ? (
                                    value.favorite === true
                                        ? (<TableCell align='right'>Yes</TableCell>) :
                                        (value.favorite === false)
                                            ? <TableCell align='right'>No</TableCell> :
                                            <TableCell>N/A</TableCell>
                                ) : (<TableCell align='right'>N/A</TableCell>)
                            }
                            {
                                value.tripId !== null && value.tripId !== undefined
                                    ? <TableCell align='right'>{value.tripId}</TableCell>
                                    : <TableCell align='right'><i>Not Assigned A Trip</i></TableCell>
                            }
                            <TableCell align='right'>
                                <IconButton
                                    color='primary'
                                    aria-label="editDestination"
                                    onClick={this.handleClickEditDialogOpen(value)}
                                >
                                    <AssignmentIcon />
                                </IconButton>
                            </TableCell>

                            <TableCell align='right'>
                                <IconButton
                                    color='secondary'
                                    aria-label="delete"
                                    onClick={this.handleClickDeleteDialogOpen(value)}
                                >
                                    <DeleteIcon />
                                </IconButton>
                            </TableCell>
                        </TableRow >
                    )
                }
            })
        }
    }

    assignTripFetch = (): void => {
        console.log('UserDestination.tsx -> assignTripFetch.')
        if (this.props.sessionToken !== undefined) {
            fetch(`${APIURL}/trip/getusertrips`, {
                method: 'GET',
                headers: new Headers({
                    'Content-Type': 'application/json',
                    Authorization: this.props.sessionToken
                })
            })
                .then(response => response.json())
                .then((tripFetchedData: AssignTripData[]) => { this.setState({ assignTripData: tripFetchedData }) })
                .then(() => {
                    if (this.state.assignTripData !== null) { console.log(this.state.assignTripData) }
                })
                .catch(error => console.log(error))
        }
    }

    assignTripMapper = () => {
        if (this.props.sessionToken !== undefined
            && this.state.assignTripData !== null
            && this.state.assignTripData !== undefined
            && Array.isArray(this.state.assignTripData) === true) {
            console.log('UserDestination.tsx -> assignTripMapper.')
            return this.state.assignTripData.map((value: AssignTripData, index: number): (JSX.Element | undefined) => {
                if (value !== null) {
                    return (<option key={index} value={value.id}>Trip No. {value.id}, {value.tripName}</option>)
                }
            })
        }
    }

    // simple geoname search, returns a location most closely matching a given single search term string
    geonameFetch = (searchTerm: string) => {
        console.log('UserDestination.tsx -> geonameSearch.')
        console.log(searchTerm)
        if (this.props.sessionToken !== undefined) {
            let geonameFetchUrl: string = `${baseUrl}name=${searchTerm}&apikey=${key}`
            fetch(geonameFetchUrl, {
                method: 'GET',
                headers: new Headers({
                    'Content-Type': 'application/json'
                })
            })
                .then(response => {
                    console.log(response.ok)
                    if (response.ok === true) {
                        return response.json()
                            .then((geonameData: GeonameData) => {
                                this.setState({ geonameFetchedData: geonameData })
                            })
                            .then(() => this.handleGeonameSearchAlertOpen())
                    } else { console.log('No geoname search.') }
                })
                .catch((error: Error) => console.log(error))
        }
    }

    handleGeonameInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
        console.log('UserDestination.tsx -> handleGeonameInput.')
        this.setState({ geonameSearchTerm: e.target.value })
    }

    handleGeonameSubmit = (e: React.FormEvent): void => {
        console.log('UserDestination.tsx -> handleGeonameSubmit.')
        e.preventDefault();
        this.geonameFetch(this.state.geonameSearchTerm)
    }

    handleClickEditDialogOpen = (c: DestinationData) => () => {
        console.log('UserDestination.tsx -> handleClickEditDialogOpen.')
        this.setState({
            openEditDialog: true,
            editDialogData: c
        })
    }

    handleEditDialogClose = () => {
        console.log('UserDestination.tsx -> handleEditDialogClose.')
        this.setState({ openEditDialog: false })
    }

    handleUpdateDescriptionInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
        console.log('UserDestination.tsx -> handleUpdateDescriptionInput.')
        this.setState({ updateDescription: e.target.value })
    }

    handleUpdateKindsInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
        console.log('UserDestination.tsx -> handleUpdateKindsInput.')
        this.setState({ updateKinds: e.target.value })
    }

    handleUpdateRatingInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
        console.log('UserDestination.tsx -> handleUpdateRatingInput.')
        this.setState({ updateRating: Number((e.target as HTMLInputElement).value) })
    }

    handleUpdateFavoriteInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log('UserDestination.tsx -> handleUpdateFavoriteInput.')
        this.setState({ updateFavorite: e.target.checked })
    }

    handleUpdateAssignTripInput = (e: React.ChangeEvent<{ value: number }>) => { this.setState({ updateAssignTripId: e.target.value }) }

    handleUpdateDestination = (e: React.FormEvent): void => {
        e.preventDefault()
        console.log('UserDestination.tsx -> handleUpdateDestination.')
        this.updateDestination(this.state.editDialogData.id)
        this.setState({ openEditDialog: false })
    }

    handleClickDeleteDialogOpen = (a: DestinationData) => () => {
        console.log('UserDestination.tsx -> handleClickDeleteDialogOpen.')
        this.setState({
            openDeleteDialog: true,
            editDialogData: a
        })
    }

    handleDeleteDialogClose = () => {
        console.log('UserDestination.tsx -> handleDeleteDialogClose.')
        this.setState({ openDeleteDialog: false })
    }

    handleDeleteDestination = (b: number | null) => () => {
        console.log('UserDestination.tsx -> handleDeleteDestination.')
        if (b !== null) { this.deleteDestination(b) }
        this.setState({
            editDialogData: this.state.emptyEditDialogData,
            openDeleteDialog: false
        })
    }

    geonameSearchAlert(props: AlertProps) {
        console.log('UserDestination.tsx -> geonameSearchAlert.')
        return <MuiAlert elevation={6} variant="filled" {...props} />;
    }

    DestinationCreatedAlert(props: AlertProps) {
        console.log('UserDestination.tsx -> DestinationCreatedAlert.')
        return <MuiAlert elevation={6} variant="filled" {...props} />;
    }

    DestinationUpdatedAlert(props: AlertProps) {
        console.log('UserDestination.tsx -> DestinationUpdatedAlert.')
        return <MuiAlert elevation={6} variant="filled" {...props} />;
    }

    DestinationDeletedAlert(props: AlertProps) {
        console.log('UserDestination.tsx -> DestinationDeletedAlert.')
        return <MuiAlert elevation={6} variant="filled" {...props} />;
    }

    handleGeonameSearchAlertOpen = () => { this.setState({ openGeonameSearchAlert: true }) }
    handleGeonameSearchAlertClose = () => { this.setState({ openGeonameSearchAlert: false }) }
    handleCreatedAlertOpen = () => { this.setState({ openCreatedAlert: true }) }
    handleCreatedAlertClose = () => { this.setState({ openCreatedAlert: false }) }
    handleUpdatedAlertOpen = () => { this.setState({ openUpdatedAlert: true }) }
    handleUpdatedAlertClose = () => { this.setState({ openUpdatedAlert: false }) }
    handleDeletedAlertOpen = () => { this.setState({ openDeletedAlert: true }) }
    handleDeletedAlertClose = () => { this.setState({ openDeletedAlert: false }) }

    showGeonameFetchedData = () => {
        console.log('UserDestination.tsx -> showGeonameFetchedData.')
        return (
            this.state.geonameFetchedData.name !== ''
                ? (
                    <div>
                        <h3>&#8595; Search Results &#8595;</h3>
                        <List>
                            <ListItem>
                                <ListItemIcon><LocationCityIcon /></ListItemIcon>
                                <ListItemText primary='Destination' secondary={this.state.geonameFetchedData.name} />
                            </ListItem>

                            <ListItem>
                                <ListItemIcon><PlaceIcon /></ListItemIcon>
                                <ListItemText primary='Country' secondary={this.state.geonameFetchedData.country} />
                            </ListItem>

                            <ListItem>
                                <ListItemIcon><NavigationIcon /></ListItemIcon>
                                <ListItemText primary='Latitude' secondary={this.state.geonameFetchedData.lat} />
                            </ListItem>

                            <ListItem>
                                <ListItemIcon><NavigationIcon /></ListItemIcon>
                                <ListItemText primary='Longitude' secondary={this.state.geonameFetchedData.lon} />
                            </ListItem>

                            <ListItem>
                                <ListItemIcon><EmojiPeopleIcon /></ListItemIcon>
                                {
                                    this.state.geonameFetchedData.population !== 0
                                        && this.state.geonameFetchedData.population !== undefined
                                        && isNaN(this.state.geonameFetchedData.population) === false
                                        && this.state.geonameFetchedData !== null
                                        ? <ListItemText primary='Population' secondary={this.state.geonameFetchedData.population} />
                                        : <ListItemText primary='Population' secondary='Not available' />
                                }
                            </ListItem>

                            <ListItem>
                                <ListItemIcon><AccessTimeIcon /></ListItemIcon>
                                {
                                    this.state.geonameFetchedData.timezone !== ''
                                        && this.state.geonameFetchedData.timezone !== null
                                        && this.state.geonameFetchedData.timezone !== undefined
                                        ? <ListItemText primary='Timezone' secondary={this.state.geonameFetchedData.timezone} />
                                        : <ListItemText primary='Timezone' secondary='Not available' />
                                }
                            </ListItem>
                        </List>
                        <ButtonStyles onClick={() => this.createDestination()} variant='contained'>+ Add Result To Your Destinations +</ButtonStyles>
                    </div >
                ) : (
                    <div>
                        <h5>Try a search!</h5>
                    </div>
                )
        )
    }

    // ******************** CREATE, READ (GET), UPDATE, DELETE DESTINATIONS ******************** //
    // C //
    createDestination = () => {
        if (this.props.sessionToken !== undefined) {
            console.log('UserDestination.tsx -> createDestination.')
            fetch(`${APIURL}/destination/create`, {
                method: 'POST',
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'Authorization': this.props.sessionToken
                }),
                body: JSON.stringify({
                    destination: {
                        name: this.state.geonameFetchedData.name,
                        country: this.state.geonameFetchedData.country,
                        latitude: this.state.geonameFetchedData.lat,
                        longitude: this.state.geonameFetchedData.lon,
                    }
                })
            })
                .then(response => {
                    if (response.ok === true) {
                        return response.json()
                            .then(createdData => {
                                console.log('Destination created.')
                                console.log('createdData:', createdData)
                                this.handleCreatedAlertOpen()
                            })
                    } else {
                        console.log('Destination not created.')
                    }
                })
                .then(() => this.getUserDestinations())
                .then(() => this.setState({ geonameFetchedData: this.state.emptyGeonameFetchedData }))
                .catch((error: Error) => console.log(error))
        }
    }

    // R //
    getUserDestinations = (): void => {
        console.log('UserDestination.tsx -> getUserDestinations.')
        if (this.props.sessionToken !== undefined) {
            fetch(`${APIURL}/destination/getuserdestinations`, {
                method: 'GET',
                headers: new Headers({
                    'Content-Type': 'application/json',
                    Authorization: this.props.sessionToken
                })
            })
                .then(response => response.json())
                .then((destinationFetchedData: DestinationData[]) => {
                    this.setState({ allUserDestinations: destinationFetchedData })
                })
                .then(() => {
                    if (this.state.allUserDestinations !== null) { console.log(this.state.allUserDestinations) }
                })
                .then(() => this.assignTripMapper())
                .catch((error: Error) => console.log(error))
        }
    }

    // U //
    updateDestination = (updateDestinationId: number | null) => {
        console.log('UserDestination.tsx -> updateDestination.')
        if (this.props.sessionToken !== undefined) {
            fetch(`${APIURL}/destination/edit/${updateDestinationId}`, {
                method: 'PUT',
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'Authorization': this.props.sessionToken,
                }),
                body: JSON.stringify(
                    {
                        destination: {
                            description: this.state.updateDescription,
                            kinds: this.state.updateKinds,
                            rating: this.state.updateRating,
                            favorite: this.state.updateFavorite,
                            tripId: this.state.updateAssignTripId
                        }
                    })
            })
                .then(response => {
                    if (response.ok === true) {
                        return response.json()
                            .then(updatedData => {
                                console.log(`Destination at id ${updateDestinationId} updated.`)
                                console.log(`updatedData:`, updatedData)
                                this.handleUpdatedAlertOpen()
                            })
                    } else {
                        console.log('Destination not updated.')
                    }
                })
                .then(() => this.getUserDestinations())
                .catch((error: Error) => console.log(error))
        } else {
            console.log('Destination not updated.')
        }
    }

    // D //
    deleteDestination = (deleteDestinationId: number) => {
        console.log('UserDestination.tsx -> deleteDestination.')
        if (this.props.sessionToken !== undefined) {
            fetch(`${APIURL}/destination/delete/${deleteDestinationId}`, {
                method: 'DELETE',
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'Authorization': this.props.sessionToken
                })
            })
                .then(response => {
                    console.log(response.ok)
                    if (response.ok === true) {
                        console.log(`Destination with the id ${deleteDestinationId} deleted.`)
                        this.handleDeletedAlertOpen()
                    } else {
                        console.log('Destination not deleted.')
                    }
                })
                .then(() => this.getUserDestinations())
                .catch((error: Error) => console.log(error))
        }
    }

    showDestinations = () => {
        return (
            this.state.allUserDestinations !== [] && this.state.allUserDestinations.length !== 0
                ? (
                    <div>
                        <UserDestinationDisplay
                            allUserDestinationsMapper={this.allUserDestinationsMapper}
                            editDialogData={this.state.editDialogData}
                            openDeleteDialog={this.state.openDeleteDialog}
                            handleDeleteDialogClose={this.handleDeleteDialogClose}
                            handleDeleteDestination={this.handleDeleteDestination}
                            openEditDialog={this.state.openEditDialog}
                            handleEditDialogClose={this.handleEditDialogClose}
                            handleUpdateDescriptionInput={this.handleUpdateDescriptionInput}
                            handleUpdateKindsInput={this.handleUpdateKindsInput}
                            handleUpdateRatingInput={this.handleUpdateRatingInput}
                            updateFavorite={this.state.updateFavorite}
                            handleUpdateFavoriteInput={this.handleUpdateFavoriteInput}
                            handleUpdateDestination={this.handleUpdateDestination}
                            assignTripMapper={this.assignTripMapper}
                            handleUpdateAssignTripInput={this.handleUpdateAssignTripInput}
                            updateAssignTripId={this.state.updateAssignTripId}
                            updateRating={this.state.updateRating}
                        />
                    </div>
                ) : (
                    console.log('allUserDestinations:', this.state.allUserDestinations)
                )
        )
    }

    // ******************** RENDER USERDESTINATION ******************** //
    render() {
        return (
            <div className='userDestinationMainDiv'>
                <h2>Explore Destinations</h2>
                <form onSubmit={this.handleGeonameSubmit}>
                    <FormControl>
                        <TextField
                            required
                            type='text'
                            helperText='Enter a destination name: city, state, prefecture, country, ...'
                            label='Destination Search'
                            variant='filled'
                            onChange={this.handleGeonameInput}
                            InputProps={{ startAdornment: <InputAdornment position="start"><LocationSearchingIcon /></InputAdornment> }}
                        />
                        <Button color='primary' variant='contained' type='submit' value='submit'>Submit Search</Button>
                    </FormControl>
                </form>
                {this.showGeonameFetchedData()}<br />

                <Button color='primary' variant='contained' onClick={() => this.getUserDestinations()}>&#8595; Show Your Destinations &#8595;</Button>
                {this.showDestinations()}

                <Snackbar open={this.state.openGeonameSearchAlert} autoHideDuration={5000} onClose={this.handleGeonameSearchAlertClose}>
                    <this.geonameSearchAlert onClose={this.handleGeonameSearchAlertClose} severity="info">
                        Search Complete.
                    </this.geonameSearchAlert>
                </Snackbar>

                <Snackbar open={this.state.openCreatedAlert} autoHideDuration={5000} onClose={this.handleCreatedAlertClose}>
                    <this.DestinationCreatedAlert onClose={this.handleCreatedAlertClose} severity="success">
                        Destination Created.
                    </this.DestinationCreatedAlert>
                </Snackbar>

                <Snackbar open={this.state.openUpdatedAlert} autoHideDuration={5000} onClose={this.handleUpdatedAlertClose}>
                    <this.DestinationUpdatedAlert onClose={this.handleUpdatedAlertClose} severity="warning">
                        Destination Updated.
                    </this.DestinationUpdatedAlert>
                </Snackbar>

                <Snackbar open={this.state.openDeletedAlert} autoHideDuration={5000} onClose={this.handleDeletedAlertClose}>
                    <this.DestinationDeletedAlert onClose={this.handleDeletedAlertClose} severity="error">
                        Destination Deleted.
                    </this.DestinationDeletedAlert>
                </Snackbar>
            </div >
        )
    }
}

export default UserDestination;