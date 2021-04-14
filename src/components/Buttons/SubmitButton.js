import { Button, CircularProgress } from '@material-ui/core';
import React from 'react';

export const SubmitButton = ({loading, iconProps, children, color, ...props}) => (
    <Button
        type="submit"
        disabled={loading}
        color={color}
        {...props}
    >
        {!loading ?
            children
            :
            <CircularProgress color={color} size='1.5rem' />
        }
    </Button>
)