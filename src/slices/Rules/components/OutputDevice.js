import { colors, createMuiTheme, ThemeProvider } from '@material-ui/core';
import { Flare } from '@material-ui/icons';
import React from 'react';
import { outputDisplayFormatter, outputIconMap } from '../formatters/outputFormatters';
import { Device } from './Device';

const theme = createMuiTheme({
    palette: {
        background: colors.pink[50]
    }
})

export const OutputDevice = props => {
    const { peripheral } = props;
    return (
        <ThemeProvider theme={theme}>
            <Device
                type={peripheral.type}
                TypeIcon={outputIconMap[peripheral.type]}
                {...props}
            >
                {outputDisplayFormatter(peripheral)}
            </Device>
        </ThemeProvider>
    )
}