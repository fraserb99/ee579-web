import { Divider, Grid, IconButton, makeStyles, MenuItem, Paper, Slider, Typography } from '@material-ui/core';
import { Add, ArrowBackIosRounded, ArrowBackRounded, ArrowForwardIosRounded, DeveloperBoard, Equalizer, Layers, LayersRounded, LayersTwoTone, SwapHorizRounded, SwapVertRounded, Timer, Whatshot } from '@material-ui/icons';
import { FieldArray, getIn } from 'formik';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLoading } from '../../infrastructure/api/hooks/useLoading';
import { selectDeviceGroups } from '../../slices/DeviceGroups/selectors';
import { selectDevices } from '../../slices/Devices/selectors';
import { inputIconMap } from '../../slices/Rules/formatters/inputFormatters';
import { AutoCompleteRow } from './AutocompleteRow';
import { TextRow } from './TextRow';

const useStyles = makeStyles(theme => ({
    paper: {
        padding: theme.spacing(2, 3)
    },
    subheader: {
        padding: theme.spacing(2, 3)
    },
    divider: {
        margin: theme.spacing(4, 0)
    }
}))

const ButtonPushedProperties = ({fieldValue, index, form, ...props}) => {
    const prefix = `inputs[${index}]`;
    const [duration, setDuration] = useState();
    // console.log(getIn(form.values, prefix + '.duration'));

    return (
        <>
            <Grid container item xs={2} justify='center' alignItems='center'>
                <Timer fontSize='large' />
            </Grid>
            <Grid item xs={10}>
                <TextRow
                    name={`${prefix}.duration`}
                    label='Button Pressed Duration'
                    select
                    defaultValue={0}
                >
                    <MenuItem value={0}>Short Press</MenuItem>
                    <MenuItem value={2000}>Medium Press ({'>'} 2s)</MenuItem>
                    <MenuItem value={10000}>Long Press ({'>'} 10s)</MenuItem>
                </TextRow>
            </Grid>
        </>
    )
}

const SwitchProperties = ({fieldValue, index, form, ...props}) => {
    const prefix = `inputs[${index}]`;

    return (
        <>
            <Grid container item xs={2} justify='center' alignItems='center'>
            </Grid>
            <Grid container item xs={10} spacing={2}>
                <Grid item xs={6}>
                    <TextRow
                        name={`${prefix}.peripheral`}
                        label='Switch Peripheral'
                        select
                        defaultValue='Switch1'
                    >
                        <MenuItem value='Switch1'>Switch 1</MenuItem>
                        <MenuItem value='Switch2'>Switch 2</MenuItem>
                    </TextRow>
                </Grid>
                <Grid item xs={6}>
                    <TextRow
                        name={`${prefix}.value`}
                        label='Switch State'
                        select
                        defaultValue={true}
                    >
                        <MenuItem value={true}>On</MenuItem>
                        <MenuItem value={false}>Off</MenuItem>
                    </TextRow>
                </Grid>
            </Grid>
        </>
    )
}

