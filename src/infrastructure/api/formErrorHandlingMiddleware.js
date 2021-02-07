import { handleErrorSetting } from "../form/withForm";
import { toastr } from "react-redux-toastr";

export default () => next => action => {
	if (action.type === 'FAILURE' && action.meta.form) {
		const { form } = action.meta;
		const { errors } = action.payload.response;
		console.log(form);
		if (errors) {
			errors.forEach(x => {
				form.setFieldError(x.field, x.error)
			});
		}
		toastr.error('There was a problem submitting the form, Please try again')
	}
	
	return next(action);
};