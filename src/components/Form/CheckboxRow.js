import { Checkbox, FormControlLabel, TextField } from '@material-ui/core';
import { Field, getIn } from 'formik';
import React from 'react';

const renderField = ({ field, placeholder, required, autoFocus, label, form, inputRef, ...custom }) => {
    var fieldTouched = getIn(form.touched, field.name);
    var fieldError = getIn(form.errors, field.name);
    
    const handleChange = (event) => {
        console.log(event);
        form.setFieldValue(field.name, event.target.checked);
    }
    console.log(form);

    return (
        <FormControlLabel
            control={
                <Checkbox
                    error={!!fieldTouched && !!fieldError}
                    helperText={fieldTouched && fieldError}
                    // {...field}
                    // {...custom}
                    checked={field.value}
                    onChange={handleChange}
                />
            }
            label="Forward Message"
        />
    )
}

export const CheckboxRow = props => (
    <Field
        component={renderField}
        {...props}
    />
)
CheckboxRow.defaultProps = ({
    type: 'text',
    // variant: "outlined",
    margin: "normal",
    fullWidth: true
})