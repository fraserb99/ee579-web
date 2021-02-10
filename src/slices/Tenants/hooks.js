import { useSelector } from "react-redux";
import { selectCurrentTenant } from "./selectors";

export const useCurrentTenant = () => useSelector(selectCurrentTenant);