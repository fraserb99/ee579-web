import { Button, CircularProgress } from '@material-ui/core';
import React from 'react';

export const SubmitButton = ({loading, iconProps, children, ...props}) => (
    <Button
        type="submit"
        disabled={loading}
        {...props}
    >
        {!loading ?
            children
            :
            <CircularProgress color='inherit' size='1.5rem' />
        }
    </Button>
)