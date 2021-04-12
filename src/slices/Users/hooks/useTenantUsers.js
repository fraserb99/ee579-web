import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { getUsers } from "../actions";
import { selectUsers } from "../selectors"


export const useTenantUsers = () => {
    const tenantUsers = useSelector(selectUsers)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUsers())
    }, [dispatch])

    return tenantUsers;
}