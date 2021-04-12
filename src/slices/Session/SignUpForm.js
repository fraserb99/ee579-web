import React from 'react';
import { Form } from 'formik';
import { TextField, FormControlLabel, Button, Checkbox, makeStyles, CircularProgress } from '@material-ui/core';
import { compose } from '@reduxjs/toolkit';
import { formContainer } from '../../infrastructure/form/formContainer';
import * as actions from './actions';
import { withForm } from '../../infrastructure/form/withForm';
import * as Yup from 'yup';
import { TextRow } from '../../components/Form/TextRow';
import { useLoading } from '../../infrastructure/api/hooks/useLoading';

const useStyles = makeStyles((theme) => ({
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
}));

export const userFormSchema = Yup.object().shape({
    name: Yup.string()
        .required('Name is required'),
    email: Yup.string()
        .required('Email is required')
        .email('Please enter a valid email address'),
    password: Yup.string()
        .required('Password is required'),
    passwordConfirm: Yup.string()
        .oneOf([Yup.ref('password')], 'Passwords must match')
});

const enhance = compose(
    formContainer(
        'SignIn',
        'Sign In',
        () => ({ name: '', email: '', password: ''}),
        actions => actions.signUp,
        actions
    ),
    withForm({
        validationSchema: userFormSchema
    })
)

export const SignUpForm = enhance(({handleSubmit}) => {
    const classes = useStyles();
    const loading = useLoading('session');

    return (
        <Form onSubmit={handleSubmit}>
            <TextRow
                required
                label="Name"
                name="name"
                autoFocus
            />
            <TextRow
                required
                label="Email Address"
                name="email"
                autoComplete="email"
            />
            <TextRow
                required
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
            />
            <TextRow
                required
                name="passwordConfirm"
                label="Confirm Password"
                type="password"
                id="passwordConfirm"
                autoComplete="current-password"
            />
            <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
            >
                {!loading ?
                    'Sign Up'
                    :
                    <CircularProgress color='inherit' size='1.5rem' />
                }
            </Button>
        </Form>
    )
})