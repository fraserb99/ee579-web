import React, { useCallback } from 'react';
import { compose } from 'recompose';
import { formContainer } from '../../../infrastructure/form/formContainer';
import * as actions from '../actions';
import { FormModal } from '../../../infrastructure/form/FormModal';
import { TenantForm } from './TenantForm';
import { selectTenantById, selectTenants } from '../selectors';
import { withRouter } from 'react-router';

const enhance = compose(
    withRouter,
    formContainer(
        'Edit Tenant',
        'Save',
        (state, props) => props.item,
        actions => actions.updateTenant,
        actions
    )
)

const Form = enhance(TenantForm);

export const EditTenantModal = ({title, path, ...props}) => {

    return (
        <FormModal 
            title={'Add Tenant'}
            component={Form}
            {...props}
        />
    )
}