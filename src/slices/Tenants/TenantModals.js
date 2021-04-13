import React, { useContext, useState } from 'react';
import { useDispatch } from 'react-redux';
import { AddTenantModal } from './forms/AddTenantModal';
import { EditTenantModal } from './forms/EditTenantModal';
import { SwitchTenantModal } from './SwitchTenantModal';
import { TenantModalContext } from './TenantModalContext';

export const TenantModals = () => {
    const [showSwitch, setShowSwitch] = useContext(TenantModalContext);
    const [showAdd, setShowAdd] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [editItem, setEditItem] = useState();
    const dispatch = useDispatch();

    const handleClose = () => {
        setShowSwitch(false);
        setShowAdd(false);
    }

    const handleCloseEdit = () => {
        setShowEdit(false);
    }

    const handleCreate = () => {
        setShowAdd(true);
    }

    const handleEdit = (item) => () => {
        setEditItem(item);
        setShowEdit(true);
    }

    return (
        <>
            <SwitchTenantModal
                handleCreate={handleCreate}
                handleEdit={handleEdit}
            />
            <AddTenantModal
                show={showAdd}
                setShow={setShowAdd}
                onSuccess={handleClose}
            />
            <EditTenantModal
                show={showEdit}
                setShow={setShowEdit}
                item={editItem}
                onSuccess={handleCloseEdit}
            />
        </>
    )
}