import React, { useCallback } from 'react';
import { compose } from 'recompose';
import { formContainer } from '../../../infrastructure/form/formContainer';
import * as actions from '../actions';
import { FormModal } from '../../../infrastructure/form/FormModal';
import { TenantForm } from './TenantForm';

const enhance = compose(
    formContainer(
        'Add Tenant',
        'Save',
        (state, props) => ({
            name: ''
        }),
        actions => actions.createTenant,
        actions
    )
)

const Form = enhance(TenantForm);

export const AddTenantModal = ({title, path, ...props}) => {

    return (
        <FormModal 
            title={'Add Tenant'}
            component={Form}
            {...props}
        />
    )
}