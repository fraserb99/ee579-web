import React from 'react';
import { Slider, Typography } from "@material-ui/core";
import { Flare, Power, Refresh, ToggleOn, TouchApp, VolumeUp, Whatshot } from "@material-ui/icons";

const outputTypeMap = {
    ButtonPushed: 'Button Pushed',
    Power: 'Power On'
}

export const outputIconMap = {
    LedOutput: Flare,
    LedBreathe: Flare,
    LedBlink: Flare,
    LedFade: Flare,
    LedCycle: Refresh,
    BuzzerOn: VolumeUp,
    BuzzerBeep: VolumeUp
}

export const outputTypeFormatters = (type) => {
    const val = outputTypeMap[type];

    return !!val ? val : type;
}

const buzzerOnFormatter = (peripheral) => (
    <React.Fragment>
        <Slider
            value={peripheral.duration}
            defaultValue={0}
            valueLabelDisplay="on"
            valueLabelFormat={(value, index) => `${value/1000}s`}
            max={10000}
            step={500}
            style={{paddingBottom: 0}}
        />
        <Typography variant='caption' style={{marginTop: '-16px'}}>
            Duration
        </Typography>
    </React.Fragment>
)

const ledBlinkFormatter = peripheral => (
    <React.Fragment>
        <Typography variant='caption' gutterBottom>
            <Slider
                value={peripheral.period}
                defaultValue={0}
                valueLabelDisplay="on"
                valueLabelFormat={(value, index) => `${value/1000}s`}
                min={100}
                max={5000}
                step={100}
                style={{paddingBottom: 0}}
            />
            Blink Period
        </Typography>
        <Typography variant='body2'>
            {peripheral.colour && `Colour: ${peripheral.colour}`}
        </Typography>
    </React.Fragment>
)

const outputDisplayMap = {
    BuzzerOn: buzzerOnFormatter,
    LedBlink: ledBlinkFormatter
}

export const outputDisplayFormatter = peripheral => {
    return outputDisplayMap[peripheral.type](peripheral);
}