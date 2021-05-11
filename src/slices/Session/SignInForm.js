import React from 'react';
import { Form } from 'formik';
import { TextField, FormControlLabel, Button, Checkbox, makeStyles, CircularProgress, Grid } from '@material-ui/core';
import { compose } from '@reduxjs/toolkit';
import { formContainer } from '../../infrastructure/form/formContainer';
import * as actions from './actions';
import { withForm } from '../../infrastructure/form/withForm';
import * as Yup from 'yup';
import { TextRow } from '../../components/Form/TextRow';
import { useLoading } from '../../infrastructure/api/hooks/useLoading';
import { GoogleLoginButton, MicrosoftLoginButton } from 'react-social-login-buttons';

const useStyles = makeStyles((theme) => ({
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
}));

export const userFormSchema = Yup.object().shape({
    email: Yup.string()
        .required('Email is required')
        .email('Please enter a valid email address'),
    password: Yup.string()
        .required('Password is required')
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*-])(?=.{6,})/, 
          'Password must be at least 6 characters and contain an uppercase character, digit, and a special character')
});

const enhance = compose(
    formContainer(
        'Login',
        'Log In',
        () => ({ email: '', password: ''}),
        actions => actions.signIn,
        actions
    ),
    withForm({
        validationSchema: userFormSchema
    })
)

export const SignInForm = enhance(({handleSubmit}) => {
    const classes = useStyles();
    const loading = useLoading('session');

    return (
        <Form onSubmit={handleSubmit}>
          <TextRow
            required
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextRow
            required
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={loading}
          >
            {!loading ?
              'Sign In'
              :
              <CircularProgress color='inherit' size='1.5rem' />
            }
          </Button>
          
        </Form>
    )
})