import { CircularProgress, TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { Field, getIn } from 'formik';
import React from 'react';

const renderField = ({ field, placeholder, autoFocus, label, form, inputRef, children, helperText, ...custom }) => {
    var fieldTouched = getIn(form.touched, field.name);
    var fieldError = getIn(form.errors, field.name);
    
    return (
        <Autocomplete
            renderInput={(params) => (
                <TextField
                    {...params}
                    label={label}
                    error={fieldTouched && fieldError}
                    helperText={(fieldTouched && fieldError) || helperText}
                    InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                        <React.Fragment>
                            {custom.loading ? <CircularProgress color="inherit" size={20} /> : null}
                            {params.InputProps.endAdornment}
                        </React.Fragment>
                        ),
                    }}
                />
            )}
            {...field}
            onChange={(event, newValue) => form.setFieldValue(field.name, newValue)}
            {...custom}
        />
    )
}

export const AutoCompleteRow = props => (
    <Field
        component={renderField}
        {...props}
    />
)