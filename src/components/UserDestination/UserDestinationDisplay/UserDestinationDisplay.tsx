import React from 'react';
// import APIURL from '../../../helpers/environment';
import './UserDestinationDisplay.css';
import { Button, Checkbox, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, FormControlLabel, FormLabel, Input, InputLabel, Paper, Radio, RadioGroup, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@material-ui/core';
// import { withStyles } from '@material-ui/core'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { withStyles } from '@material-ui/core/styles';
import { ImportantDevices } from '@material-ui/icons';

type AcceptedProps = {
    allUserDestinationsMapper: () => (JSX.Element | undefined)[] | undefined;
    assignTripMapper: () => (JSX.Element | undefined)[] | undefined;
    editDialogData: DestinationData;
    openDeleteDialog: boolean;
    openEditDialog: boolean;
    handleDeleteDialogClose: () => any;
    handleDeleteDestination: (deleteDestinationId: any) => any;
    handleEditDialogClose: () => any
    handleUpdateDescriptionInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleUpdateKindsInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleUpdateRatingInput: (e: any) => any;
    handleUpdateDestination: (e: any) => any;
    updateFavorite: boolean;
    handleUpdateFavoriteInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleUpdateAssignTripInput: (e: any) => any;
    // handleUpdateAssignTripInput: (e: React.ChangeEvent<{ value: number }>) => void;
    updateAssignTripId: number | null;
    updateRating: number;
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
        backgroundColor: 'lime',
        color: 'white'
    },
    DialogContent: {
        // textAlign: 'center'
        justifyContent: 'center',
        alignItems: 'center'
    }
}

const RadioStyles = withStyles({
    root: {
        // '&:hover': {
        //     backgroundColor: '#5bc0de44',
        // },
        // '&:after': {
        //     backgroundColor: 'navy'
        }
    // },
    // icon: {
    //     borderRadius: '50%',
    //     width: 16,
    //     height: 16,
    //     boxShadow: 'inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)',
    //     backgroundColor: '#f5f8fa',
    //     backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))',
    //     '$root.Mui-focusVisible &': {
    //         outline: '2px auto rgba(19,124,189,.6)',
    //         outlineOffset: 2,
    //     },
    //     'input:hover ~ &': {
    //         backgroundColor: '#ebf1f5',
    //     },
    //     'input:disabled ~ &': {
    //         boxShadow: 'none',
    //         background: 'rgba(206,217,224,.5)',
    //     },
    // },
    // checkedIcon: {
    //     backgroundColor: '#137cbd',
    //     backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))',
    //     '&:before': {
    //         display: 'block',
    //         width: 16,
    //         height: 16,
    //         backgroundImage: 'radial-gradient(#000,#fff 28%,transparent 32%)',
    //         content: '""',
    //     },
    //     // '&:after': {
    //     //     color: 'green',
    //     //     backgroundColor: 'orange'
    //     // },
    //     'input:hover ~ &': {
    //         backgroundColor: '#106ba3',
    //     },
    // },
})(Radio)

// const FormControlStyles = withStyles({
//     root: {
//         background: 'orange',
//         color: 'purple'
//     }
// })(FormControl)

// const FormControlLabelStyles = withStyles({
//     root: {
//         background: 'darkslategray',
//         color: 'crimson'
//     }
// })(FormControlLabel)

