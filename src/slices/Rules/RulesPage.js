import { Fab, IconButton, makeStyles, Paper, Typography } from '@material-ui/core';
import { Add } from '@material-ui/icons';
import React from 'react';
import { useHistory } from 'react-router';
import { BlankState } from '../../components/BlankState/BlankState';
import { Rule } from './components/Rule';
import { rules } from './rulesExample';
import { useRules } from './hooks/useRules';
import { deleteRule } from './actions';
import { useDispatch } from 'react-redux';
import { useDeleteDialog } from '../../components/DeleteDialog/useDeleteDialog';

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
    const rules = useRules();
    const classes = useStyles();
    const history = useHistory();
    const setDeleteState = useDeleteDialog();
    const dispatch = useDispatch();
    const handleAdd = () => {
        history.push('rules/add');
    }

    const handleDelete = (rule) => () => {
        setDeleteState({
            open: true,
            deleteText: `Are you sure you want to delete ${rule.name}`,
            deleteAction: () => dispatch(deleteRule(rule.id)),
            btnText: 'Delete'
        })
    }

    if (!rules || !rules.length) return (
        <BlankState message="You haven't added any rules yet, add one now to get started!">
            <IconButton color='secondary' className={classes.addBtn} onClick={handleAdd}>
                <Add fontSize='large' />
            </IconButton>
        </BlankState>
    )

    return (
        <React.Fragment>
            {rules.map(x => <Rule rule={x} handleDelete={handleDelete} />)}
            
            <Fab color="secondary" className={classes.fab} onClick={handleAdd}>
                <Add />
            </Fab>
        </React.Fragment>
    )
}