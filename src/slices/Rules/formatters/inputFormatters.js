import { Slider, Typography } from "@material-ui/core";
import { Power, Refresh, ToggleOn, TouchApp, Whatshot } from "@material-ui/icons";

const inputTypeMap = {
    ButtonPushed: 'Button Pushed',
    Power: 'Power On'
}

export const inputIconMap = {
    ButtonPushed: TouchApp,
    Switch: ToggleOn,
    Temperature: Whatshot,
    Potentiometer: Refresh,
    Power: Power
}

export const inputTypeFormatters = (type) => {
    const val = inputTypeMap[type];

    return !!val ? val : type;
}

export const buttonDurationMarks = [
    {
        value: 0,
        label: null
    },
    {
        value: 2000,
        label: null
    },
    {
        value: 10000,
        label: null
    }
]
const upperDuration = {
    '0': 2000,
    '2000': 10000
}
const buttonPushedFormatter = (peripheral) => {
    const {duration} = peripheral;
    return (
        <Typography variant='caption'>
            <Slider
                marks={buttonDurationMarks}
                value={duration >= 10000 ? duration : [duration, upperDuration[duration]]}
                valueLabelDisplay="on"
                valueLabelFormat={(value, index) => `${value/1000}s`}
                max={10000}
                step={null}
                style={{paddingBottom: 0}}
                track={duration >= 10000 ? 'inverted' : 'normal'}
            />
            Duration Held
        </Typography>
    )
}

const rangeOpts = {
    Temperature: {
        min: -50,
        max: 100,
        suffix: '°C',
    },
    Potentiometer: {
        min: 0,
        max: 1024,
        suffix: ''
    }
}

const rangeFormatter = (input) => {
    const {
        min,
        max,
        suffix
    } = rangeOpts[input.type]

    const { greaterThan, lessThan } = input;

    return (
        <Typography variant='caption'>
            <Slider
                marks={buttonDurationMarks}
                value={[greaterThan, lessThan]}
                valueLabelDisplay="on"
                valueLabelFormat={(value, index) => `${value}${suffix}`}
                track={greaterThan > lessThan ? 'inverted' : 'normal'}
                min={min}
                max={max}
                step={null}
                style={{paddingBottom: 0}}
            />
            Duration Held
        </Typography>
    )
}

const inputDisplayMap = {
    ButtonPushed: buttonPushedFormatter,
    Temperature: rangeFormatter,
    Potentiometer: rangeFormatter
}

export const inputDisplayFormatter = peripheral => {
    const formatter = inputDisplayMap[peripheral.type];
    return formatter ? formatter(peripheral) : null;
}