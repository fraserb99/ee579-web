import React, { useCallback } from 'react';
import { compose } from 'recompose';
import { formContainer } from '../../../infrastructure/form/formContainer';
import * as actions from '../actions';
import { FormModal } from '../../../infrastructure/form/FormModal';
import { selectDeviceGroupById, selectDeviceGroups } from '../selectors';
import { withRouter } from 'react-router';
import { DeviceGroupForm } from './DeviceGroupForm';

const enhance = compose(
    withRouter,
    formContainer(
        'Edit Device Group',
        'Save',
        (state, props) => props.item,
        actions => actions.updateDeviceGroup,
        actions
    )
)

const Form = enhance(DeviceGroupForm);

export const EditDeviceGroupModal = ({title, path, ...props}) => {

    return (
        <FormModal 
            title={'Edit Device Group'}
            component={Form}
            modalProps={{
                maxWidth: 'md'
            }}
            {...props}
        />
    )
}