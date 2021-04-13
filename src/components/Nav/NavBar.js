import React, { useState } from 'react';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { Button, CircularProgress, IconButton, ListItemIcon, ListItemText, makeStyles, Menu, MenuItem, Typography } from '@material-ui/core';
import { ExpandMore, Menu as MenuIcon, MoreVert, Security } from '@material-ui/icons';
import { useNavStyles } from './useNavStyles';
import { useCurrentTenant } from '../../slices/Tenants/hooks';
import { useSelector } from 'react-redux';
import { selectTenants } from '../../slices/Tenants/selectors';
import clsx from 'clsx';
import { useCurrentUser } from '../../slices/Session/hooks';

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
  }
}));

export const NavBar = ({handleDrawerToggle, drawerOpen}) => {
    const classes = useStyles();
    
    const currentUser = useCurrentUser();
    const currentTenant = useCurrentTenant();
    const tenants = useSelector(selectTenants).filter(x => currentTenant && x.id !== currentTenant.id);

    const [anchorEl, setAnchorEl] = useState(null);
    const menuOpen = Boolean(anchorEl);

    const handleMenuOpen = (e) => {
        setAnchorEl(e.currentTarget);
    }
    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    return (
        <AppBar position="absolute" className={clsx(classes.appBar, drawerOpen && classes.appBarShift)}>
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
              {currentTenant ? currentTenant.name : <CircularProgress />}
            </Typography>
        </Toolbar>
      </AppBar>
    )
}