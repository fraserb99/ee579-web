import { Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, Grid, IconButton, List, ListItem, ListItemIcon, ListItemSecondaryAction, ListItemText, ListSubheader, makeStyles, Step, StepButton, Stepper, Typography } from '@material-ui/core';
import { Add, PowerSettingsNew, Refresh, WbIncandescent, Wifi } from '@material-ui/icons';
import React, { useState } from 'react';
import Scrollbars from 'react-custom-scrollbars';
import { useDispatch } from 'react-redux';
import { useLoading } from '../../../infrastructure/api/hooks/useLoading';
import { getUnclaimed } from '../actions';
import { useUnclaimedDevices } from '../hooks/useUnclaimedDevices';
import { AddDeviceModal } from './AddDeviceModal';

const useClaimStyles = makeStyles(theme => ({
    deviceList: {
        padding: theme.spacing(0, 4.5)
    }
}));

const Instructions = () => (
        <List style={{minHeight: '400px'}}>
            <ListItem>
                <ListItemIcon>
                    <PowerSettingsNew fontSize='large' />
                </ListItemIcon>
                <ListItemText primary='Turn on the device(s) you would like to add' />
            </ListItem>
            <ListItem>
                <ListItemIcon>
                    <Wifi fontSize='large' />
                </ListItemIcon>
                <ListItemText primary='Make sure you are connected to the same network as your device(s)' />
            </ListItem>
        </List>
)

const ClaimStep = ({...props}) => {
    const devices = useUnclaimedDevices();
    const [showAdd, setShowAdd] = useState(false);
    const [item, setItem] = useState();
    const loading = useLoading('devices');
    const dispatch = useDispatch();
    const handleRefresh = () => {
        dispatch(getUnclaimed());
    }

    const handleShowAdd = device => () => {
        setItem(device);
        setShowAdd(true);
    }
    const handleCloseAdd = () => setShowAdd(false);
    console.log(devices);

    return (
        <>
            <Scrollbars autoHeight autoHeightMin={400} autoHeightMax={400}>
                <List>
                    <ListSubheader>
                        Devices
                        <IconButton color='primary' onClick={handleRefresh}>
                            <Refresh />
                        </IconButton>
                    </ListSubheader>
                    {devices && devices.map(x => 
                        <ListItem
                            button
                            onClick={handleShowAdd(x)}
                        >
                            <ListItemIcon color='secondary'>
                                <Add color='secondary' />
                            </ListItemIcon>
                            <ListItemText primary={x.id} />
                            <ListItemSecondaryAction>
                                <IconButton edge="end" color='primary' onClick={handleShowAdd}>
                                    <WbIncandescent />
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                    )}
                    {!devices.length && loading && 
                        <Grid container justify='center'>
                            <CircularProgress />
                        </Grid>
                    }
                    {!devices.length && !loading &&
                        <Grid container justify='center'>
                            <Typography variant='body1'>
                                No unclaimed devices were found on your network
                            </Typography>
                        </Grid>
                    }
                </List>
            </Scrollbars>
            <AddDeviceModal
                show={showAdd}
                setShow={setShowAdd}
                item={item}
                onSuccess={handleCloseAdd}
            />
        </>
    )
}

const StepContent = ({index, ...props}) => {
    return !index ?
        <Instructions />
        :
        <ClaimStep {...props} />
}

const StepActions = ({index, handleClose, setIndex}) => {

    return !index ?
        <>
            <Button onClick={handleClose}>
                Cancel
            </Button>
            <Button color="secondary" onClick={() => setIndex(index+1)}>
                Next
            </Button>
        </>
        :
        <>
            <Button onClick={() => setIndex(index-1)}>
                Back
            </Button>
            <Button color="secondary" onClick={handleClose}>
                Done
            </Button>
        </>
}

export const ClaimDevicesModal = ({handleClose}) => {
    const [activeStep, setActiveStep] = useState(0);
    const classes = useClaimStyles();

    return (
        <Dialog open onClose={handleClose} fullWidth maxWidth='md'>
            <DialogTitle>
                <Grid container>
                    <Grid item xs={6}>
                        <Stepper nonLinear activeStep={activeStep}>
                            <Step>
                                <StepButton onClick={() => setActiveStep(0)}>Set up devices</StepButton>
                            </Step>
                            <Step>
                                <StepButton onClick={() => setActiveStep(1)}>Add devices</StepButton>
                            </Step>
                        </Stepper>
                    </Grid>
                </Grid>
            </DialogTitle>
            <DialogContent className={classes.deviceList}>
                <StepContent index={activeStep} />
            </DialogContent>
            <DialogActions>
                <StepActions index={activeStep} setIndex={setActiveStep} handleClose={handleClose} />
            </DialogActions>
        </Dialog>
    )
}