import React, { useCallback } from 'react';
import { compose } from 'recompose';
import { formContainer } from '../../../infrastructure/form/formContainer';
import * as actions from '../actions';
import { FormModal } from '../../../infrastructure/form/FormModal';
import { EditRoleForm } from './EditRoleForm';

const enhance = compose(
    formContainer(
        'Edit Role',
        'Save',
        (state, props) => props.item,
        actions => actions.updateUser,
        actions
    )
)

const Form = enhance(EditRoleForm);

export const EditRoleModal = ({title, path, ...props}) => {

    return (
        <FormModal 
            title={'Add Room'}
            component={Form}
            {...props}
        />
    )
}