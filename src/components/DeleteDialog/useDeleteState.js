import { useReducer } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setDeleteState } from "./actions";

export const useDeleteState = () => {
    const dispatch = useDispatch();
    const state = useSelector(state => state.deleteDialog)
    const setState = (state) => {
        dispatch(setDeleteState(state));
    }

    return [state, setState];
}