import { colors, createMuiTheme, Slider, ThemeProvider, Typography } from '@material-ui/core';
import { Whatshot } from '@material-ui/icons';
import React from 'react';
import { Device } from './Device';

const theme = createMuiTheme({
    palette: {
        background: colors.blue[50]
    }
})

export const InputDevice = props => {

    return (
        <ThemeProvider theme={theme}>
            <Device
                type='Temperature'
                TypeIcon={Whatshot}
                {...props}
            >
                <Typography variant='caption'>
                    <Slider value={[20, 40]} valueLabelDisplay="on" valueLabelFormat={(value, index) => index === 0 ? `>${value}C` : `<${value}C`} />
                    Temperature Value
                </Typography>
            </Device>
        </ThemeProvider>
    )
}