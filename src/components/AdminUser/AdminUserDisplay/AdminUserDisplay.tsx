import React from 'react';
// import APIURL from '../../../helpers/environment';
import { Button, Checkbox, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, FormControlLabel, FormLabel, Input, InputLabel, Paper, Radio, RadioGroup, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@material-ui/core';
// import { withStyles } from '@material-ui/core'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { withStyles } from '@material-ui/core/styles';
import { ImportantDevices } from '@material-ui/icons';
import Radium from 'radium';

type AcceptedProps = {
    allUsersMapper: () => (JSX.Element | undefined)[] | undefined;
    handleEditDialogClose: () => any;
    handleDeleteDialogClose: () => any;
    handleDeleteUser: (b: any) => any;
    openDeleteDialog: boolean;
    editDialogData: UserData;
    openEditDialog: boolean;
    updateRole: string;
    handleUpdateUsernameInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleUpdateFirstNameInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleUpdateLastNameInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleUpdateEmailInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleUpdateRoleInput: (e: any) => any;
    handleUpdateUser: (e: React.FormEvent<HTMLFormElement>) => void;
}

interface UserData {
    id: number | null,
    firstName: string,
    lastName: string,
    username: string,
    email: string,
    role: string
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
        // backgroundColor: 'magenta',
        backgroundColor: '#2880B3',
        color: 'white'
    },
    DialogContent: {
        // textAlign: 'center'
        justifyContent: 'center',
        alignItems: 'center'
    }
}

const AdminUserDisplay: React.FunctionComponent<AcceptedProps> = (props) => {
    return (
        <div className='adminUserDisplayMainDiv'>
            {/* <h2>Hello from AdminUserDisplay.tsx.</h2> */}
            <TableContainer component={Paper}>
                <Table style={styles.table} aria-label='simple table'>
                    <TableHead style={styles.TableHead}>
                        <TableRow style={styles.TableRow}>
                            <TableCell align='right'>id</TableCell>
                            <TableCell align='right'>lastName</TableCell>
                            <TableCell align='right'>firstName</TableCell>
                            <TableCell align='right'>username</TableCell>
                            <TableCell align='right'>email</TableCell>
                            <TableCell align='right'>role</TableCell>
                            <TableCell align='right'>Edit User</TableCell>
                            <TableCell align='right'>Delete?</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {props.allUsersMapper()}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Dialog for UPDATE Users */}
            <Dialog open={props.openEditDialog} onClose={props.handleEditDialogClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Edit User</DialogTitle>
                <form onSubmit={props.handleUpdateUser}>
                    <DialogContent>
                        <DialogContentText>Edit User {props.editDialogData.username}</DialogContentText>
                        <TextField
                            // autoFocus
                            margin="dense"
                            label="firstName"
                            type="text"
                            variant='outlined'
                            fullWidth
                            onChange={props.handleUpdateFirstNameInput}
                            defaultValue={props.editDialogData.firstName}
                            // InputLabelProps={{ shrink: true }}
                            // required
                            helperText='Please enter a first name.'
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            label="lastName"
                            type="text"
                            variant='outlined'
                            fullWidth
                            onChange={props.handleUpdateLastNameInput}
                            defaultValue={props.editDialogData.lastName}
                            // required
                            helperText='Please enter a last name.'
                        />
                        <TextField
                            // autoFocus
                            margin="dense"
                            label="Username"
                            type="text"
                            variant='outlined'
                            fullWidth
                            onChange={props.handleUpdateUsernameInput}
                            // InputLabelProps={{ shrink: true }}
                            // required
                            helperText='Please enter a username.'
                        />
                        <TextField
                            // autoFocus
                            margin="dense"
                            label="Email"
                            type="text"
                            variant='outlined'
                            fullWidth
                            onChange={props.handleUpdateEmailInput}
                            // InputLabelProps={{ shrink: true }}
                            // required
                            helperText='Please enter a valid email address.'
                        />
                        <FormControl component="fieldset">
                            <FormLabel component="legend">ROLE</FormLabel>
                            <RadioGroup aria-label="role" name="updateRole" value={props.updateRole} onChange={props.handleUpdateRoleInput}>
                                <FormControlLabel value='admin' control={<Radio />} label="ADMIN" />
                                <FormControlLabel value='user' control={<Radio />} label="USER" />
                            </RadioGroup>
                        </FormControl>

                    </DialogContent>
                    <DialogActions>
                        <Button onClick={props.handleEditDialogClose} color="secondary" variant='contained'>Cancel</Button>
                        <Button type='submit' value='Submit' color="primary" variant='contained'>Accept Changes</Button>
                    </DialogActions>
                </form>
            </Dialog>

            {/* // Dialog for DELETE Users */}
            <Dialog open={props.openDeleteDialog} onClose={props.handleDeleteDialogClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Delete User {props.editDialogData.username}</DialogTitle>
                <DialogContent style={styles.DialogContent}>
                    <DialogContentText>Confirm Delete</DialogContentText>
                    <Button onClick={props.handleDeleteUser(props.editDialogData.id)} color="secondary" variant='contained'><DeleteForeverIcon /></Button>
                </DialogContent>
                <DialogActions>
                    <Button onClick={props.handleDeleteDialogClose} color="primary" variant='contained'>Cancel</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}


export default Radium(AdminUserDisplay);