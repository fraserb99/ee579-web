import { Fab, IconButton, makeStyles, Paper, Typography } from '@material-ui/core';
import { Add } from '@material-ui/icons';
import React from 'react';
import { BlankState } from '../../components/BlankState/BlankState';
import { Rule } from './components/Rule';

const useStyles = makeStyles((theme) => ({
    addBtn: {
        backgroundColor: theme.palette.secondary,
        marginTop: theme.spacing(2)
    },
    fab: {
        position: 'absolute',
        bottom: theme.spacing(2),
        right: theme.spacing(2), 
        [theme.breakpoints.up('sm')]: {
            bottom: theme.spacing(4),
            right: theme.spacing(4),
        }
    },
}));

export const RulesPage = () => {
    const classes = useStyles();

    if (false) return (
        <BlankState message="You haven't added any routes yet, add one now to get started!">
            <IconButton color='secondary' className={classes.addBtn}>
                <Add fontSize='large' />
            </IconButton>
        </BlankState>
    )

    return (
        <React.Fragment>
            <Rule />
            <Fab color="primary" className={classes.fab}>
                <Add />
            </Fab>
        </React.Fragment>
    )
}