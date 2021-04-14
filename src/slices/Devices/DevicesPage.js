import { colors, createMuiTheme, Fab, Grid, IconButton, makeStyles, MuiThemeProvider, Paper, Typography } from '@material-ui/core';
import { DataGrid } from '@material-ui/data-grid';
import { Add, CheckCircle, Delete, Edit, InsertInvitationRounded, Mail } from '@material-ui/icons';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useRouteMatch } from 'react-router';
import { compose } from 'recompose';
import { DeleteIconButton } from '../../components/Buttons/DeleteIconButton';
import { useDeleteDialog } from '../../components/DeleteDialog/useDeleteDialog';
import { useError } from '../../infrastructure/api/hooks/useError';
import { useLoading } from '../../infrastructure/api/hooks/useLoading';
import { useCurrentRole } from '../Session/hooks';
import { removeDevice } from './actions';
import { ClaimDevicesModal } from './forms/ClaimDevicesModal';
import { EditDeviceModal } from './forms/EditDeviceModal';
import { useDevices } from './hooks/useDevices';

const theme = createMuiTheme({
    palette: {
        secondary: colors.green,
    }
})

const deviceCols = ({handleDelete, classes, handleShowEditModal, currentRole}) => [
    {
        field: 'name',
        headerName: 'Name',
        flex: 1,
        valueFormatter: params => params.value ? params.value : '-'
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

export const DevicesPage = () => {
    const classes = useStyles();
    const devices = useDevices();
    const loading = useLoading('devices');
    const error = useError('devices');
    const setDeleteState = useDeleteDialog();
    const dispatch = useDispatch();
    const { url } = useRouteMatch();
    const history = useHistory();
    const currentRole = useCurrentRole();

    const [claimOpen, setClaimOpen] = useState(false);

    const [editOpen, setEditOpen] = useState(false);
    const [item, setItem] = useState();

    const handleDelete = (device) => () => {
        console.log(device);
        setDeleteState({
            open: true,
            deleteText: `Are you sure you want to remove ${device.name} from this tenant?`,
            helperText: 'This will not delete the device. You will still be able to claim add this device to this or another tenant later',
            deleteAction: () => dispatch(removeDevice(device.id)),
            btnText: 'Unclaim'
        })
    }

    const handleClaimDevices = () => {
        setClaimOpen(true);
    }

    const handleCloseClaim = () => {
        setClaimOpen(false);
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
                    Devices
                    <IconButton size='medium' color='secondary' onClick={handleClaimDevices}>
                        <Add fontSize='large' />
                    </IconButton>
                </Typography>
                <DataGrid
                    className={classes.table}
                    rows={devices}
                    columns={deviceCols({handleDelete, classes, handleShowEditModal, currentRole})}
                    pageSize={10}
                    disableColumnSelector
                    disableColumnReorder
                    disableSelectionOnClick
                    autoHeight
                    loading={loading && !devices.length}
                    error={error && !devices || undefined}
                />
            </Paper>
            {/* <InviteUserModal
                show={open}
                setShow={setOpen}
                onSuccess={handleInviteModalOpen(false)}
            /> */}
            <EditDeviceModal
                show={editOpen}
                setShow={handleCloseEditModal}
                item={item}
                onSuccess={handleCloseEditModal}
            />
            {claimOpen && <ClaimDevicesModal handleClose={handleCloseClaim} />}
        </React.Fragment>
    )
}