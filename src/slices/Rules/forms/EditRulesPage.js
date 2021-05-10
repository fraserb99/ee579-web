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
        'Edit Rule',
        'Save',
        (state, props) => props.history.location.state && props.history.location.state.rule,
        actions => actions.updateRule,
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

export const EditRulePage = () => {
    const classes = useStyles();

    const history = useHistory();
    if (!history.location.state) {
        console.log(history);
        // history.push('/rules');
        return null;
    }
    const handleSuccess = () => history.push('/rules');

    return (
        <React.Fragment>
                <Form
                    onSuccess={handleSuccess}
                />
        </React.Fragment>
    )
}