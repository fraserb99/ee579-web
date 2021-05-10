import React from 'react';
import { Slider, Typography } from "@material-ui/core";
import { Flare, Power, Refresh, ToggleOn, TouchApp, VolumeMute, VolumeOff, VolumeUp, Whatshot } from "@material-ui/icons";

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
    BuzzerBeep: VolumeUp,
    BuzzerOff: VolumeOff,
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
            max={15000}
            step={1}
            style={{paddingBottom: 0}}
        />
        <Typography variant='caption' style={{marginTop: '-16px'}}>
            Duration
        </Typography>
    </React.Fragment>
)

const ledPeriodFormatter = peripheral => (
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
            Period
        </Typography>
        <Typography variant='body2'>
            {peripheral.colour && `Colour: ${peripheral.colour}`}
        </Typography>
    </React.Fragment>
)

const ledOutputFormatter = peripheral => (
    <React.Fragment>
        <Typography variant='body1'>
            State: {peripheral.value ? 'On' : 'Off'}
        </Typography>
        <Typography variant='body2'>
            {peripheral.colour && `Colour: ${peripheral.colour}`}
        </Typography>
    </React.Fragment>
)

const ledCycleFormatter = peripheral => (
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
            Period
        </Typography>
        <Typography variant='body1'>
            Direction: {peripheral.direction ? 'Forwards' : 'Backwards'}
        </Typography>
    </React.Fragment>
)

const buzzerBeepFormatter = peripheral => (
    <React.Fragment>
        <Typography variant='caption' gutterBottom>
            <Slider
                value={peripheral.onDuration}
                defaultValue={0}
                valueLabelDisplay="on"
                valueLabelFormat={(value, index) => `${value/1000}s`}
                min={0}
                max={15000}
                step={1}
                style={{paddingBottom: 0}}
            />
            OnDuration
        </Typography>
        <Typography variant='caption' gutterBottom>
            <Slider
                value={peripheral.offDuration}
                defaultValue={0}
                valueLabelDisplay="on"
                valueLabelFormat={(value, index) => `${value/1000}s`}
                min={0}
                max={15000}
                step={1}
                style={{paddingBottom: 0, marginTop: 40}}
            />
            OffDuration
        </Typography>
    </React.Fragment>
)

const outputDisplayMap = {
    BuzzerOn: buzzerOnFormatter,
    LedBlink: ledPeriodFormatter,
    LedBreathe: ledPeriodFormatter,
    LedFade: ledPeriodFormatter,
    LedOutput: ledOutputFormatter,
    LedCycle: ledCycleFormatter,
    BuzzerBeep: buzzerBeepFormatter
}

export const outputDisplayFormatter = peripheral => {
    const formatter = outputDisplayMap[peripheral.type];

    return formatter ? formatter(peripheral) : null;
}