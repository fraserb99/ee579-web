import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { SignInForm } from './SignInForm';
import { Link } from '../../components/Link';
import { useHistory } from 'react-router';
import { Button } from '@material-ui/core';
import { AccountBalance } from '@material-ui/icons';

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
    body: {
        marginTop: theme.spacing(2)
    }
  }));
  
export const AccountCreatedPage = () => {
    const classes = useStyles();
    const history = useHistory();
  
    return (
      <Container component="main" maxWidth="xs" className={classes.container}>
          <CssBaseline />
          <div className={classes.paper}>
              <Avatar className={classes.avatar}>
                  <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                  Account Created
              </Typography>
              <Typography component="h2" variant='body1' className={classes.body}>
                  Your account has been created. Check your email for a confirmation link
              </Typography>
              <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    onClick={() => history.push('/signin')}
                >
                    Sign In
                </Button>
          </div>
      </Container>
    )
  }