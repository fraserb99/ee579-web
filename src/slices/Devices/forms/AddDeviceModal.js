import React, { useCallback } from 'react';
import { compose } from 'recompose';
import { formContainer } from '../../../infrastructure/form/formContainer';
import * as actions from '../actions';
import { FormModal } from '../../../infrastructure/form/FormModal';
import { DeviceForm } from './DeviceForm';
import { withRouter } from 'react-router';

const enhance = compose(
    withRouter,
    formContainer(
        'Claim Device',
        'Save',
        (state, props) => props.item,
        actions => actions.claimDevice,
        actions
    )
)

const Form = enhance(DeviceForm);

export const AddDeviceModal = ({title, path, ...props}) => {

    return (
        <FormModal 
            title={'Claim Device'}
            component={Form}
            {...props}
        />
    )
}