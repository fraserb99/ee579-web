import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useCurrentTenant } from "../../Tenants/hooks";
import { selectCurrentTenantId } from "../../Tenants/selectors";
import { getRules } from "../actions";
import { selectRules } from "../selectors"


export const useRules = () => {
    const tenantRules = useSelector(selectRules);
    const currentTenant = useSelector(selectCurrentTenantId);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getRules())
    }, [dispatch, currentTenant]);
    return tenantRules;
}