import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { AccountCircle, ArrowDropDown, ArrowDropDownCircleOutlined, ArrowDropDownCircleRounded, ArrowDropDownOutlined, ArrowDropDownRounded, Dashboard, DeveloperBoard, ExitToApp, ExpandLess, ExpandMore, Layers, People, ScatterPlot, Settings, SwapHorizRounded } from '@material-ui/icons';
import { Accordion, AccordionSummary, Collapse, ListItem, ListItemIcon, ListItemText, Menu, MenuItem } from '@material-ui/core';
import { useCurrentUser, useSession } from '../../slices/Session/hooks';
import { Redirect, useHistory, useLocation } from 'react-router-dom';
import { connect, useDispatch, useSelector } from 'react-redux';
import { selectTenants } from '../../slices/Tenants/selectors';
import { getTenants } from '../../slices/Tenants/actions';
import { compose, lifecycle } from 'recompose';
import { bindActionCreators } from 'redux';
import * as tenantActions from '../../slices/Tenants/actions';
import { useCurrentTenant } from '../../slices/Tenants/hooks';
import { clearSession } from '../../slices/Session/actions';
import { useNavStyles } from './useNavStyles';
import { NavBar } from './NavBar';

const enhance = compose(
  connect(
    state => ({}),
    dispatch => ({
      tenantActions: bindActionCreators(tenantActions, dispatch)
    })
  ),
  lifecycle({
    componentDidMount: function componentDidMount() {
      this.props.tenantActions.getTenants();
    }
  })
)

export const NavContainer = enhance(({children}) => {
  const session = useSession();
  const currentUser = useCurrentUser();
  const classes = useNavStyles();
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();
  console.log(currentUser);
  
  const currentTenant = useCurrentTenant();
  const tenants = useSelector(selectTenants).filter(x => currentTenant && x.id !== currentTenant.id);

  const [open, setOpen] = useState(true);
  const [accountOpen, setAccountOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const menuOpen = Boolean(anchorEl);

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  const handleAccountToggle = () => {
    setAccountOpen(!accountOpen);
  }

  const handleMenuOpen = (e) => {
    setAnchorEl(e.currentTarget);
  }
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleSignOut = () => {
    dispatch(clearSession())
    history.push('/signin')
  }

  if (!session.get('token'))
    return <Redirect to='/signin' />

  return (
    <div className={classes.root}>
      <CssBaseline />
      <NavBar handleDrawerToggle={handleDrawerToggle} drawerOpen={open} />
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <ListItem>
            <ListItemIcon>
              <ScatterPlot fontSize='large' color='secondary' />
            </ListItemIcon>
            <ListItemText primary="EE579 IFTTT" primaryTypographyProps={{className: classes.brand}} />
          </ListItem>
        </div>
        <Divider />
        <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%'}}>
        <div>
        <List>
            <ListItem 
              button 
              selected={location.pathname === '/'} 
              onClick={() => history.push('/')}
            >
              <ListItemIcon className={classes.listItemIcon}>
                <Dashboard />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItem>
            <ListItem 
              button 
              selected={location.pathname.startsWith('/rules')} 
              onClick={() => history.push('/rules')}
            >
              <ListItemIcon className={classes.listItemIcon}>
                <SwapHorizRounded />
              </ListItemIcon>
              <ListItemText primary="Rules" />
            </ListItem>
            <ListItem 
              button 
              selected={location.pathname.startsWith('/devices')} 
              onClick={() => history.push('/devices')}
            >
              <ListItemIcon className={classes.listItemIcon}>
                <DeveloperBoard />
              </ListItemIcon>
              <ListItemText primary="Devices" />
            </ListItem>
            <ListItem 
              button 
              selected={location.pathname.startsWith('/users')} 
              onClick={() => history.push('/users')}
            >
              <ListItemIcon className={classes.listItemIcon}>
                <People />
              </ListItemIcon>
              <ListItemText primary="Users" />
            </ListItem>
            <ListItem 
              button 
              selected={location.pathname.startsWith('/groups')} 
              onClick={() => history.push('/groups')}
            >
              <ListItemIcon className={classes.listItemIcon}>
                <Layers />
              </ListItemIcon>
              <ListItemText primary="Device Groups" />
            </ListItem>
        </List>
        </div>
        <div>
        <List>
            <Collapse in={accountOpen} timeout="auto" unmountOnExit>
              <Divider />
              <List component="div" disablePadding>
                <ListItem 
                  button 
                  className={clsx(classes.nested, !open && classes.nestedClosed)}
                  onClick={handleSignOut}  
                >
                  <ListItemIcon>
                    <ExitToApp />
                  </ListItemIcon>
                  <ListItemText primary="Sign Out" />
                </ListItem>
                <ListItem button className={clsx(classes.nested, !open && classes.nestedClosed)}>
                  <ListItemIcon>
                    <Settings />
                  </ListItemIcon>
                  <ListItemText primary="Manage Account" />
                </ListItem>
              </List>
              <Divider />
            </Collapse>
            <ListItem 
              button
              onClick={handleAccountToggle}
              style={{paddingLeft: '14px'}}
            >
              <ListItemIcon>
                <AccountCircle fontSize='large' />
              </ListItemIcon>
              <ListItemText primary={currentUser.name} />
              {accountOpen ? <ExpandMore /> : <ExpandLess />}
            </ListItem>
        </List>
        </div>
        </div>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          {children}
        </Container>
      </main>
    </div>
  );
});