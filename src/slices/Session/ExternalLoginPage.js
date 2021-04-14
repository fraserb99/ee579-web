import { CircularProgress, Container, Grid } from '@material-ui/core';
import React from 'react';
import { useMicrosoftLogin } from './hooks/useMicrosoftLogin';
import { useGoogleLogin } from './hooks/useGoogleLogin';

export const MicrosoftExternalSignInPage = () => {
    useMicrosoftLogin();

    return (
        <Container maxWidth='lg' >
            <Grid container justify='center' alignItems='center' style={{height: '100vh'}}>
                <CircularProgress size={64} />
            </Grid>
        </Container>
    )
}

export const GoogleExternalSignInPage = () => {
    useGoogleLogin();

    return (
        <Container maxWidth='lg' >
            <Grid container justify='center' alignItems='center' style={{height: '100vh'}}>
                <CircularProgress size={64} />
            </Grid>
        </Container>
    )
}