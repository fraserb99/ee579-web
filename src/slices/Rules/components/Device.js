import { colors, Grid, Grow, makeStyles, Paper, Slider, Typography, useTheme } from '@material-ui/core';
import { DeveloperBoard, LayersRounded, Whatshot } from '@material-ui/icons';
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
    peripheralType: {
        display: 'flex',
        alignItems: 'center',
        fontWeight: 500
    },
    deviceIcon: {
        marginRight: theme.spacing(1)
    },
    peripheralName: {
        paddingLeft: '43px'
    }
}))

export const Device = ({type, TypeIcon, children, transitionIn, peripheral}) => {
    const classes = useStyles();
    console.log(peripheral)

    return (
        <Grow in={transitionIn} >
            <Paper elevation={5} className={classes.device}>
                <Grid container className={classes.container}>
                    <Grid item container xs={12} md={4} alignItems='center'>
                        <Grid item xs={12} style={{overflow: 'hidden'}}>
                            <Typography className={classes.deviceHeader}>
                                {peripheral.device && 
                                    <>
                                        <DeveloperBoard className={classes.deviceIcon} fontSize='large' />
                                        {peripheral.device.name}
                                    </>
                                }
                                {peripheral.deviceGroup && 
                                    <>
                                        <LayersRounded className={classes.deviceIcon} fontSize='large' />
                                        {peripheral.deviceGroup.name}
                                    </>
                                }
                            </Typography>
                            <Typography className={classes.peripheralType}>
                                <TypeIcon className={classes.deviceIcon} fontSize='large' />
                                {type}
                            </Typography>
                            <Typography variant='body1' className={classes.peripheralName}>
                                {peripheral.peripheral}
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid item container xs={12} md={8} alignItems='center' justify='center'>
                        <Grid item xs={10} style={{marginTop: 36}}>
                            {children}
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>
        </Grow>
    )
}