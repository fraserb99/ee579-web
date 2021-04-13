import { handleErrorSetting } from "../form/withForm";
import { toastr } from "react-redux-toastr";
import { showErrorSnackbar } from "../../components/Snackbar/actions";

export default store => next => action => {
	if (action.type === 'FAILURE' && action.meta.form) {
		const { form } = action.meta;
		if (action.payload.response) {
			const { errors } = action.payload.response;
			console.log(form);
			if (errors) {
				errors.forEach(x => {
					form.setFieldError(x.field, x.error)
				});
			}
		} else {
			store.dispatch(showErrorSnackbar('There was a problem submitting the form. Please try again'))
		}
	}

	if (action.type === 'SUCCESS' && action.meta.onSuccess) {
		action.meta.onSuccess()
	}
	
	return next(action);
};