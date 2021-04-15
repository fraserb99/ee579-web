import { makeStyles } from '@material-ui/core';
import React from 'react';
import { compose } from 'recompose';
import { formContainer } from '../../../infrastructure/form/formContainer';
import * as actions from '../actions';
import { RuleForm } from './RuleForm';

const enhance = compose(
    formContainer(
        'Add Rule',
        'Save',
        (state, props) => ({
            name: '',
            inputs: [{
                type: 'ButtonPushed',
                duration: 0,
                device: null,
                deviceGroup: null
            }],
            outputs: [{
                type: 'BuzzerOn',
                duration: 5000,
                device: null,
                deviceGroup: null
            }]
        }),
        actions => actions.createRule,
        actions
    )
)

const Form = enhance(RuleForm);

const useStyles = makeStyles(theme => ({
    paper: {
        padding: theme.spacing(2, 3),
        marginBottom: theme.spacing(2)
    }
}))

export const AddRulePage = () => {
    const classes = useStyles();

    return (
        <React.Fragment>
            <Form />
        </React.Fragment>
    )
}