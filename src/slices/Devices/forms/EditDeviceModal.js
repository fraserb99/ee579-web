import React, { useCallback } from 'react';
import { compose } from 'recompose';
import { formContainer } from '../../../infrastructure/form/formContainer';
import * as actions from '../actions';
import { FormModal } from '../../../infrastructure/form/FormModal';
import { selectDeviceById, selectDevices } from '../selectors';
import { withRouter } from 'react-router';
import { DeviceForm } from './DeviceForm';

const enhance = compose(
    withRouter,
    formContainer(
        'Edit Device',
        'Save',
        (state, props) => props.item,
        actions => actions.updateDevice,
        actions
    )
)

const Form = enhance(DeviceForm);

export const EditDeviceModal = ({title, path, ...props}) => {

    return (
        <FormModal 
            title={'Edit Device'}
            component={Form}
            {...props}
        />
    )
}