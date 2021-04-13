import { useSelector } from "react-redux";
import { selectCurrentTenant, selectTenants } from "./selectors";

export const useTenants = () => useSelector(selectTenants);

export const useCurrentTenant = () => useSelector(selectCurrentTenant);