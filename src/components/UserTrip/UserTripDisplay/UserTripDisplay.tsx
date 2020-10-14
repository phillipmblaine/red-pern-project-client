import React from 'react';
import './UserTripDisplay.css'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@material-ui/core';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

type AcceptedProps = {
    openCreateDialog: boolean;
    openEditDialog: boolean;
    openDeleteDialog: boolean;
    allUserTrips: TripData[];
    sessionToken: string | undefined;
    editDialogData: TripData;
    allUserTripsMapper: () => (JSX.Element | undefined)[] | undefined;
    handleClickEditDialogOpen: (a: TripData) => void;
    handleEditDialogClose: () => void;
    handleClickDeleteDialogOpen: (a: TripData) => void;
    handleDeleteDialogClose: () => void;
    handleDeleteTrip: (b: number | null) => () => void;
    handleUpdateTripNameInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleUpdateTripBeginDateInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleUpdateTripEndDateInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleUpdateTrip: (e: React.FormEvent<HTMLFormElement>) => void;
    handleClickCreateDialogOpen: () => void;
    handleCreateDialogClose: () => void;
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
    table: { minWidth: 650, },
    TableCell: {
        textAlign: 'center',
        color: 'white',
    },
    TableHead: {
        backgroundColor: 'magenta',
        color: 'white'
    },
    DialogContent: {
        justifyContent: 'center',
        alignItems: 'center'
    }
}

const UserTripDisplay: React.FunctionComponent<AcceptedProps> = (props) => {
    return (
        <div className='userTripDisplayMainDiv'>
            {/* // Dialog for CREATE Trip */}
            <div>
                {/* // Table for READ (Show Trips) */}
                <TableContainer component={Paper}>
                    <Table style={styles.table} aria-label='simple table'>
                        <TableHead style={styles.TableHead}>
                            <TableRow>
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