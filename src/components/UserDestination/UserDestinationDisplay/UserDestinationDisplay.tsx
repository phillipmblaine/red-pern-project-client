import React from 'react';
import './UserDestinationDisplay.css';
import { Button, Checkbox, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, FormControlLabel, FormLabel, Input, InputLabel, Paper, Radio, RadioGroup, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@material-ui/core';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

type AcceptedProps = {
    allUserDestinationsMapper: () => (JSX.Element | undefined)[] | undefined;
    assignTripMapper: () => (JSX.Element | undefined)[] | undefined;
    editDialogData: DestinationData;
    openDeleteDialog: boolean;
    openEditDialog: boolean;
    handleDeleteDialogClose: () => void;
    handleDeleteDestination: (deleteDestinationId: number | null) => () => void;
    handleEditDialogClose: () => void;
    handleUpdateDescriptionInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleUpdateKindsInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleUpdateRatingInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleUpdateDestination: (e: React.FormEvent) => void;
    updateFavorite?: boolean;
    handleUpdateFavoriteInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleUpdateAssignTripInput: (e: any) => void;
    updateAssignTripId: number | null;
    updateRating?: number;
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
    table: { minWidth: 650 },
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
        justifyContent: 'center',
        alignItems: 'center'
    }
}

const UserDestinationDisplay: React.FunctionComponent<AcceptedProps> = (props) => {
    return (
        <div className='userDestinationDisplayMainDiv'>
            {/* // Table for READ (Show Destinations) */}
            <TableContainer component={Paper}>
                <Table style={styles.table} aria-label='simple-table'>
                    <TableHead style={styles.TableHead}>
                        <TableRow>
                            <TableCell align='right'>ID</TableCell>
                            <TableCell align='right'>Destination</TableCell>
                            <TableCell align='right'>Country</TableCell>
                            <TableCell align='right'>Latitude</TableCell>
                            <TableCell align='right'>Longitude</TableCell>
                            <TableCell align='right'>Description</TableCell>
                            <TableCell align='right'>Kinds</TableCell>
                            <TableCell align='right'>Rating</TableCell>
                            <TableCell align='right'>Favorite</TableCell>
                            <TableCell align='right'>Trip ID</TableCell>
                            <TableCell align='right'>Edit Destination</TableCell>
                            <TableCell align='right'>Delete</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {props.allUserDestinationsMapper()}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* // Dialog for UPDATE Destinations */}
            <Dialog open={props.openEditDialog} onClose={props.handleEditDialogClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Destination {props.editDialogData.name}</DialogTitle>
                <form onSubmit={props.handleUpdateDestination}>
                    <DialogContent>
                        <DialogContentText>Edit {props.editDialogData.name}</DialogContentText>
                        <TextField
                            autoFocus
                            multiline
                            defaultValue={props.editDialogData.description}
                            margin="dense"
                            label="Destination Description"
                            type="text"
                            variant='outlined'
                            fullWidth
                            onChange={props.handleUpdateDescriptionInput}
                            helperText='A description for your destination.'
                        />

                        <TextField
                            multiline
                            defaultValue={props.editDialogData.kinds}
                            margin="dense"
                            label="Destination Kinds"
                            type="text"
                            variant='outlined'
                            fullWidth
                            onChange={props.handleUpdateKindsInput}
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
                                onChange={props.handleUpdateAssignTripInput}
                                input={<Input id="demo-dialog-native" />}
                            >
                                <option aria-label="None">Select A Trip</option>
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