import { Avatar, Fab, Grid, IconButton, makeStyles, Paper, Typography } from '@material-ui/core';
import { ArrowBackIosRounded, ArrowBackRounded, Check, Clear, Replay, Save } from '@material-ui/icons';
import { SpeedDial, SpeedDialAction, SpeedDialIcon } from '@material-ui/lab';
import { Form } from 'formik';
import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { compose } from 'recompose';
import { RuleInputsField } from '../../../components/Form/RuleInputsField';
import { RuleOutputsField } from '../../../components/Form/RuleOutputsField';
import { TextRow } from '../../../components/Form/TextRow';
import { withForm } from '../../../infrastructure/form/withForm';
import { useDeviceGroups } from '../../DeviceGroups/hooks/useDeviceGroups';
import { useDevices } from '../../Devices/hooks/useDevices';
import { ruleValidationSchema } from './validation';

const useStyles = makeStyles(theme => ({
    paper: {
        padding: theme.spacing(2, 3)
    },
    subheader: {
        padding: theme.spacing(2, 3)
    },
    divider: {
        margin: theme.spacing(4, 0)
    },
    header: {
        padding: theme.spacing(2, 3),
        marginBottom: theme.spacing(2)
    },
    fab: {
        position: 'absolute',
        [theme.breakpoints.up('xs')]: {
            top: theme.spacing(13),
            right: theme.spacing(4),
        },
        [theme.breakpoints.up('sm')]: {
            top: theme.spacing(14),
            right: theme.spacing(6),
        },
        [theme.breakpoints.up('md')]: {
            top: theme.spacing(14),
            right: theme.spacing(8),
        },
        [theme.breakpoints.up('lg')]: {
            top: theme.spacing(14),
            right: theme.spacing(10),
        },
    }
}))

const FloatingActions = ({handleReset}) => {
    const [open, setOpen] = useState();
    const classes = useStyles();
    const history = useHistory();

    const handleOpen = () => setOpen(true);
    const handleClose= () => setOpen(false);
    const handleBack = () => history.goBack();

    return (
        <SpeedDial
            ariaLabel="SpeedDial"
            open={open}
            onOpen={handleOpen}
            onClose={handleClose}
            icon={<SpeedDialIcon color='secondary' openIcon={<Check />} />}
            className={classes.fab}
            FabProps={{color: 'secondary', type: 'submit'}}
            direction='down'
            transitionDuration={0}
        >
            <SpeedDialAction
                icon={<Replay />}
                tooltipTitle='Reset'
                onClick={handleReset}
            />
            <SpeedDialAction
                icon={<ArrowBackRounded />}
                tooltipTitle='Back'
                onClick={handleBack}
            />
        </SpeedDial>
    )
}

const enhance = compose(
    withForm({
        validationSchema: ruleValidationSchema,
    })
)

export const RuleForm = enhance(({handleSubmit, title, formEntity, ...props}) => {
    const classes = useStyles();
    useDevices();
    useDeviceGroups();
    console.log(props);

    const handleReset = () => {
        props.setValues(formEntity);
        props.setErrors({});
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Paper className={classes.header}>
                <Grid container>
                    <Typography variant='h3'>
                        {title}
                    </Typography>
                </Grid>
            </Paper>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Paper className={classes.paper}>
                        <Grid container>
                            <Grid item xs={12} md={6}>
                                <TextRow
                                    name='name'
                                    label='Rule Name'
                                />
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Typography variant='h6' className={classes.subheader}>
                        Trigger
                    </Typography>
                    <RuleInputsField {...props} />
                </Grid>
                <Grid item xs={12} md={6} >
                    <Typography variant='h6' className={classes.subheader}>
                        Outputs
                    </Typography>
                    <RuleOutputsField {...props} />
                </Grid>
            </Grid>
            {/* <Fab color='secondary' className={classes.fab}>
                <Save />
            </Fab> */}
            <FloatingActions handleReset={handleReset} />
        </Form>
    )
})