import { colors, createMuiTheme, Slider, ThemeProvider, Typography } from '@material-ui/core';
import { Whatshot } from '@material-ui/icons';
import React from 'react';
import { inputTypeFormatters, inputIconMap, inputDisplayFormatter } from '../formatters/inputFormatters';
import { Device } from './Device';

const theme = createMuiTheme({
    palette: {
        background: colors.blue[50]
    }
})

export const InputDevice = props => {
    const { peripheral } = props;

    return (
        <ThemeProvider theme={theme}>
            <Device
                type={inputTypeFormatters(peripheral.type)}
                TypeIcon={inputIconMap[peripheral.type]}
                {...props}
            >
                {inputDisplayFormatter(peripheral)}
            </Device>
        </ThemeProvider>
    )
}