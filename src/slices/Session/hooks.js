import { useSelector } from "react-redux";
import { selectCurrentRole } from "../Tenants/selectors";
import { selectSession } from "./selectors";

export const useSession = () => useSelector(selectSession);

export const useCurrentUser = () => useSession().get('user');

export const useCurrentRole = () => useSelector(selectCurrentRole);