const UserDestinationDisplay: React.FunctionComponent<AcceptedProps> = (props) => {
    return (
        <div className='userDestinationDisplayMainDiv'>
            {/* // Table for READ (Show Destinations) */}
            <TableContainer component={Paper}>
                <Table style={styles.table} aria-label='simple-table'>
                    <TableHead style={styles.TableHead}>
                        <TableRow style={styles.TableRow}>
                            <TableCell align='right'>id</TableCell>
                            <TableCell align='right'>Destination (Name)</TableCell>
                            <TableCell align='right'>Country</TableCell>
                            <TableCell align='right'>Latitude</TableCell>
                            <TableCell align='right'>Longitude</TableCell>
                            <TableCell align='right'>Description</TableCell>
                            <TableCell align='right'>Kinds</TableCell>
                            <TableCell align='right'>Rating</TableCell>
                            <TableCell align='right'>Favorite</TableCell>
                            <TableCell align='right'>tripId</TableCell>
                            <TableCell align='right'>Edit Destination</TableCell>
                            <TableCell align='right'>Delete?</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {props.allUserDestinationsMapper()}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* // Dialog for UPDATE Destinations */}
            <Dialog open={props.openEditDialog} onClose={props.handleEditDialogClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Edit Destination</DialogTitle>
                <form onSubmit={props.handleUpdateDestination}>
                    <DialogContent>
                        <DialogContentText>Edit Destination {props.editDialogData.name}</DialogContentText>
                        <TextField
                            autoFocus
                            multiline
                            margin="dense"
                            label="Destination Description"
                            type="text"
                            variant='outlined'
                            fullWidth
                            onChange={props.handleUpdateDescriptionInput}
                            // required
                            helperText='A description for your destination.'
                        />

                        <TextField
                            multiline
                            // autoFocus
                            margin="dense"
                            label="Destination Kinds"
                            type="text"
                            variant='outlined'
                            fullWidth
                            onChange={props.handleUpdateKindsInput}
                            // InputLabelProps={{ shrink: true }}
                            // required
                            helperText='What kind(s) of things to see and do at this destination? Notes to write down and remember for later ...'
                        />

                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={props.updateFavorite}
                                    onChange={props.handleUpdateFavoriteInput}
                                    inputProps={{ 'aria-label': 'primary checkbox' }}
                                    color='primary'
                                />
                            }
                            label='Mark as Favorite?'
                        /><br /><br />

                        <FormControl>
                            <InputLabel htmlFor="demo-dialog-native">Trip Assignment</InputLabel>
                            <Select
                                native
                                // value={age}
                                onChange={props.handleUpdateAssignTripInput}
                                input={<Input id="demo-dialog-native" />}
                            >
                                <option id='oID' aria-label="None">No Trip Assigned</option>
                                {props.assignTripMapper()}
                            </Select>
                        </FormControl><br /><br />

                        <FormControl component="fieldset">
                            <FormLabel component="legend">Rating</FormLabel>
                            <RadioGroup aria-label="Rating" name="updateRating" value={props.updateRating} onChange={props.handleUpdateRatingInput}>
                                <FormControlLabel value={1} control={<Radio />} label="1" />
                                <FormControlLabel value={2} control={<Radio />} label="2" />
                                <FormControlLabel value={3} control={<Radio />} label="3" />
                                <FormControlLabel value={4} control={<Radio />} label="4" />
                                <FormControlLabel value={5} control={<Radio />} label="5" />
                                {/* <FormControlLabelStyles value={1} control={<RadioStyles />} label="1" />
                                <FormControlLabel value={2} control={<RadioStyles />} label="2" />
                                <FormControlLabel value={3} control={<RadioStyles />} label="3" />
                                <FormControlLabel value={4} control={<RadioStyles />} label="4" />
                                <FormControlLabel value={5} control={<RadioStyles />} label="5" /> */}
                            </RadioGroup>
                        </FormControl>

                    </DialogContent><br />
                    <DialogActions>
                        <Button onClick={props.handleEditDialogClose} color="secondary" variant='contained'>Cancel</Button>
                        <Button type='submit' value='Submit' color="primary" variant='contained'>Accept Changes</Button>
                    </DialogActions>
                </form>
            </Dialog>

            {/* // Dialog for DELETE Destinations */}
            <Dialog open={props.openDeleteDialog} onClose={props.handleDeleteDialogClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Delete Destination {props.editDialogData.name}</DialogTitle>
                <DialogContent style={styles.DialogContent}>
                    <DialogContentText>Confirm Delete</DialogContentText>
                    <Button onClick={props.handleDeleteDestination(props.editDialogData.id)} color="secondary" variant='contained'><DeleteForeverIcon /></Button>
                </DialogContent>
                <DialogActions>
                    <Button onClick={props.handleDeleteDialogClose} color="primary" variant='contained'>Cancel</Button>
                </DialogActions>
            </Dialog>
        </div >
    )
}

export default UserDestinationDisplay;