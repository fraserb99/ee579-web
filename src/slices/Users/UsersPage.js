import { Grid, IconButton, makeStyles, Paper } from '@material-ui/core';
import { DataGrid } from '@material-ui/data-grid';
import { Delete, Edit } from '@material-ui/icons';
import React from 'react';
import { useDispatch } from 'react-redux';
import { compose } from 'recompose';
import { DeleteIconButton } from '../../components/Buttons/DeleteIconButton';
import { useError } from '../../infrastructure/api/hooks/useError';
import { useLoading } from '../../infrastructure/api/hooks/useLoading';
import { useTenantUsers } from './hooks/useTenantUsers';

const userCols = ({actions}) => [
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
        flex: 1,
        renderCell: (cell) => (
            <>
                {cell.value}
                <IconButton color='primary'>
                    <Edit fontSize='small' />
                </IconButton>
            </>
        )
    },
    {
        field: 'actions',
        headerName: 'Actions',
        flex: 0.4,
        renderCell: (row) => (
            <>
                <DeleteIconButton iconProps={{size: 'small'}} />
            </>
        )
    }
]

const rows = [
    {id: 1, name: 'Fraser Bell', email: 'fraser.bell11@gmail.com', role: 'Owner'}
]

const useStyles = makeStyles(theme => ({
    table: {
        padding: theme.spacing(0, 1)
    }
}))

export const UsersPage = () => {
    const classes = useStyles();
    const users = useTenantUsers();
    const loading = useLoading('users');
    const error = useError('users');
    const dispatch = useDispatch();

    return (
        <React.Fragment>
            <Paper>
                <div>
                    <DataGrid
                        className={classes.table}
                        rows={users}
                        columns={userCols({})}
                        pageSize={10}
                        disableColumnSelector
                        disableColumnReorder
                        disableSelectionOnClick
                        autoHeight
                        loading={loading}
                        error={error || undefined}
                    />
                </div>
            </Paper>
        </React.Fragment>
    )
}