import { Avatar, Grid, IconButton, makeStyles, Paper, Typography } from '@material-ui/core';
import { Save } from '@material-ui/icons';
import { Form } from 'formik';
import React from 'react';
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
    }
}))



const enhance = compose(
    withForm({
        validationSchema: ruleValidationSchema,
    })
)

export const RuleForm = enhance(({handleSubmit, title, ...props}) => {
    const classes = useStyles();
    useDevices();
    useDeviceGroups();
    console.log(props.errors);

    return (
        <Form onSubmit={handleSubmit}>
            <Paper className={classes.header}>
                <Grid container>
                    <Typography variant='h3'>
                        {title}
                        <Avatar>
                        <IconButton type='submit'>
                            <Save fontSize='large' color='secondary' />
                        </IconButton>
                        </Avatar>
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
        </Form>
    )
})