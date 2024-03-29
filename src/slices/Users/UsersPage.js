import { colors, createMuiTheme, Fab, Grid, IconButton, makeStyles, MuiThemeProvider, Paper, Typography } from '@material-ui/core';
import { DataGrid } from '@material-ui/data-grid';
import { Add, CheckCircle, Delete, Edit, InsertInvitationRounded, Mail, Person, PersonOutline, PersonOutlined, Security } from '@material-ui/icons';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useRouteMatch } from 'react-router';
import { compose } from 'recompose';
import { DeleteIconButton } from '../../components/Buttons/DeleteIconButton';
import { useDeleteDialog } from '../../components/DeleteDialog/useDeleteDialog';
import { DataTable } from '../../components/Table/DataTable';
import { useError } from '../../infrastructure/api/hooks/useError';
import { useLoading } from '../../infrastructure/api/hooks/useLoading';
import { useCurrentRole, useCurrentUser } from '../Session/hooks';
import { removeUser } from './actions';
import { EditRoleModal } from './forms/EditRoleModal';
import { InviteUserModal } from './forms/InviteUserModal';
import { useTenantUsers } from './hooks/useTenantUsers';
import './table.css';

const statusTheme = createMuiTheme({
    palette: {
        secondary: colors.green,
    }
})

export const roleTheme = createMuiTheme({
    palette: {
        secondary: colors.amber,
    }
})

const userCols = ({handleDelete, classes, handleShowRoleModal, currentRole, currentUser}) => [
    {
        field: 'name',
        headerName: 'Name',
        flex: 1,
        valueFormatter: params => params.value ? params.value : '-'
    },
    {
        field: 'email',
        headerName: 'Email',
        flex: 1
    },
    {
        field: 'role',
        headerName: 'Role',
        flex: 0.4,
        renderCell: params => (
            <MuiThemeProvider theme={roleTheme}>
                {params.value === 'Owner' ? 
                    <Security className={classes.statusIcon} fontSize='small' color='secondary' /> 
                    :
                    <PersonOutline className={classes.statusIcon} fontSize='small' />
                }
                {params.value}
            </MuiThemeProvider>
        )
    },
    {
        field: 'status',
        headerName: 'Status',
        flex: 0.5,
        renderCell: params => (
            <MuiThemeProvider theme={statusTheme}>
                {params.value === 'Active' ? 
                    <CheckCircle className={classes.statusIcon} fontSize='small' color='secondary' /> 
                    : 
                    <Mail className={classes.statusIcon} fontSize='small' color='primary'/>
                }
                {params.value}
            </MuiThemeProvider>
        )
    },
    {
        field: 'actions',
        headerName: 'Actions',
        flex: 1,
        renderCell: (params) => params.row.id !== currentUser.id ? (
            <>
                <IconButton color='primary' onClick={handleShowRoleModal(params.row)}>
                    <Edit fontSize='small' />
                </IconButton>
                <DeleteIconButton 
                    iconProps={{size: 'small'}}
                    onClick={handleDelete(params.row)}
                />
            </>
        ) : '-',
        hide: currentRole !== 'Owner'
    }
]

const useStyles = makeStyles(theme => ({
    table: {
        padding: theme.spacing(0, 1),
        borderTop: 'none'
    },
    fab: {
        position: 'absolute',
        bottom: theme.spacing(2),
        right: theme.spacing(2),
    },
    title: {
        padding: theme.spacing(2, 3)
    },
    statusIcon: {
        marginRight: theme.spacing(1)
    }
}))

export const UsersPage = () => {
    const classes = useStyles();
    const users = useTenantUsers();
    const loading = useLoading('users');
    const error = useError('users');
    const setDeleteState = useDeleteDialog();
    const dispatch = useDispatch();
    const { url } = useRouteMatch();
    const history = useHistory();
    const currentRole = useCurrentRole();
    const currentUser = useCurrentUser();

    const [open, setOpen] = useState(false);

    const [roleOpen, setRoleOpen] = useState(false);
    const [item, setItem] = useState();

    const handleDelete = (user) => () => {
        setDeleteState({
            open: true,
            deleteText: `Are you sure you want to revoke ${user.name || user.email}'s access to this tenant?`,
            deleteAction: () => dispatch(removeUser(user.id)),
            btnText: 'Revoke'
        })
    }

    const handleInviteModalOpen = (state) => () => {
        setOpen(state);
    }

    const handleShowRoleModal = (item) => () => {
        setItem(item);
        setRoleOpen(true);
    }

    const handleCloseRoleModal = () => {
        setRoleOpen(false)
        setTimeout(() => setItem(null), 1000);
    }

    return (
        <React.Fragment>
            <Paper>
                <Typography variant='h3' className={classes.title}>
                    Users
                    <IconButton size='medium' color='secondary' onClick={handleInviteModalOpen(true)}>
                        <Add fontSize='large' />
                    </IconButton>
                </Typography>
                <DataTable
                    name='devices'
                    rows={users}
                    columns={userCols({handleDelete, classes, handleShowRoleModal, currentRole, currentUser})}
                    loading={loading}
                    error={error}
                />
            </Paper>
            <InviteUserModal
                show={open}
                setShow={setOpen}
                onSuccess={handleInviteModalOpen(false)}
            />
            <EditRoleModal
                show={roleOpen}
                setShow={handleCloseRoleModal}
                item={item}
                onSuccess={handleCloseRoleModal}
            />
        </React.Fragment>
    )
}