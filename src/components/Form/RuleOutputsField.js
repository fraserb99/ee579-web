import { Button, Collapse, Divider, Grid, Grow, IconButton, makeStyles, MenuItem, Paper, Typography } from '@material-ui/core';
import { DeveloperBoardTwoTone, LayersTwoTone, Remove, Timer } from '@material-ui/icons';
import { FieldArray } from 'formik';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLoading } from '../../infrastructure/api/hooks/useLoading';
import { selectDeviceGroups } from '../../slices/DeviceGroups/selectors';
import { selectDevices } from '../../slices/Devices/selectors';
import { outputIconMap } from '../../slices/Rules/formatters/outputFormatters';
import { AutoCompleteRow } from './AutocompleteRow';
import { TextRow } from './TextRow';

const useStyles = makeStyles(theme => ({
    paper: {
        padding: theme.spacing(2, 3),
        marginBottom: theme.spacing(2)
    },
    subheader: {
        padding: theme.spacing(2, 3)
    },
    divider: {
        margin: theme.spacing(4, 0)
    }
}))

const BuzzerOnProperties = ({fieldValue, index, form, ...props}) => {
    const prefix = `outputs[${index}]`;

    return (
        <>
            <Grid container item xs={2} justify='center' alignItems='center'>
                <Timer fontSize='large' />
            </Grid>
            <Grid item xs={10}>
                <TextRow
                    name={`${prefix}.duration`}
                    label='Buzzer On Duration (ms)'
                    type='number'
                    InputProps={{inputProps: { max: 15000, min: 1000 }}}
                />
            </Grid>
        </>
    )
}

const BuzzerBeepProperties = ({fieldValue, index, form, ...props}) => {
    const prefix = `outputs[${index}]`;

    return (
        <>
            <Grid container item xs={2} justify='center' alignItems='center'>
                <Timer fontSize='large' />
            </Grid>
            <Grid container item xs={10} spacing={2}>
                <Grid item xs={6}>
                    <TextRow
                        name={`${prefix}.onDuration`}
                        label='Buzzer On Duration (ms)'
                        type='number'
                        InputProps={{inputProps: { max: 15000, min: 200 }}}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextRow
                        name={`${prefix}.offDuration`}
                        label='Buzzer Off Duration (ms)'
                        type='number'
                        InputProps={{inputProps: { max: 15000, min: 200 }}}
                    />
                </Grid>
            </Grid>
        </>
    )
}

const LedPeriodProperties = ({fieldValue, index, form, handleSetFieldValue, ...props}) => {
    const prefix = `outputs[${index}]`;
    useEffect(() => {
        handleSetFieldValue('colour', null);
    }, fieldValue.peripheral)

    return (
        <>
            <Grid container item xs={2} justify='center' alignItems='center' />
            <Grid container item xs={10} spacing={2}>
                <Grid item xs={6}>
                    <TextRow
                        name={`${prefix}.peripheral`}
                        label='Led'
                        select
                        defaultValue='Led1'
                    >
                        <MenuItem value='Led1'>Led 1</MenuItem>
                        <MenuItem value='Led2'>Led 2</MenuItem>
                        <MenuItem value='Led3'>Led 3</MenuItem>
                    </TextRow>
                </Grid>
                <Grid item xs={6}>
                    {fieldValue.peripheral === 'Led3' && 
                        <TextRow
                            name={`${prefix}.colour`}
                            label='Led Colour'
                            select
                            value={fieldValue.colour}
                        >
                            <MenuItem value='Red'>Red</MenuItem>
                            <MenuItem value='Green'>Green</MenuItem>
                            <MenuItem value='Blue'>Blue</MenuItem>
                            <MenuItem value='Purple'>Purple</MenuItem>
                            <MenuItem value='Yellow'>Yellow</MenuItem>
                            <MenuItem value='White'>White</MenuItem>
                        </TextRow>}
                </Grid>
            </Grid>
            <Grid container item xs={2} justify='center' alignItems='center' />
            <Grid container item xs={10} spacing={2}>
                <Grid item xs={6}>
                    <TextRow
                        name={`${prefix}.period`}
                        label='Period (ms)'
                        type='number'
                        InputProps={{inputProps: { min: 100, max: 5000 }}}
                    />
                </Grid>
            </Grid>
        </>
    )
}

