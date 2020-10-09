import React from 'react';
import APIURL from '../../helpers/environment';
import { Button, FormControl, InputAdornment, List, ListItem, TextField } from '@material-ui/core';
import LocationSearchingIcon from '@material-ui/icons/LocationSearching';
import './UserDestination.css';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import LocationCityIcon from '@material-ui/icons/LocationCity';
import PlaceIcon from '@material-ui/icons/Place';
import NavigationIcon from '@material-ui/icons/Navigation';
import EmojiPeopleIcon from '@material-ui/icons/EmojiPeople';
import AccessTimeIcon from '@material-ui/icons/AccessTime';

let key: string = '5ae2e3f221c38a28845f05b6df066c617c109b7aa5380d2ef8cef9ee'
let baseUrl: string = 'https://api.opentripmap.com/0.1/en/places/geoname?'

type UserDestinationState = {
    geonameSearchTerm: string;
    geonameFetchedData: GeonameData;
}

type AcceptedProps = {
    sessionToken: string | undefined;
}

// I believe this can also be written as a type, for this purpose should have the same function. For now, types will be used for props or class states, interfaces for api calls
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
            }
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
                .then(response => response.json())
                .then((geonameData: GeonameData) => {
                    // console.log(geonameData)})
                    this.setState({ geonameFetchedData: geonameData })
                })
                .then(() => { console.log('geonameFetchedData:', this.state.geonameFetchedData) })
                // error has its own interface? Error
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

    showGeonameFetchedData = () => {
        return (
            this.state.geonameFetchedData.name !== ''
                ? (
                    <div>
                        <h3>Search Results:</h3>
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
                                    this.state.geonameFetchedData.population === 0
                                        && this.state.geonameFetchedData.population === undefined
                                        && this.state.geonameFetchedData === null
                                        ? <ListItemText primary='Population' secondary="Not available" />
                                        : <ListItemText primary='Population' secondary={this.state.geonameFetchedData.population} />
                                }
                            </ListItem>

                            <ListItem>
                                <ListItemIcon><AccessTimeIcon /></ListItemIcon>
                                <ListItemText primary='Timezone' secondary={this.state.geonameFetchedData.timezone} />
                            </ListItem>

                        </List>
                    </div >
                ) : (
                    <div>
                        <h5>No search results. Try a search!</h5>
                    </div>
                )
        )
    }

    getUserDestinations = () => {
        console.log('UserDestination.tsx -> getUserDestinations.')
        if (this.props.sessionToken !== undefined) {
            fetch(`${APIURL}/destination/getalldestinations`, {
                method: 'GET',
                headers: new Headers({
                    'Content-Type': 'application/json',
                    Authorization: this.props.sessionToken
                })
            })
                .then(response => response.json())
                .then(destinationsData => {
                    console.log(destinationsData)
                })
                .catch((error: Error) => console.log(error))
        }
    }

    // ******************** CREATE, UPDATE, DELETE DESTINATIONS ******************** //
    createDestination = () => {
        if (this.props.sessionToken !== undefined) {
            console.log('UserDestination.tsx -> createDestination.')
        }
    }

    updateDestination = (updateDestinationId: any) => {
        if (this.props.sessionToken !== undefined) {
            console.log('UserDestination.tsx -> updateDestination.')
        }
    }

    deleteDestination = (deleteDestinationId: any) => {
        if (this.props.sessionToken !== undefined) {
            console.log('UserDestination.tsx -> deleteDestination.')
        }
    }
    
    // ******************** RENDER USERDESTINATION ******************** //
    render() {
        return (
            <div className='userDestinationMainDiv'>
                {/* how do I properly use the FormControl? */}
                {/* {this.props.sessionToken} */}
                {/* <h2>Hello from UserDestination.tsx</h2> */}
                <h2>Explore Destinations</h2>
                {/* <Button color='primary' variant='contained' onClick={() => this.geonameFetch('Fort Wayne')}>geonameSearch Test</Button> */}
                <Button color='primary' variant='contained' onClick={() => this.geonameFetch('Fort Wayne')}>geonameSearch Test</Button>
                <Button color='primary' variant='contained' onClick={() => this.getUserDestinations()}>getUserDestinations Test</Button>
                <form onSubmit={this.handleGeonameSubmit}>
                    <FormControl>
                        <TextField
                            type='text'
                            onChange={this.handleGeonameInput}
                            helperText='Enter a destination name: city, state, prefecture, country, ...'
                            label='Destination Search'
                            variant='filled'
                            InputProps={{
                                startAdornment: <InputAdornment position="start"><LocationSearchingIcon /></InputAdornment>
                            }}
                        />
                        <Button color='primary' variant='contained' type='submit' value='submit'>Submit Search</Button>
                    </FormControl>
                </form>
                {this.showGeonameFetchedData()}
            </div>
        )
    }
}

export default UserDestination;