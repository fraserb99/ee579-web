import { Button, Collapse, colors, createMuiTheme, Divider, Grid, Grow, Hidden, IconButton, makeStyles, Paper, ThemeProvider, Typography } from '@material-ui/core';
import { ArrowDownward, ArrowForward, Delete, Edit, ExpandLess, ExpandMore } from '@material-ui/icons';
import React, { useState } from 'react';
import { Device } from './Device';
import { InputDevice } from './InputDevice';
import { OutputDevice } from './OutputDevice';

const actionsTheme = createMuiTheme({
    palette: {
        secondary: colors.red
    },
})

const useStyles = makeStyles(theme => ({
    ruleContainer: {
        marginBottom: theme.spacing(2)
    },
    rule: {
        padding: theme.spacing(1.5)
    },
    title: {
        fontWeight: 500,
        lineHeight: '48px'
    },
    actionBtn: {
        float: 'right'
    },
    expand: {
        width: '100%',
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0
    },
    header: {
        paddingBottom: theme.spacing(1),
        paddingLeft: theme.spacing(1.5)
    },
    more: {
        width: '100%',
        textAlign: 'center',
        paddingTop: theme.spacing(0.5),
        fontSize: '1.1rem'
    },
    arrowContainer: {
        marginTop: theme.spacing(2),
        [theme.breakpoints.up('md')]: {
            marginTop: theme.spacing(6)
        }
    }
}))

export const Rule = ({rule}) => {
    const classes = useStyles();
    const [expanded, setExpanded] = useState();

    const { 
        name,
        inputDevices,
        outputDevices
    } = rule;
    const extraInputs = inputDevices.slice(1);
    const extraOutputs = outputDevices.slice(1);
    console.log(extraInputs);

    return (
        <Paper className={classes.ruleContainer}>
            <Grid container spacing={1} className={classes.rule}>
                <Grid item container xs={12}>
                    <Grid xs={9}>
                        <Typography component='h2' variant='h5' className={classes.title}>
                            {name}
                        </Typography>
                    </Grid>
                    <Grid xs={3}>
                        <ThemeProvider theme={actionsTheme}>
                            <IconButton color='secondary' className={classes.actionBtn}>
                                <Delete />
                            </IconButton>
                        </ThemeProvider>
                        <ThemeProvider theme={actionsTheme}>
                            <IconButton color='primary' className={classes.actionBtn}>
                                <Edit />
                            </IconButton>
                        </ThemeProvider>
                    </Grid>
                </Grid>
                <Grid 
                    item 
                    container
                    xs={12} md={5}
                    direction='column'
                >
                    <Typography component='h3' variant='body2' className={classes.header}>
                        Inputs
                    </Typography>
                    <InputDevice
                        peripheral={inputDevices[0]}
                        transitionIn
                    />
                    {!!extraInputs.length && 
                        <React.Fragment>
                            <Collapse in={!expanded}>
                                <Typography variant='h6' className={classes.more}>
                                    + {extraInputs.length} more
                                </Typography>
                            </Collapse>
                            <Collapse in={expanded}>
                                {extraInputs.map(x => 
                                    <OutputDevice
                                        peripheral={x}
                                        transitionIn={expanded} 
                                    />)}
                            </Collapse>
                        </React.Fragment>
                    }
                </Grid>
                <Grid 
                    item
                    container
                    xs={12} md={2}
                    justify='center'
                    alignItems='center'
                    className={classes.arrowContainer}
                >
                    <Hidden smDown>
                        <ArrowForward />
                    </Hidden>
                    <Hidden mdUp>
                        <ArrowDownward />
                    </Hidden>
                </Grid>
                <Grid
                    item
                    container
                    xs={12} md={5}
                    direction='column'
                >
                    <Typography component='h3' variant='body2' className={classes.header}>
                        Outputs
                    </Typography>
                    <OutputDevice
                        peripheral={outputDevices[0]}
                        transitionIn
                    />
                    {!!extraOutputs.length && 
                        <React.Fragment>
                            <Collapse in={!expanded}>
                                <Typography variant='h6' className={classes.more}>
                                    + {extraOutputs.length} more
                                </Typography>
                            </Collapse>
                            <Collapse in={expanded}>
                                {extraOutputs.map(x => 
                                    <OutputDevice
                                        peripheral={x}
                                        transitionIn={expanded} 
                                    />)}
                            </Collapse>
                        </React.Fragment>
                    }
                </Grid>
            </Grid>
            {(!!extraInputs.length || !!extraOutputs.length) &&
                <Button color='primary' className={classes.expand} onClick={() => setExpanded(!expanded)}>
                    {!expanded ? <ExpandMore /> : <ExpandLess />}
                </Button>
            }
        </Paper>
    )
}