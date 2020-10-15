import React from 'react';
import APIURL from '../../helpers/environment';
import './AdminUser.css';
import { Button, Snackbar, TableCell, TableRow } from '@material-ui/core';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import AdminUserDisplay from './AdminUserDisplay/AdminUserDisplay';

type AdminUserState = {
    allUsersData: UserData[];
    openEditDialog: boolean;
    openDeleteDialog: boolean;
    editDialogData: UserData;
    emptyEditDialogData: UserData;
    openUpdatedAlert: boolean;
    openDeletedAlert: boolean;
    updateUsername: string;
    updateFirstName: string;
    updateLastName: string;
    updateEmail: string;
    updateRole: string;
}

type AcceptedProps = { sessionToken: string | undefined; }

interface UserData {
    id: number | null,
    firstName: string,
    lastName: string,
    username: string,
    email: string,
    role: string
}

class AdminUser extends React.Component<AcceptedProps, AdminUserState>{
    constructor(props: AcceptedProps) {
        super(props)
        this.state = {
            allUsersData: [],
            openDeleteDialog: false,
            editDialogData: {
                id: null,
                firstName: '',
                lastName: '',
                username: '',
                email: '',
                role: ''
            },
            emptyEditDialogData: {
                id: null,
                firstName: '',
                lastName: '',
                username: '',
                email: '',
                role: ''
            },
            openUpdatedAlert: false,
            openDeletedAlert: false,
            openEditDialog: false,
            updateUsername: '',
            updateFirstName: '',
            updateLastName: '',
            updateEmail: '',
            updateRole: ''
        }
    }

    getAllUsers = (): void => {
        console.log('AdminUser.tsx -> getAllUsers.')
        if (this.props.sessionToken !== undefined) {
            fetch(`${APIURL}/user/getallusers`, {
                method: 'GET',
                headers: new Headers({
                    'Content-Type': 'application/json',
                    Authorization: this.props.sessionToken
                })
            })
                .then(response => response.json())
                .then((fetchedUserData: UserData[]) => {
                    this.setState({ allUsersData: fetchedUserData })
                })
                .then(() => console.log('allUsersData:', this.state.allUsersData))
                .catch(error => console.log(error))
        }
    }

    allUsersMapper = () => {
        if (this.props.sessionToken !== undefined
            && this.state.allUsersData !== undefined
            && this.state.allUsersData !== null
            && this.state.allUsersData !== []
            && this.state.allUsersData.length !== 0) {
            console.log('AdminUser.tsx -> allUsersMapper.')
            return this.state.allUsersData.map((value: UserData, index: number): (JSX.Element | undefined) => {
                if (value !== null) {
                    return (
                        <TableRow key={index}>
                            <TableCell align='right' component='th' scope='row'>{value.id}</TableCell>
                            <TableCell align='right' component='th' scope='row'>{value.lastName}</TableCell>
                            <TableCell align='right' component='th' scope='row'>{value.firstName}</TableCell>
                            <TableCell align='right' component='th' scope='row'>{value.username}</TableCell>
                            <TableCell align='right' component='th' scope='row'>{value.email}</TableCell>
                            <TableCell align='right' component='th' scope='row'>{value.role}</TableCell>
                            <TableCell align='right' component='th' scope='row'>
                                <IconButton color='primary' onClick={this.handleClickEditDialogOpen(value)}><PersonPinIcon /></IconButton>
                            </TableCell>
                            <TableCell align='right' component='th' scope='row'>
                                <IconButton color='secondary' aria-label='delete' onClick={this.handleClickDeleteDialogOpen(value)}><DeleteIcon /></IconButton>
                            </TableCell>
                        </TableRow>
                    )
                }
            })
        }
    }

    handleClickEditDialogOpen = (a: UserData) => () => {
        console.log('AdminUser.tsx -> handleClickEditDialogOpen.')
        this.setState({
            openEditDialog: true,
            editDialogData: a,
            updateFirstName: a.firstName,
            updateLastName: a.lastName,
            updateUsername: a.username,
            updateEmail: a.email,
            updateRole: a.role
        })
    }

    handleEditDialogClose = () => {
        console.log('AdminUser.tsx -> handleEditDialogClose.')
        this.setState({ openEditDialog: false })
    }

    handleUpdateUsernameInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
        console.log('AdminUser.tsx -> handleUpdateUsernameInput.')
        this.setState({ updateUsername: e.target.value })
    }

    handleUpdateFirstNameInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
        console.log('AdminUser.tsx -> handleUpdateFirstNameInput.')
        this.setState({ updateFirstName: e.target.value })
    }

    handleUpdateLastNameInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
        console.log('AdminUser.tsx -> handleUpdateLastNameInput.')
        this.setState({ updateLastName: e.target.value })
    }

    handleUpdateEmailInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
        console.log('AdminUser.tsx -> handleUpdateEmailInput.')
        this.setState({ updateEmail: e.target.value })
    }

    handleUpdateRoleInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
        console.log('AdminUser.tsx -> handleUpdateRoleInput.')
        this.setState({ updateRole: ((e.target as HTMLInputElement).value) })
    }

    handleUpdateUser = (e: React.FormEvent): void => {
        e.preventDefault()
        console.log('AdminUser.tsx -> handleUpdateUser.')
        if (this.state.editDialogData.id !== null) {
            this.adminUpdateUser(this.state.editDialogData.id)
        }
        this.setState({ openEditDialog: false })
    }

    handleClickDeleteDialogOpen = (a: UserData) => () => {
        console.log('AdminUser.tsx -> handleClickDeleteDialogOpen.')
        this.setState({
            openDeleteDialog: true,
            editDialogData: a
        })
    }

    handleDeleteDialogClose = () => {
        console.log('AdminUser.tsx -> handleDeleteDialogClose.')
        this.setState({ openDeleteDialog: false })
    }

    handleDeleteUser = (b: number | null) => () => {
        console.log('AdminUser.tsx -> handleDeleteUser.')
        this.adminDeleteUser(b)
        this.setState({
            editDialogData: this.state.emptyEditDialogData,
            openDeleteDialog: false
        })
    }

    UserUpdatedAlert(props: AlertProps) {
        console.log('AdminUser.tsx -> UserUpdatedAlert.')
        return <MuiAlert elevation={6} variant="filled" {...props} />;
    }

    UserDeletedAlert(props: AlertProps) {
        console.log('AdminUser.tsx -> UserDeletedAlert.')
        return <MuiAlert elevation={6} variant="filled" {...props} />;
    }

    handleUpdatedAlertOpen = () => { this.setState({ openUpdatedAlert: true }) }
    handleUpdatedAlertClose = () => { this.setState({ openUpdatedAlert: false }) }
    handleDeletedAlertOpen = () => { this.setState({ openDeletedAlert: true }) }
    handleDeletedAlertClose = () => { this.setState({ openDeletedAlert: false }) }

    showAllUsers = () => {
        return (
            this.state.allUsersData.length !== 0 && this.state.allUsersData !== []
                ? (
                    <AdminUserDisplay
                        allUsersMapper={this.allUsersMapper}
                        openDeleteDialog={this.state.openDeleteDialog}
                        handleDeleteDialogClose={this.handleDeleteDialogClose}
                        editDialogData={this.state.editDialogData}
                        handleDeleteUser={this.handleDeleteUser}
                        openEditDialog={this.state.openEditDialog}
                        handleEditDialogClose={this.handleEditDialogClose}
                        handleUpdateFirstNameInput={this.handleUpdateFirstNameInput}
                        handleUpdateLastNameInput={this.handleUpdateLastNameInput}
                        handleUpdateUsernameInput={this.handleUpdateUsernameInput}
                        handleUpdateEmailInput={this.handleUpdateEmailInput}
                        handleUpdateRoleInput={this.handleUpdateRoleInput}
                        handleUpdateUser={this.handleUpdateUser}
                        updateRole={this.state.updateRole} />
                ) : (
                    <div></div>
                )
        )
    }
    // U (PUT) //
    adminUpdateUser = (updateUserId: number) => {
        console.log('AdminUser.tsx -> adminUpdateUser.')
        if (this.props.sessionToken !== undefined) {
            fetch(`${APIURL}/user/edit/${updateUserId}`, {
                method: 'PUT',
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'Authorization': this.props.sessionToken,
                }),
                body: JSON.stringify(
                    {
                        user: {
                            firstName: this.state.updateFirstName,
                            lastName: this.state.updateLastName,
                            username: this.state.updateUsername,
                            role: this.state.updateRole,
                            email: this.state.updateEmail
                        }
                    })
            })
                .then(response => {
                    if (response.ok === true) {
                        return response.json()
                            .then(updatedData => {
                                console.log(`Trip at id ${updateUserId} updated.`)
                                console.log('updatedData:', updatedData)
                                this.handleUpdatedAlertOpen()
                            })
                    } else { console.log('User not updated.') }
                })
                .then(() => this.getAllUsers())
                .catch((error: Error) => console.log(error))
        } else { console.log('User not updated.') }
    }

    // D (DELETE) //
    adminDeleteUser = (deleteUserId: number | null) => {
        console.log('AdminUser.tsx -> adminDeleteUser.')
        if (this.props.sessionToken !== undefined) {
            fetch(`${APIURL}/user/delete/${deleteUserId}`, {
                method: 'DELETE',
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'Authorization': this.props.sessionToken,
                })
            })
                .then(response => {
                    console.log(response.ok)
                    if (response.ok === true) {
                        console.log(`User with the id ${deleteUserId} deleted.`)
                        this.handleDeletedAlertOpen()
                    } else {
                        console.log('User not deleted.')
                    }
                })
                .then(() => this.getAllUsers())
                .catch((error: Error) => console.log(error))
        } else { console.log('User not deleted.') }
    }

    render() {
        return (
            <div className='adminUserMainDiv'>
                <h2>Manage Users</h2>
                <Button variant='contained' color='primary' onClick={() => this.getAllUsers()}>&#8595; Show All Users &#8595;</Button>
                {this.showAllUsers()}
                <br/>

                <Snackbar open={this.state.openUpdatedAlert} autoHideDuration={5000} onClose={this.handleUpdatedAlertClose}>
                    <this.UserUpdatedAlert onClose={this.handleUpdatedAlertClose} severity="warning">
                        User Updated.
                    </this.UserUpdatedAlert>
                </Snackbar>

                <Snackbar open={this.state.openDeletedAlert} autoHideDuration={5000} onClose={this.handleDeletedAlertClose}>
                    <this.UserDeletedAlert onClose={this.handleDeletedAlertClose} severity="error">
                        User Deleted.
                    </this.UserDeletedAlert>
                </Snackbar>
                {console.log(this.state.updateEmail)}
            </div>
        )
    }
}

export default AdminUser;