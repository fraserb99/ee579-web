import { Fab, Grid, IconButton, makeStyles, Paper, Typography } from '@material-ui/core';
import { DataGrid } from '@material-ui/data-grid';
import { Add, Delete, Edit, InsertInvitationRounded } from '@material-ui/icons';
import React from 'react';
import { useDispatch } from 'react-redux';
import { compose } from 'recompose';
import { DeleteIconButton } from '../../components/Buttons/DeleteIconButton';
import { useDeleteDialog } from '../../components/DeleteDialog/useDeleteDialog';
import { useError } from '../../infrastructure/api/hooks/useError';
import { useLoading } from '../../infrastructure/api/hooks/useLoading';
import { removeUser } from './actions';
import { useTenantUsers } from './hooks/useTenantUsers';
import './table.css';

const userCols = ({handleDelete}) => [
    {
        field: 'name',
        headerName: 'Name',
        flex: 1
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
    },
    {
        field: 'actions',
        headerName: 'Actions',
        flex: 1,
        renderCell: (params) => (
            <>
                <IconButton color='primary'>
                    <Edit fontSize='small' />
                </IconButton>
                <DeleteIconButton 
                    iconProps={{size: 'small'}}
                    onClick={handleDelete(params.row)}
                />
            </>
        )
    }
]

const useStyles = makeStyles(theme => ({
    table: {
        padding: theme.spacing(0, 1)
    },
    fab: {
        position: 'absolute',
        bottom: theme.spacing(2),
        right: theme.spacing(2),
    },
    title: {
        padding: theme.spacing(2, 3)
    }
}))

export const UsersPage = () => {
    const classes = useStyles();
    const users = useTenantUsers();
    const loading = useLoading('users');
    const error = useError('users');
    const setDeleteState = useDeleteDialog();
    const dispatch = useDispatch();

    const handleDelete = (user) => () => {
        console.log(user);
        setDeleteState({
            open: true,
            deleteText: `Are you sure you want to revoke ${user.name}'s access to this tenant?`,
            deleteAction: () => dispatch(removeUser(user.id))
        })
    }

    return (
        <React.Fragment>
            <Paper>
                <Typography variant='h3' className={classes.title}>
                    Users
                    <IconButton size='medium' color='secondary'>
                        <Add fontSize='large' />
                    </IconButton>
                </Typography>
                <DataGrid
                    className={classes.table}
                    rows={users}
                    columns={userCols({handleDelete})}
                    pageSize={10}
                    disableColumnSelector
                    disableColumnReorder
                    disableSelectionOnClick
                    autoHeight
                    loading={loading}
                    error={error || undefined}
                />
            </Paper>
        </React.Fragment>
    )
}