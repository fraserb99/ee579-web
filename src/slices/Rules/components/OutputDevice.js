import { colors, createMuiTheme, ThemeProvider } from '@material-ui/core';
import { Flare } from '@material-ui/icons';
import React from 'react';
import { Device } from './Device';

const theme = createMuiTheme({
    palette: {
        background: colors.pink[50]
    }
})

export const OutputDevice = props => {

    return (
        <ThemeProvider theme={theme}>
            <Device
                type='Led Blink'
                TypeIcon={Flare}
                {...props}
            />
        </ThemeProvider>
    )
}