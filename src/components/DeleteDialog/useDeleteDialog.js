import { useContext } from "react"
import { DeleteContext } from "./DeleteContext"
import { useDeleteState } from "./useDeleteState";

export const useDeleteDialog = () => {
    const [state, setState] = useDeleteState();

    return setState;
}