const LedCycleProperties = ({fieldValue, index, form, ...props}) => {
    const prefix = `outputs[${index}]`;

    return (
        <>
            <Grid container item xs={2} justify='center' alignItems='center'>
                <Timer fontSize='large' />
            </Grid>
            <Grid container item xs={10} spacing={2}>
                <Grid item xs={6}>
                <TextRow
                        name={`${prefix}.direction`}
                        label='Direction'
                        select
                        defaultValue={true}
                    >
                        <MenuItem value={true}>Forwards - RGBPYW</MenuItem>
                        <MenuItem value={false}>Backwards - WYPBGR</MenuItem>
                    </TextRow>
                </Grid>
                <Grid item xs={6}>
                    <TextRow
                        name={`${prefix}.period`}
                        label='Period (ms)'
                        type='number'
                        InputProps={{inputProps: { min: 100, max: 5000 }}}
                    />
                </Grid>
            </Grid>
        </>
    )
}

const LedProperties = ({fieldValue, index, form, handleSetFieldValue, ...props}) => {
    const prefix = `outputs[${index}]`;
    useEffect(() => {
        handleSetFieldValue('colour', null);
    }, fieldValue.peripheral)

    return (
        <>
            <Grid container item xs={2} justify='center' alignItems='center' />
            <Grid container item xs={10} spacing={2}>
                <Grid item xs={6}>
                    <TextRow
                        name={`${prefix}.peripheral`}
                        label='Led'
                        select
                        defaultValue='Led1'
                    >
                        <MenuItem value='Led1'>Led 1</MenuItem>
                        <MenuItem value='Led2'>Led 2</MenuItem>
                        <MenuItem value='Led3'>Led 3</MenuItem>
                    </TextRow>
                </Grid>
                <Grid item xs={6}>
                    {fieldValue.peripheral === 'Led3' && 
                        <TextRow
                            name={`${prefix}.colour`}
                            label='Led Colour'
                            select
                            value={fieldValue.colour}
                        >
                            <MenuItem value='Red'>Red</MenuItem>
                            <MenuItem value='Green'>Green</MenuItem>
                            <MenuItem value='Blue'>Blue</MenuItem>
                            <MenuItem value='Purple'>Purple</MenuItem>
                            <MenuItem value='Yellow'>Yellow</MenuItem>
                            <MenuItem value='White'>White</MenuItem>
                        </TextRow>}
                </Grid>
            </Grid>
            <Grid container item xs={2} justify='center' alignItems='center' />
            <Grid container item xs={10} spacing={2}>
                <Grid item xs={6}>
                    <TextRow
                        name={`${prefix}.value`}
                        label='Value'
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

const initialTypeState = (type, values) => {
    const typeValues = ({
        BuzzerOn: {
            "$type": "EE579.Core.Slices.Rules.Models.Outputs.BuzzerOnOutputDto, EE579.Core",
            type: 'BuzzerOn',
            duration: 2000,
            device: values.device,
            deviceGroup: values.deviceGroup,
        },
        BuzzerBeep: {
            "$type": "EE579.Core.Slices.Rules.Models.Outputs.BuzzerBeepOutputDto, EE579.Core",
            type: 'BuzzerBeep',
            onDuration: 1000,
            offDuration: 1000,
            device: values.device,
            deviceGroup: values.deviceGroup,
        },
        LedBlink: {
            "$type": "EE579.Core.Slices.Rules.Models.Outputs.LedPeriodOutputDto, EE579.Core",
            type: 'LedBlink',
            period: 1000,
            peripheral: 'Led1',
            colour: null,
            device: values.device,
            deviceGroup: values.deviceGroup,
        },
        LedBreathe: {
            "$type": "EE579.Core.Slices.Rules.Models.Outputs.LedPeriodOutputDto, EE579.Core",
            type: 'LedBreathe',
            period: 2000,
            peripheral: 'Led1',
            colour: null,
            device: values.device,
            deviceGroup: values.deviceGroup,
        },
        LedCycle: {
            "$type": "EE579.Core.Slices.Rules.Models.Outputs.LedCycleOutputDto, EE579.Core",
            type: 'LedCycle',
            period: 2000,
            direction: true,
            device: values.device,
            deviceGroup: values.deviceGroup,
        },
        LedFade: {
            "$type": "EE579.Core.Slices.Rules.Models.Outputs.LedPeriodOutputDto, EE579.Core",
            type: 'LedFade',
            period: 2000,
            peripheral: 'Led1',
            colour: null,
            device: values.device,
            deviceGroup: values.deviceGroup,
        },
        LedOutput: {
            "$type": "EE579.Core.Slices.Rules.Models.Outputs.LedOutputDto, EE579.Core",
            type: 'LedOutput',
            value: true,
            peripheral: 'Led1',
            colour: null,
            device: values.device,
            deviceGroup: values.deviceGroup,
        },
    });

    const val = typeValues[type];
    return val
}

const renderProperties = props => {
    switch (props.fieldValue.type) {
        case 'BuzzerOn':
            return <BuzzerOnProperties {...props} />
        case 'BuzzerBeep':
            return <BuzzerBeepProperties {...props} />
        case 'LedBreathe':
            return <LedPeriodProperties {...props} />
        case 'LedFade':
            return <LedPeriodProperties {...props} />
        case 'LedBlink':
            return <LedPeriodProperties {...props} />
        case 'LedCycle':
            return <LedCycleProperties {...props} />
        case 'LedOutput':
            return <LedProperties {...props} />
        default:
            return <div></div>;
    }
}

const RuleOutput = ({fieldValue, index, remove, ...props}) => {
    const prefix = `outputs[${index}]`;
    const classes = useStyles();
    const devices = useSelector(selectDevices);
    const devicesLoading = useLoading('devices');
    const deviceGroups = useSelector(selectDeviceGroups);
    const deviceGroupsLoading = useLoading('devicegroups');
    const [show, setShow] = useState(true);

    const InputIcon = outputIconMap[fieldValue.type];

    const handleSetFieldValue = (name, value) => {
        props.form.setFieldValue(prefix + name, value);
    }

    const handleRemove = () => {
        setShow(false);
        setTimeout(() => {
            remove(index);
            setShow(true);
        }, 500);
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
        <Collapse in={show} enter={false}>
        <Grow in exit={false} >
            
            <Paper className={classes.paper}>
                <Grid container>
                    <Grid container item xs={12} spacing={2}>
                        <Grid container item xs={12} alignItems='center' justify='space-between'>
                            <Grid item>
                                <Typography variant='subtitle'>
                                    Output Properties
                                </Typography>
                            </Grid>
                            <Grid item>
                                {(index !== 0 || props.values.outputs.length > 1) &&
                                    <IconButton onClick={handleRemove}>
                                        <Remove color='error' />
                                    </IconButton>
                                }
                            </Grid>
                        </Grid>
                        <Grid container item xs={2} justify='center' alignItems='center'>
                            <InputIcon fontSize='large' />
                        </Grid>
                        <Grid item xs={10}>
                            <TextRow
                                name={`${prefix}.type`}
                                label='Output Type'
                                select
                            >
                                <MenuItem value='BuzzerOn'>Buzzer - On</MenuItem>
                                <MenuItem value='BuzzerBeep'>Buzzer - Beep</MenuItem>
                                <MenuItem value='LedOutput'>Led - Output</MenuItem>
                                <MenuItem value='LedBlink'>Led - Blink</MenuItem>
                                <MenuItem value='LedBreathe'>Led - Breathe</MenuItem>
                                <MenuItem value='LedFade'>Led - Fade</MenuItem>
                                <MenuItem value='LedCycle'>Led - Cycle</MenuItem>
                            </TextRow>
                        </Grid>
                        {renderProperties(childProps)}
                    </Grid>
                    <Grid item xs={12} className={classes.divider}>
                        <Divider />
                    </Grid>
                    <Grid container item xs={12} spacing={2}>
                        <Grid container item xs={12}>
                            <Typography variant='subtitle'>
                                Output Device(s)
                            </Typography>
                        </Grid>
                        <Grid container item xs={2} justify='center' alignItems='center'>
                            <DeveloperBoardTwoTone fontSize='large' />
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
            </Grow>
            </Collapse>
        
    )
}

const renderRuleOutputs = ({...props}) => ({push, ...arrayHelpers}) => {
    const handleAddOutput = () => {
        push({
            type: 'BuzzerOn',
            duration: 5000,
            device: null,
            deviceGroup: null
        });
    }

    return (
        <div>
            {props.values.outputs && props.values.outputs.map((x, i) => (
                <RuleOutput
                    key={Math.random}
                    fieldValue={x}
                    index={i}
                    {...arrayHelpers}
                    {...props}
                />
            ))}
            <Button
                fullWidth
                onClick={handleAddOutput}
                variant='contained'
                color='primary'
            >
                Add Another Output
            </Button>
        </div>
    )
}

export const RuleOutputsField = props => {

    return (
        <FieldArray
            name='outputs'
            render={renderRuleOutputs(props)}
        />
    )
}