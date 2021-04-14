import React, { useCallback } from 'react';
import { compose } from 'recompose';
import { formContainer } from '../../../infrastructure/form/formContainer';
import * as actions from '../actions';
import { FormModal } from '../../../infrastructure/form/FormModal';
import { DeviceGroupForm } from './DeviceGroupForm';
import { withRouter } from 'react-router';

const enhance = compose(
    withRouter,
    formContainer(
        'Add Device Group',
        'Save',
        (state, props) => props.item,
        actions => actions.createDeviceGroup,
        actions
    )
)

const Form = enhance(DeviceGroupForm);

export const AddDeviceGroupModal = ({title, path, ...props}) => {

    return (
        <FormModal 
            title={'Add Device Group'}
            component={Form}
            modalProps={{
                maxWidth: 'md'
            }}
            {...props}
        />
    )
}