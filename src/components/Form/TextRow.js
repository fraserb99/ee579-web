import { TextField } from '@material-ui/core';
import { Field, getIn } from 'formik';
import React from 'react';

const renderField = ({ field, placeholder, required, autoFocus, label, form, inputRef, ...custom }) => {
    var fieldTouched = getIn(form.touched, field.name);
    var fieldError = getIn(form.errors, field.name);
    
    return (
        <TextField
            label={label}
            name={field.name}
            error={!!fieldTouched && !!fieldError}
            helperText={fieldTouched && fieldError}
            {...field}
            {...custom}
        />
    )
}

export const TextRow = props => (
    <Field
        component={renderField}
        {...props}
    />
)
TextRow.defaultProps = ({
    type: 'text',
    // variant: "outlined",
    margin: "normal",
    fullWidth: true
})