const AnalogueProperties = ({fieldValue, index, form, handleSetFieldValue, min, max, suffix, ...props}) => {
    const prefix = `inputs[${index}]`;
    const [sliderVal, setSliderVal] = useState();

    const handleSwapValues = () => {
        handleSetFieldValue('greaterThan', fieldValue.lessThan);
        handleSetFieldValue('lessThan', fieldValue.greaterThan);
    }

    const handleChange = (e, val) => {
        setSliderVal(val);
    }

    const handleChangeCommit = (e, newValue) => {
        console.log(e);
        const {greaterThan, lessThan} = fieldValue;
        if (greaterThan < lessThan) {
            handleSetFieldValue('greaterThan', newValue[0]);
            handleSetFieldValue('lessThan', newValue[1]);
        } else {
            handleSetFieldValue('greaterThan', newValue[1]);
            handleSetFieldValue('lessThan', newValue[0]);
        }
        
        setSliderVal(null);
    }

    const Icon = inputIconMap[fieldValue.type];

    return (
        <>
            <Grid container item xs={2} justify='center' alignItems='center' />
            <Grid container item xs={10} justify='center' alignItems='center'>
                <Grid item xs={12} style={{paddingTop: 24}}>
                    <Slider
                        color='secondary'
                        min={min}
                        max={max}
                        value={sliderVal || [fieldValue.greaterThan, fieldValue.lessThan]}
                        track={fieldValue.greaterThan < fieldValue.lessThan ? 'normal' : 'inverted'}
                        step={1}
                        valueLabelDisplay="on"
                        aria-labelledby="range-slider"
                        valueLabelFormat={val =>  `${val}${suffix}`}
                        onChange={handleChange}
                        onChangeCommitted={handleChangeCommit}
                    />
                </Grid>
                <Grid item xs={5}>
                    <TextRow
                        name={`${prefix}.greaterThan`}
                        label='Greater Than'
                        type='number'
                        InputProps={{inputProps: {min, max}}}
                    />
                </Grid>
                <Grid container item xs={2} justify='center' >
                    <IconButton onClick={handleSwapValues}>
                        <SwapHorizRounded fontSize='large' />
                    </IconButton>
                </Grid>
                <Grid item xs={5}>
                    <TextRow
                        name={`${prefix}.lessThan`}
                        label='Less Than'
                        type='number'
                        InputProps={{inputProps: {min, max}}}
                    />
                </Grid>
            </Grid>
        </>
    )
}
AnalogueProperties.defaultProps = {
    min: 0,
    max: 1024
}

const propertiesMap = {
    ButtonPushed: ButtonPushedProperties,
    Switch: SwitchProperties,
    Potentiometer: AnalogueProperties,
    Temperature: AnalogueProperties
}

const InputProperties = (props) => {
    switch (props.fieldValue.type) {
        case 'ButtonPushed':
            return <ButtonPushedProperties {...props} />
        case 'Switch':
            return <SwitchProperties {...props} />
        case 'Potentiometer':
            return <AnalogueProperties {...props} />
        case 'Temperature':
            return <AnalogueProperties {...props} min={-50} max={100} suffix='°C' />
        default:
            break;
    }
}

const initialTypeState = (type, values) => {
    const typeValues = ({
        ButtonPushed: {
            "$type": "EE579.Core.Slices.Rules.Models.Inputs.ButtonPushedInputDto, EE579.Core",
            type: 'ButtonPushed',
            duration: 0,
            device: values.device,
            deviceGroup: values.deviceGroup,
        },
        Switch: {
            "$type": "EE579.Core.Slices.Rules.Models.Inputs.SwitchInputDto, EE579.Core",
            type: 'Switch',
            value: true,
            device: values.device,
            deviceGroup: values.deviceGroup,
        },
        Potentiometer: {
            "$type": "EE579.Core.Slices.Rules.Models.Inputs.AnalogueValueInputDto, EE579.Core",
            type: 'Potentiometer',
            greaterThan: 256,
            lessThan: 768,
            device: values.device,
            deviceGroup: values.deviceGroup,
        },
        Temperature: {
            "$type": "EE579.Core.Slices.Rules.Models.Inputs.AnalogueValueInputDto, EE579.Core",
            type: 'Temperature',
            greaterThan: 0,
            lessThan: 50,
            device: values.device,
            deviceGroup: values.deviceGroup,
        }
    });

    const val = typeValues[type];
    return val
}

