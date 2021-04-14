import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useCurrentTenant } from "../../Tenants/hooks";
import { selectCurrentTenantId } from "../../Tenants/selectors";
import { getDevices } from "../actions";
import { selectDevices } from "../selectors"


export const useDevices = () => {
    const tenantDevices = useSelector(selectDevices);
    const currentTenant = useSelector(selectCurrentTenantId);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getDevices())
    }, [dispatch, currentTenant]);

    return tenantDevices;
}