import { colors, Grid, Grow, makeStyles, Paper, Slider, Typography, useTheme } from '@material-ui/core';
import { DeveloperBoard, Whatshot } from '@material-ui/icons';
import React from 'react';

const useStyles = makeStyles(theme => ({
    container: {
        height: '100%',
        minHeight: theme.spacing(18)
    },
    device: {
        minHeight: theme.spacing(20),
        padding: theme.spacing(1),
        backgroundColor: theme.palette.background,
        marginTop: theme.spacing(2)
    },
    deviceHeader: {
        display: 'flex',
        alignItems: 'center',
        fontWeight: 500
    },
    deviceIcon: {
        marginRight: theme.spacing(1)
    }
}))

export const Device = ({type, TypeIcon, children, transitionIn}) => {
    const classes = useStyles();

    return (
        <Grow in={transitionIn} >
            <Paper elevation={5} className={classes.device}>
                <Grid container className={classes.container}>
                    <Grid item container xs={12} md={4} alignItems='center'>
                        <Grid item xs={12}>
                            <Typography className={classes.deviceHeader}>
                                <DeveloperBoard className={classes.deviceIcon} fontSize='large' />
                                Device Name
                            </Typography>
                            <Typography className={classes.deviceHeader}>
                                <TypeIcon className={classes.deviceIcon} fontSize='large' />
                                {type}
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid item container xs={12} md={8} alignItems='center' justify='center'>
                        <Grid item xs={10} style={{marginTop: type === 'Temperature' ? 36 : 8}}>
                            {children}
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>
        </Grow>
    )
}