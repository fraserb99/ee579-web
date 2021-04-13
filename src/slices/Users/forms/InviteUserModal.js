import React, { useCallback } from 'react';
import { compose } from 'recompose';
import { formContainer } from '../../../infrastructure/form/formContainer';
import * as actions from '../actions';
import { FormModal } from '../../../infrastructure/form/FormModal';
import { InviteUserForm } from './InviteUserForm';

const enhance = compose(
    formContainer(
        'Invite User',
        'Invite',
        (state, props) => ({ 
            email: '',
            role: 'User'
        }),
        actions => actions.inviteUser,
        actions
    )
)

const Form = enhance(InviteUserForm);

export const InviteUserModal = ({title, path, ...props}) => {

    return (
        <FormModal 
            title={'Add Room'}
            component={Form}
            {...props}
        />
    )
}