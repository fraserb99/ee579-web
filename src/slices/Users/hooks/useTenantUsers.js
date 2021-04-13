import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useCurrentTenant } from "../../Tenants/hooks";
import { selectCurrentTenantId } from "../../Tenants/selectors";
import { getUsers } from "../actions";
import { selectUsers } from "../selectors"


export const useTenantUsers = () => {
    const tenantUsers = useSelector(selectUsers);
    const currentTenant = useSelector(selectCurrentTenantId);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUsers())
    }, [dispatch, currentTenant]);

    return tenantUsers;
}