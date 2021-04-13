import React, { useContext, useState } from 'react';
import { useDispatch } from 'react-redux';
import { AddTenantModal } from './forms/AddTenantModal';
import { SwitchTenantModal } from './SwitchTenantModal';
import { TenantModalContext } from './TenantModalContext';

export const TenantModals = () => {
    const [showSwitch, setShowSwitch] = useContext(TenantModalContext);
    const [showAdd, setShowAdd] = useState(false);
    const dispatch = useDispatch();

    const handleClose = () => {
        setShowSwitch(false);
        setShowAdd(false);
    }

    const handleCreate = () => {
        setShowAdd(true);
    }

    return (
        <>
            <SwitchTenantModal handleCreate={handleCreate}/>
            <AddTenantModal
                show={showAdd}
                setShow={setShowAdd}
                onSuccess={handleClose}
            />
        </>
    )
}