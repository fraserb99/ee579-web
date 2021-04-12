import { Button, colors, createMuiTheme, IconButton, MuiThemeProvider } from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import React from 'react';

const deleteTheme = createMuiTheme({
    palette: {
        primary: colors.red
    }
})

export const DeleteIconButton = ({iconProps, ...props}) => (
    <MuiThemeProvider theme={deleteTheme}>
        <IconButton color='primary' {...props}>
            <Delete fontSize='small' {...iconProps} />
        </IconButton>
    </MuiThemeProvider>
)