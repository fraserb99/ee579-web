import { useSelector } from "react-redux";
import { selectSession } from "./selectors";

export const useSession = () => useSelector(selectSession);