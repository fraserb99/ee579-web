import { Button, Collapse, colors, createMuiTheme, Divider, Grid, Grow, IconButton, makeStyles, Paper, ThemeProvider, Typography } from '@material-ui/core';
import { ArrowForward, Delete, Edit, ExpandLess, ExpandMore } from '@material-ui/icons';
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
    }
}))

export const Rule = () => {
    const classes = useStyles();
    const [expanded, setExpanded] = useState();
    return (
        <Paper>
            <Grid container spacing={1} className={classes.rule}>
                <Grid item container xs={12}>
                    <Grid xs={9}>
                        <Typography component='h2' variant='h5' className={classes.title}>
                            Temperature Rule
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
                    <InputDevice transitionIn />
                    <Collapse in={!expanded}>
                        <Typography variant='h6' className={classes.more}>
                            + 1 more
                        </Typography>
                    </Collapse>
                    <Collapse in={expanded}>
                        <InputDevice transitionIn={expanded} />
                    </Collapse>
                </Grid>
                <Grid item container xs={12} md={2} justify='center' alignItems='center'>
                    <ArrowForward />
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
                    <OutputDevice transitionIn />
                    <Collapse in={!expanded}>
                        <Typography variant='h6' className={classes.more}>
                            + 1 more
                        </Typography>
                    </Collapse>
                    <Collapse in={expanded}>
                        <OutputDevice transitionIn={expanded} />
                    </Collapse>
                </Grid>
            </Grid>
            <Button color='primary' className={classes.expand} onClick={() => setExpanded(!expanded)}>
                {!expanded ? <ExpandMore /> : <ExpandLess />}
            </Button>
        </Paper>
    )
}