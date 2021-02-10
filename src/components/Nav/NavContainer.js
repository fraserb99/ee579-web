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
import { ArrowDropDown, Dashboard, DeveloperBoard, Layers, People, ScatterPlot, SwapHorizRounded } from '@material-ui/icons';
import { Accordion, AccordionSummary, ListItem, ListItemIcon, ListItemText, Menu, MenuItem } from '@material-ui/core';
import { useSession } from '../../slices/Session/hooks';
import { Redirect, useHistory, useLocation } from 'react-router-dom';
import { connect, useDispatch, useSelector } from 'react-redux';
import { selectTenants } from '../../slices/Tenants/selectors';
import { getTenants } from '../../slices/Tenants/actions';
import { compose, lifecycle } from 'recompose';
import { bindActionCreators } from 'redux';
import * as tenantActions from '../../slices/Tenants/actions';
import { useCurrentTenant } from '../../slices/Tenants/hooks';

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
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
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
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
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
  const classes = useStyles();
  const location = useLocation();
  const history = useHistory();
  
  const currentTenant = useCurrentTenant();
  const tenants = useSelector(selectTenants).filter(x => x.id !== currentTenant.id);

  const [open, setOpen] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);
  const menuOpen = Boolean(anchorEl);

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  const handleMenuOpen = (e) => {
    setAnchorEl(e.currentTarget);
  }
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  if (!session.get('token'))
    return <Redirect to='/signin' />

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerToggle}
            className={clsx(classes.menuButton)}
          >
            <MenuIcon />
          </IconButton>
          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
            {currentTenant && currentTenant.name}
            <IconButton onClick={handleMenuOpen} color='inherit'>
              <ArrowDropDown />
            </IconButton>
          </Typography>
          <Menu
            id="long-menu"
            anchorEl={anchorEl}
            keepMounted
            open={menuOpen}
            onClose={handleMenuClose}
            PaperProps={{
              style: {
                maxHeight: 300,
                width: '40ch',
              },
            }}
            transformOrigin={{
              vertical: 0,
              horizontal: -40,
            }}
          >
            <MenuItem disabled>
              {currentTenant && currentTenant.name}
            </MenuItem>
            {tenants && tenants.map(x => 
              <MenuItem>
                {x.name}
              </MenuItem>
            )}
          </Menu>
        </Toolbar>
      </AppBar>
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
        <List>
          <div>
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
          </div>
        </List>
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