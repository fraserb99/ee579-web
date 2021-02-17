import React, { useState } from 'react';
import { Card, CardContent, Grid, List, ListItem, ListItemIcon, ListItemText, makeStyles, Paper, Step, StepButton, StepLabel, Stepper, Typography } from '@material-ui/core';
import { DeveloperBoard, Power, PowerOff, PowerSettingsNew, Wifi } from '@material-ui/icons';

const getStepContent = index => {

    return !index ?
        <List>
            <ListItem>
                <ListItemIcon>
                    <PowerSettingsNew fontSize='large' />
                </ListItemIcon>
                <ListItemText primary='Turn on the device(s) you would like to add' />
            </ListItem>
            <ListItem>
                <ListItemIcon>
                    <Wifi fontSize='large' />
                </ListItemIcon>
                <ListItemText primary='Make sure you are connected to the same network as your device(s)' />
            </ListItem>
        </List>
        :
        <Typography>Add devices</Typography>
}

export const AddDevicePage = () => {
    const [activeStep, setActiveStep] = useState(0);
    return (
        <React.Fragment>
            <Card>
                <CardContent>
                    <Grid container>
                        <Grid item container xs={12}>
                            {/* <Grid item xs={10} md={8} lg={6}> */}
                                <Stepper nonLinear activeStep={activeStep} style={{minWidth: '350px'}}>
                                    <Step>
                                        <StepButton onClick={() => setActiveStep(0)}>Set up devices</StepButton>
                                    </Step>
                                    <Step>
                                        <StepButton onClick={() => setActiveStep(1)}>Add devices</StepButton>
                                    </Step>
                                </Stepper>
                            {/* </Grid> */}
                        </Grid>
                        <Grid item container>
                            {getStepContent(activeStep)}
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </React.Fragment>
    )
}