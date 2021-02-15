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
        value: 1000,
        label: null
    },
    {
        value: 5000,
        label: null
    }
]
const buttonPushedFormatter = (peripheral) => (
    <Typography variant='caption'>
        <Slider
            marks={buttonDurationMarks}
            value={peripheral.duration}
            valueLabelDisplay="on"
            valueLabelFormat={(value, index) => `>${value/1000}s`}
            max={5000}
            step={null}
            style={{paddingBottom: 0}}
        />
        Duration Held
    </Typography>
)

const inputDisplayMap = {
    ButtonPushed: buttonPushedFormatter
}

export const inputDisplayFormatter = peripheral => {
    return inputDisplayMap[peripheral.type](peripheral);
}