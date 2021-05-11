import { makeStyles } from '@material-ui/core';
import React from 'react';
import Scrollbars from 'react-custom-scrollbars';
import { useHistory } from 'react-router';
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
                "$type": "EE579.Core.Slices.Rules.Models.Inputs.ButtonPushedInputDto, EE579.Core",
                type: 'ButtonPushed',
                duration: 0,
                device: null,
                deviceGroup: null
            }],
            outputs: [{
                "$type": "EE579.Core.Slices.Rules.Models.Outputs.BuzzerOnOutputDto, EE579.Core",
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

    const history = useHistory();
    const handleSuccess = () => history.push('/rules');

    return (
        <React.Fragment>
                <Form
                    onSuccess={handleSuccess}
                />
        </React.Fragment>
    )
}