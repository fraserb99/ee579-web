import React, { useContext, useEffect, useLayoutEffect, useState } from 'react';
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
import { AccountCircle, ArrowDropDown, ArrowDropDownCircleOutlined, ArrowDropDownCircleRounded, ArrowDropDownOutlined, ArrowDropDownRounded, Dashboard, DeveloperBoard, ExitToApp, ExpandLess, ExpandMore, Layers, People, ScatterPlot, Settings, SwapHorizRounded, ViewCarousel } from '@material-ui/icons';
import { Accordion, AccordionSummary, Collapse, ListItem, ListItemIcon, ListItemSecondaryAction, ListItemText, Menu, MenuItem, useMediaQuery } from '@material-ui/core';
import { useCurrentUser, useSession } from '../../slices/Session/hooks';
import { Redirect, Route, useHistory, useLocation } from 'react-router-dom';
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
import { AuthedRoutes } from '../../infrastructure/routes/AuthedRoutes';
import { TenantModalContext } from '../../slices/Tenants/TenantModalContext';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
      display: 'flex',
  },
  toolbar: {
      paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
      display: 'flex',
      alignItems: 'center',
      // justifyContent: 'flex-end',
      // padding: '0 8px',
      ...theme.mixins.toolbar,
  },
  appBar: {
      width: '100%',
      marginLeft: 0,
      [theme.breakpoints.up('sm')]: {
          marginLeft: theme.spacing(8),
          width: `calc(100% - ${theme.spacing(8)}px)`,
      },
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(['width', 'margin'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
      }),
  },
  appBarShift: {
      [theme.breakpoints.up('sm')]: {
          marginLeft: drawerWidth,
          width: `calc(100% - ${drawerWidth}px)`,
      },
      transition: theme.transitions.create(['width', 'margin'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
      }),
  },
  menuButton: {
      marginRight: 36,
  },
  menuButtonHidden: {
      display: 'none',
  },
  title: {
      flexGrow: 1,
      display: 'flex',
      alignItems: 'center'
  },
  drawerPaper: {
      position: 'relative',
      whiteSpace: 'nowrap',
      overflowX: 'hidden',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
      }),
  },
  drawerPaperClose: {
      overflowX: 'hidden',
      transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
      }),
      width: 0,
      [theme.breakpoints.up('sm')]: {
          width: theme.spacing(8),
      },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
    overflow: 'hidden'
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
  listItemIcon: {
    paddingLeft: theme.spacing(0.5)
  },
  brand: {
    fontWeight: 600
  },
  nested: {
    paddingLeft: theme.spacing(4),
    transition: theme.transitions.create('padding', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  nestedClosed: {
    paddingLeft: theme.spacing(2.5),
    transition: theme.transitions.create('padding', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  accountName: {
    textOverflow: 'ellipsis',
    overflow: 'hidden'
  }
}));

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
  const classes = useStyles();
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();
  const isSmallScreen = useMediaQuery('(max-width:600px)');
  const isMediumScreen = useMediaQuery('(max-width:1280px)')

  const [open, setOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [tenantModalOpen, setTenantModalOpen] = useContext(TenantModalContext);

  useLayoutEffect(() => {
    if (isSmallScreen) setOpen(!isSmallScreen)
  }, [isSmallScreen])

  useLayoutEffect(() => {
    if (isMediumScreen) setOpen(false);
  }, [isMediumScreen])

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  const handleAccountToggle = () => {
    setAccountOpen(!accountOpen);
  }

  const handleSignOut = () => {
    dispatch(clearSession())
    dispatch({type: 'RESET_ENTITIES'})
    history.push('/signin')
  }

  const handleSwitchTenant = () => {
    setTenantModalOpen(true);
  }

  if (!session.get('token'))
    return <Redirect to='/signin' />

  return (
    <div className={classes.root}>
      <CssBaseline />
      <NavBar handleDrawerToggle={handleDrawerToggle} drawerOpen={open} />
      <Drawer
        variant={isSmallScreen ? 'temporary' : 'permanent'}
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
        onClose={handleDrawerToggle}
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
            {/* <ListItem 
              button 
              selected={location.pathname === '/'} 
              onClick={() => history.push('/')}
            >
              <ListItemIcon className={classes.listItemIcon}>
                <Dashboard />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItem> */}
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
          <ListItem 
            button 
            onClick={handleSwitchTenant}
            style={{paddingLeft: '10px'}}
          >
            <ListItemIcon className={classes.listItemIcon}>
              <ViewCarousel fontSize='large'/>
            </ListItemIcon>
            <ListItemText style={{paddingLeft: '4px'}} primary="Switch Tenant" />
          </ListItem>
        </List>
        <Divider />
        <List>
            <Collapse in={accountOpen} timeout="auto" unmountOnExit>
              
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
              <ListItemText primary={currentUser.name} primaryTypographyProps={{className: classes.accountName}} />
              {accountOpen ? <ExpandMore /> : <ExpandLess />}
            </ListItem>
        </List>
        </div>
        </div>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="xl" className={classes.container}>
          <AuthedRoutes />
        </Container>
      </main>
    </div>
  );
});