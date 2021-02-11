import { Button, colors, createMuiTheme, Divider, Grid, IconButton, makeStyles, Paper, ThemeProvider, Typography } from '@material-ui/core';
import { ArrowForward, Delete, Edit, ExpandMore } from '@material-ui/icons';
import React, { useState } from 'react';

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
        fontWeight: 400,
        lineHeight: '48px'
    },
    actionBtn: {
        float: 'right'
    },
    expand: {
        width: '100%',
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0
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
                        <Typography component='h2' variant='h6' className={classes.title}>
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
                    <Typography component='h3' variant='body2'>
                        Inputs
                    </Typography>
                    <Button>
                        Test
                    </Button>
                </Grid>
                <Grid item container xs={12} md={2} justify='center' alignItems='center'>
                    <ArrowForward />
                </Grid>
                <Grid item container xs={12} md={5}>
                    <Typography component='h3' variant='caption'>
                        Outputs
                    </Typography>
                </Grid>
            </Grid>
            <Button color='primary' className={classes.expand}>
                <ExpandMore />
            </Button>
        </Paper>
    )
}