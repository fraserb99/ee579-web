import { Avatar, colors, createStyles, Dialog, DialogTitle, Divider, IconButton, List, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText, makeStyles } from '@material-ui/core';
import { Add, Check, Edit } from '@material-ui/icons';
import React, { useContext } from 'react';
import { useCurrentTenant, useTenants } from './hooks';
import { Scrollbars } from 'react-custom-scrollbars';
import { useDispatch } from 'react-redux';
import { switchTenant } from './actions';
import { useHistory } from 'react-router';
import { TenantModalContext } from './TenantModalContext';

const useStyles = makeStyles((theme) => ({
    check: {
        backgroundColor: colors.red
    }
}))

export const SwitchTenantModal = () => {
    const classes = useStyles();
    const [open, setOpen] = useContext(TenantModalContext);

    const tenants = useTenants();
    const currentTenant = useCurrentTenant();

    const dispatch = useDispatch();
    const history = useHistory();
    
    const handleClose = () => {
        setOpen(false);
    }

    const handleSwitchTenant = id => () => {
        handleClose();
        dispatch({
            type: 'RESET_ENTITIES',
            payload: {
                except: ['tenants']
            }
        });
        dispatch(switchTenant(id));
        // history.push('/');
    }

    return (
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth='sm'>
            <DialogTitle>Switch Tenant</DialogTitle>
            <Scrollbars 
                autoHeight
                autoHeightMax={300}
            >
            <List>
                {tenants && currentTenant && tenants.map(x => x.id === currentTenant.id ? 
                    <ListItem
                        selected
                    >
                        <ListItemAvatar className={classes.check}>
                            <Avatar className={classes.check}>
                                <Check color='secondary' />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={x.name} />
                        <ListItemSecondaryAction>
                            <IconButton edge="end" color='primary'>
                                <Edit />
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                    :
                    <ListItem
                        button
                        onClick={handleSwitchTenant(x.id)}
                    >
                        <ListItemText inset primary={x.name} />
                        <ListItemSecondaryAction>
                            <IconButton edge="end" color='primary'>
                                <Edit />
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                )}
            </List>
            </Scrollbars>
            <Divider />
            <List>
                <ListItem autoFocus button onClick={() => {}}>
                    <ListItemAvatar>
                        <Avatar>
                            <Add />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="Create new tenant" />
                </ListItem>
            </List>
        </Dialog>
    )
}