import { Fab, IconButton, makeStyles, Paper, Typography } from '@material-ui/core';
import { Add } from '@material-ui/icons';
import React from 'react';
import { useHistory } from 'react-router';
import { BlankState } from '../../components/BlankState/BlankState';
import { Rule } from './components/Rule';
import { rules } from './rulesExample';

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
    const history = useHistory();
    const handleAdd = () => {
        history.push('rules/add');
    }

    if (!rules) return (
        <BlankState message="You haven't added any rules yet, add one now to get started!">
            <IconButton color='secondary' className={classes.addBtn}>
                <Add fontSize='large' />
            </IconButton>
        </BlankState>
    )

    return (
        <React.Fragment>
            {rules.map(x => <Rule rule={x} />)}
            
            <Fab color="secondary" className={classes.fab} onClick={handleAdd}>
                <Add />
            </Fab>
        </React.Fragment>
    )
}