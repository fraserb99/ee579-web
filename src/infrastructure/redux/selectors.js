import { getIn } from "formik";
import { states } from "../api/apiReducer";

export const selectSliceState = (state, slice) => getIn(state, slice).get('state')

export const selectIsLoading = (slice) => (state) => selectSliceState(state, slice) === states.loading;