import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useCurrentTenant } from "../../Tenants/hooks";
import { selectCurrentTenantId } from "../../Tenants/selectors";
import { getDevices, getUnclaimed } from "../actions";
import { selectDevices, selectUnclaimed } from "../selectors"


export const useUnclaimedDevices = () => {
    const tenantDevices = useSelector(selectUnclaimed);
    const currentTenant = useSelector(selectCurrentTenantId);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUnclaimed())
    }, [dispatch, currentTenant]);

    return tenantDevices;
}