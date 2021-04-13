import { call, put, takeEvery } from "@redux-saga/core/effects";
import { toastr } from "react-redux-toastr";
import { REMOVE_USER } from "../../slices/Users/actions";
import { showSuccessSnackbar } from "../Snackbar/actions";
import { closeDeleteDialog } from "./actions";

function* deleteSuccess(action) {
    yield put(closeDeleteDialog())
    yield put(showSuccessSnackbar(action.meta.successText))
}

function* makeListeners() {
    const targets = [REMOVE_USER]
    yield(takeEvery(x => x.type === 'SUCCESS' && targets.includes(x.meta.type), deleteSuccess));
}

export default makeListeners;