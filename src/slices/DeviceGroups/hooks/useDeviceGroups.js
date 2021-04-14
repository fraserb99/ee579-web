import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useCurrentTenant } from "../../Tenants/hooks";
import { selectCurrentTenantId } from "../../Tenants/selectors";
import { getDeviceGroups } from "../actions";
import { selectDeviceGroups } from "../selectors"


export const useDeviceGroups = () => {
    const deviceGroups = useSelector(selectDeviceGroups);
    const currentTenant = useSelector(selectCurrentTenantId);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getDeviceGroups())
    }, [dispatch, currentTenant]);

    return deviceGroups;
}