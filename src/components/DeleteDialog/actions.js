
export const SET_DELETE_STATE = 'SET_DELETE_STATE';
export function setDeleteState(state) {
    return {
        type: SET_DELETE_STATE,
        payload: state
    }
}

export function closeDeleteDialog() {
    return {
        type: SET_DELETE_STATE,
        payload: {
            open: false
        }
    }
}