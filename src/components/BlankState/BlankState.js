import React from 'react';
import { makeStyles, Paper, Typography } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    blankState: {
        flexDirection: 'column',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: theme.spacing(4)
    },
    addBtn: {
        backgroundColor: theme.palette.secondary,
        marginTop: theme.spacing(2)
    }
}));

export const BlankState = ({message, children}) => {
    const classes = useStyles();

    return (
        <Paper className={classes.blankState}>
            <Typography variant='body1' component='div'>
                {message}
            </Typography>
            {children}
        </Paper>
    )
}