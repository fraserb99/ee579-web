import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { SignInForm } from './SignInForm';
import { Link } from '../../components/Link';
import { GoogleLoginButton, MicrosoftLoginButton } from 'react-social-login-buttons';
import { useMicrosoftLogin } from './hooks/useMicrosoftLogin';
import { useGoogleLogin } from './hooks/useGoogleLogin';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export const socialButtonStyles = {
  margin: 0,
  width: '100%',
  height: '36px',
  padding: '0px 46px 0px 10px',
  fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  fontWeight: 500,
  fontSize: '0.875rem',
  textTransform: 'uppercase',
  marginBottom: '8px'
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export const SignInPage = () => {
  const classes = useStyles();
  const microsoftLogin = useMicrosoftLogin();
  const googleLogin = useGoogleLogin();

  return (
    <Container component="main" maxWidth="xs" className={classes.container}>
        <CssBaseline />
        <div className={classes.paper}>
            <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
                Sign in
            </Typography>
            <SignInForm />
            <GoogleLoginButton
              style={{...socialButtonStyles, marginTop: '8px'}}
              align='center'
              text='Sign In with Google' 
              onClick={googleLogin}
              type='button'
            />
            <MicrosoftLoginButton
              style={socialButtonStyles}
              align='center'
              text='Sign In with Microsoft'
              onClick={microsoftLogin}
            />
            <Grid container>
                <Grid item xs>
                    <Link href="/forgot-password" variant="body2">
                        Forgot password?
                    </Link>
                </Grid>
                <Grid item>
                    <Link to="/signup" variant="body2">
                        {"Don't have an account? Sign Up"}
                    </Link>
                </Grid>
            </Grid>
        </div>
    </Container>
  )
}