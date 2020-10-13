import React from 'react';
import './UserTripDisplay.css'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@material-ui/core';
// import { withStyles } from'@material-ui/core/styles;
// import IconButton from '@material-ui/core/IconButton';
// import DeleteIcon from '@material-ui/icons/Delete';
// import AddLocationIcon from '@material-ui/icons/AddLocation';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
// import Radium from 'radium';

type AcceptedProps = {
    openCreateDialog: boolean;
    openEditDialog: boolean;
    openDeleteDialog: boolean;
    allUserTrips: TripData[];
    sessionToken: string | undefined;
    editDialogData: TripData;
    allUserTripsMapper: () => (JSX.Element | undefined)[] | undefined;
    handleClickEditDialogOpen: (a: TripData) => any;
    handleEditDialogClose: () => any;
    handleClickDeleteDialogOpen: (a: TripData) => any;
    handleDeleteDialogClose: () => any;
    handleDeleteTrip: (b: any) => any;
    handleUpdateTripNameInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleUpdateTripBeginDateInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleUpdateTripEndDateInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleUpdateTrip: (e: React.FormEvent<HTMLFormElement>) => void;
    handleClickCreateDialogOpen: () => any
    handleCreateDialogClose: () => any;
    handleCreateTripNameInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleCreateTrip: (e: React.FormEvent<HTMLFormElement>) => void;
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
        // background: 'gray'
    },
    TableHead: {
        backgroundColor: 'magenta',
        color: 'white'
    },
    DialogContent: {
        // textAlign: 'center'
        justifyContent: 'center',
        alignItems: 'center'
    }
}

const UserTripDisplay: React.FunctionComponent<AcceptedProps> = (props) => {
    return (
        <div className='userTripDisplayMainDiv'>
            {/* // Dialog for CREATE Trip */}
            {/* // Maybe CREATE Dialog fits better in parent class */}
            <div>
                {/* // Table for READ (Show Trips) */}
                <TableContainer component={Paper}>
                    <Table style={styles.table} aria-label='simple table'>
                        <TableHead style={styles.TableHead}>
                            <TableRow style={styles.TableRow}>
                                <TableCell align='right'>id</TableCell>
                                <TableCell align='right'>TripName</TableCell>
                                <TableCell align='right'>Destinations Info</TableCell>
                                <TableCell align='right'>tripBeginDate</TableCell>
                                <TableCell align='right'>tripEndDate</TableCell>
                                <TableCell align='right'>userId</TableCell>
                                <TableCell align='right'>Edit Trip</TableCell>
                                <TableCell align='right'>Delete?</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {props.allUserTripsMapper()}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>

            {/* Dialog for UPDATE Trips */}
            <Dialog open={props.openEditDialog} onClose={props.handleEditDialogClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Edit Trip</DialogTitle>
                <form onSubmit={props.handleUpdateTrip}>
                    <DialogContent>
                        <DialogContentText>Edit Trip {props.editDialogData.tripName}</DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            label="Trip Name"
                            type="text"
                            variant='outlined'
                            fullWidth
                            onChange={props.handleUpdateTripNameInput}
                            required
                            helperText='Please enter a trip name.'
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            label="Trip Begin Date"
                            type="date"
                            variant='outlined'
                            fullWidth
                            onChange={props.handleUpdateTripBeginDateInput}
                            InputLabelProps={{ shrink: true }}
                            required
                            helperText='Please enter a valid trip begin date.'
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            label="Trip End Date"
                            type="date"
                            variant='outlined'
                            fullWidth
                            onChange={props.handleUpdateTripEndDateInput}
                            InputLabelProps={{ shrink: true }}
                            required
                            helperText='Please enter a valid trip end date.'
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={props.handleEditDialogClose} color="secondary" variant='contained'>Cancel</Button>
                        {/* <Button onClick={props.handleUpdateTrip(props.editDialogData.id)} color="primary" variant='contained'>Accept Changes</Button> */}
                        <Button type='submit' value='Submit' color="primary" variant='contained'>Accept Changes</Button>
                    </DialogActions>
                </form>
            </Dialog>

            {/* // Dialog for DELETE Trips */}
            <Dialog open={props.openDeleteDialog} onClose={props.handleDeleteDialogClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Delete Trip {props.editDialogData.tripName}</DialogTitle>
                <DialogContent style={styles.DialogContent}>
                    <DialogContentText>Confirm Delete</DialogContentText>
                    <Button onClick={props.handleDeleteTrip(props.editDialogData.id)} color="secondary" variant='contained'><DeleteForeverIcon /></Button>
                </DialogContent>
                <DialogActions>
                    <Button onClick={props.handleDeleteDialogClose} color="primary" variant='contained'>Cancel</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default UserTripDisplay;