const RuleInput = ({fieldValue, index, ...props}) => {
    const prefix = `inputs[${index}]`;
    const classes = useStyles();
    const devices = useSelector(selectDevices);
    const devicesLoading = useLoading('devices');
    const deviceGroups = useSelector(selectDeviceGroups);
    const deviceGroupsLoading = useLoading('devicegroups');

    const { type } = fieldValue;

    const InputIcon = inputIconMap[fieldValue.type];

    const handleSetFieldValue = (name, value) => {
        props.form.setFieldValue(prefix + name, value);
    }

    useEffect(() => {
        handleSetFieldValue('', initialTypeState(fieldValue.type, fieldValue));
    }, [fieldValue.type])

    const childProps = {
        fieldValue,
        index,
        handleSetFieldValue,
        ...props
    };

    return (
        <Paper className={classes.paper}>
            <Grid container>
                <Grid container item xs={12} spacing={2}>
                    <Grid container item xs={12}>
                        <Typography variant='subtitle'>
                            Input Properties
                        </Typography>
                    </Grid>
                    <Grid container item xs={2} justify='center' alignItems='center'>
                        <InputIcon fontSize='large' />
                    </Grid>
                    <Grid item xs={10}>
                        <TextRow
                            name={`${prefix}.type`}
                            label='Input Type'
                            select
                        >
                            <MenuItem value='ButtonPushed'>Button Pushed</MenuItem>
                            <MenuItem value='Switch'>Switch Flipped</MenuItem>
                            <MenuItem value='Potentiometer'>Potentiometer</MenuItem>
                            <MenuItem value='Temperature'>Temperature</MenuItem>
                        </TextRow>
                    </Grid>
                    <InputProperties {...childProps} />
                    {/* <InputProperties render={() => renderInputProperties({fieldValue, index, handleSetFieldValue, ...props})} /> */}
                    {/* {type === 'ButtonPushed' && <ButtonPushedProperties {...childProps} />} */}
                    {/* {type === 'Switch' && <SwitchProperties {...childProps} />}
                    {type === 'Potentiometer' && <AnalogueProperties {...childProps} />}
                    {type === 'Temperature' && <AnalogueProperties {...childProps} />} */}
                </Grid>
                <Grid item xs={12} className={classes.divider}>
                    <Divider />
                </Grid>
                <Grid container item xs={12} spacing={2}>
                    <Grid container item xs={12}>
                        <Typography variant='subtitle'>
                            Trigger Device(s)
                        </Typography>
                    </Grid>
                    <Grid container item xs={2} justify='center' alignItems='center'>
                        <DeveloperBoard fontSize='large' />
                    </Grid>
                    <Grid item xs={10}>
                        <AutoCompleteRow
                            name={`${prefix}.device`}
                            label='Trigger Device'
                            getOptionSelected={(option, value) => option.id === value.id}
                            getOptionLabel={(option) => option.name}
                            options={devices}
                            loading={devicesLoading}
                            helperText='Select a device you would like to trigger the rule'
                            disabled={!!fieldValue.deviceGroup}
                        />
                    </Grid>
                    <Grid container item xs={2} alignItems='center' justify='center' style={{paddingTop: 16}}>
                        OR
                    </Grid>
                    <Grid item xs={10} />
                    <Grid container item xs={2} justify='center' alignItems='center'>
                        <LayersTwoTone fontSize='large' />
                    </Grid>
                    <Grid item xs={10}>
                        <AutoCompleteRow
                            name={`${prefix}.deviceGroup`}
                            label='Trigger Group'
                            getOptionSelected={(option, value) => option.id === value.id}
                            getOptionLabel={(option) => option.name}
                            options={deviceGroups}
                            loading={deviceGroupsLoading}
                            helperText='Select a group of devices that should trigger the rule'
                            disabled={!!fieldValue.device}
                        />
                    </Grid>
                </Grid>
                <Grid item xs={12} md={6}>
                    
                </Grid>
            </Grid>
        </Paper>
    )
}

const renderRuleInputs = ({...props}) => ({...arrayHelpers}) => {
    return (
        <div>
            {props.values.inputs && props.values.inputs.map((x, i) => (
                <RuleInput
                    fieldValue={x}
                    index={i}
                    {...arrayHelpers}
                    {...props}
                />
            ))}
        </div>
    )
}

export const RuleInputsField = props => {

    return (
        <FieldArray
            name='inputs'
            render={renderRuleInputs(props)}
        />
    )
}