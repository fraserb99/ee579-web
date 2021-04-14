import { colors, createMuiTheme, Fab, Grid, IconButton, makeStyles, MuiThemeProvider, Paper, Typography } from '@material-ui/core';
import { DataGrid } from '@material-ui/data-grid';
import { Add, CheckCircle, Delete, Edit, InsertInvitationRounded, Mail } from '@material-ui/icons';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useRouteMatch } from 'react-router';
import { compose } from 'recompose';
import { DeleteIconButton } from '../../components/Buttons/DeleteIconButton';
import { useDeleteDialog } from '../../components/DeleteDialog/useDeleteDialog';
import { DataTable } from '../../components/Table/DataTable';
import { useError } from '../../infrastructure/api/hooks/useError';
import { useLoading } from '../../infrastructure/api/hooks/useLoading';
import { useCurrentRole } from '../Session/hooks';
import { deleteDeviceGroup } from './actions';
import { AddDeviceGroupModal } from './forms/AddDeviceGroupModal';
import { EditDeviceGroupModal } from './forms/EditDeviceGroupModal';
import { useDeviceGroups } from './hooks/useDeviceGroups';

const theme = createMuiTheme({
    palette: {
        secondary: colors.green,
    }
})

const deviceGroupCols = ({handleDelete, classes, handleShowEditModal, currentRole}) => [
    {
        field: 'name',
        headerName: 'Name',
        flex: 1,
        valueFormatter: params => params.value ? params.value : '-'
    },
    {
        field: 'totalDevices',
        headerName: 'Total Devices',
        flex: 1,
    },
    {
        field: 'actions',
        headerName: 'Actions',
        flex: 1,
        renderCell: (params) => (
            <>
                <IconButton color='primary' onClick={handleShowEditModal(params.row)}>
                    <Edit fontSize='small' />
                </IconButton>
                <DeleteIconButton 
                    iconProps={{size: 'small'}}
                    onClick={handleDelete(params.row)}
                />
            </>
        ),
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
    },
    statusIcon: {
        marginRight: theme.spacing(1)
    }
}))

export const DeviceGroupsPage = () => {
    const classes = useStyles();
    const deviceGroups = useDeviceGroups();
    const loading = useLoading('devicegroups');
    const error = useError('devicegroups');
    const setDeleteState = useDeleteDialog();
    const dispatch = useDispatch();
    const { url } = useRouteMatch();
    const history = useHistory();
    const currentRole = useCurrentRole();

    const [addOpen, setAddOpen] = useState(false);

    const [editOpen, setEditOpen] = useState(false);
    const [item, setItem] = useState();

    const handleDelete = (deviceGroup) => () => {
        console.log(deviceGroup);
        setDeleteState({
            open: true,
            deleteText: `Are you sure you want to delete ${deviceGroup.name}?`,
            helperText: 'This will also delete any rules that the group is involved in',
            deleteAction: () => dispatch(deleteDeviceGroup(deviceGroup.id)),
        })
    }

    const handleAdd = () => {
        setAddOpen(true);
    }

    const handleCloseAdd = () => {
        setAddOpen(false);
    }

    const handleShowEditModal = (item) => () => {
        setItem(item);
        setEditOpen(true);
    }

    const handleCloseEditModal = () => {
        setEditOpen(false)
        setTimeout(() => setItem(null), 1000);
    }

    return (
        <React.Fragment>
            <Paper>
                <Typography variant='h3' className={classes.title}>
                    Device Groups
                    <IconButton size='medium' color='secondary' onClick={handleAdd}>
                        <Add fontSize='large' />
                    </IconButton>
                </Typography>
                <DataTable
                    name='device groups'
                    rows={deviceGroups}
                    columns={deviceGroupCols({handleDelete, classes, handleShowEditModal, currentRole})}
                    loading={loading}
                    error={error}
                />
            </Paper>
            <AddDeviceGroupModal
                show={addOpen}
                setShow={setAddOpen}
                item={item}
                onSuccess={handleCloseAdd}
            />
            <EditDeviceGroupModal
                show={editOpen}
                setShow={handleCloseEditModal}
                item={item}
                onSuccess={handleCloseEditModal}
            />
        </React.Fragment>
    )
}