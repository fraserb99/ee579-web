import React, { useState } from 'react';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { Button, IconButton, Menu, MenuItem, Typography } from '@material-ui/core';
import { ExpandMore, Menu as MenuIcon, MoreVert } from '@material-ui/icons';
import { useNavStyles } from './useNavStyles';
import { useCurrentTenant } from '../../slices/Tenants/hooks';
import { useSelector } from 'react-redux';
import { selectTenants } from '../../slices/Tenants/selectors';
import clsx from 'clsx';

export const NavBar = ({handleDrawerToggle, drawerOpen}) => {
    const classes = useNavStyles();
    
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
                <Button variant='text' color='inherit' onClick={handleMenuOpen}>
                    <Typography component="h1" variant="h6" className={classes.title}>
                    {currentTenant && currentTenant.name}
                    <ExpandMore fontSize='large' />
                    </Typography>
                </Button>
            </Typography>
          
            <IconButton color='inherit' edge='end' style={{float: 'right'}}>
                <MoreVert />
            </IconButton>
        </Toolbar>
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
              vertical: -40,
            //   horizontal: -16,
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
      </AppBar>
    )
}