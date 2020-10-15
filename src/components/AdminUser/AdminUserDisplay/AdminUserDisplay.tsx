import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, FormControlLabel, FormLabel, Paper, Radio, RadioGroup, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@material-ui/core';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import Radium from 'radium';

type AcceptedProps = {
    allUsersMapper: () => (JSX.Element | undefined)[] | undefined;
    handleEditDialogClose: () => void;
    handleDeleteDialogClose: () => void;
    handleDeleteUser: (b: number | null) => () => void;
    openDeleteDialog: boolean;
    editDialogData: UserData;
    openEditDialog: boolean;
    updateRole: string;
    handleUpdateUsernameInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleUpdateFirstNameInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleUpdateLastNameInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleUpdateEmailInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleUpdateRoleInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
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
    table: { minWidth: 650, },
    TableCell: {
        textAlign: 'center',
        color: 'white',
    },
    TableHead: {
        backgroundColor: '#2880B3',
        color: 'white'
    },
    DialogContent: {
        justifyContent: 'center',
        alignItems: 'center'
    }
}

const AdminUserDisplay: React.FunctionComponent<AcceptedProps> = (props) => {
    return (
        <div className='adminUserDisplayMainDiv'>
            <TableContainer component={Paper}>
                <Table style={styles.table} aria-label='simple table'>
                    <TableHead style={styles.TableHead}>
                        <TableRow>
                            <TableCell align='right'>ID</TableCell>
                            <TableCell align='right'>Last Name</TableCell>
                            <TableCell align='right'>First Name</TableCell>
                            <TableCell align='right'>Username</TableCell>
                            <TableCell align='right'>Email</TableCell>
                            <TableCell align='right'>Role</TableCell>
                            <TableCell align='right'>Edit User</TableCell>
                            <TableCell align='right'>Delete</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {props.allUsersMapper()}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Dialog for UPDATE Users */}
            <Dialog open={props.openEditDialog} onClose={props.handleEditDialogClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">User {props.editDialogData.username}</DialogTitle>
                <form onSubmit={props.handleUpdateUser}>
                    <DialogContent>
                        <DialogContentText>Edit {props.editDialogData.username}</DialogContentText>
                        <TextField
                            required
                            defaultValue={props.editDialogData.firstName}
                            margin="dense"
                            label="firstName"
                            type="text"
                            variant='outlined'
                            fullWidth
                            onChange={props.handleUpdateFirstNameInput}
                            helperText='Please enter a first name.'
                            autoComplete='new-password'
                        />
                        <TextField
                            required
                            defaultValue={props.editDialogData.lastName}
                            margin="dense"
                            label="lastName"
                            type="text"
                            variant='outlined'
                            fullWidth
                            onChange={props.handleUpdateLastNameInput}
                            helperText='Please enter a last name.'
                            autoComplete='new-password'
                        />
                        <TextField
                            required
                            defaultValue={props.editDialogData.username}
                            margin="dense"
                            label="Username"
                            type="text"
                            variant='outlined'
                            fullWidth
                            onChange={props.handleUpdateUsernameInput}
                            helperText='Please enter a username.'
                            autoComplete='new-password'
                        />
                        <TextField
                            defaultValue={props.editDialogData.email}
                            required
                            margin="dense"
                            label="Email"
                            type="text"
                            variant='outlined'
                            fullWidth
                            autoComplete='new-password'
                            onChange={props.handleUpdateEmailInput}
                            inputProps={{ pattern: '[a-z0-9._%+-]+@[a-z0-9.-]+[a-z]{2,}$' }}
                            helperText="Please enter a valid email address: email@email.com"
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
            {console.log(props.updateRole)}
        </div>
    )
}

export default Radium(AdminUserDisplay);