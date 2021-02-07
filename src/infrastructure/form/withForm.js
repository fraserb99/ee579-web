import { compose, lifecycle } from "recompose"
import { withFormik } from "formik";
import { isEqual } from "lodash";

export const withForm = opts => compose(
    withFormik({
		enableReinitialize: false,
        handleSubmit: (values, { props, ...form }) => props.onSubmit(values, form),
		mapPropsToValues: ({formEntity}) => ({...formEntity}),
        ...opts
	}),
	lifecycle({
		componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
			if (!isEqual(this.props.formEntity, nextProps.formEntity)) {
				nextProps.setValues(nextProps.formEntity);
			}
		}
	})
)

export const handleErrorSetting = (errors, form) => {
	if (errors._error) {
		form.setStatus(errors._error);
	}
	else {
		form.setErrors(errors);
	}
	form.setSubmitting(false);
}

// export const processValidate = (name, validate = [], { required, pattern }) => {
// 	if (!validate.length && !required) {
// 		return null;
// 	}

// 	let validators = validate;

// 	if (required) {
// 		validators = [
// 			...validators,
// 			isRequired,
// 		];
// 	}

// 	if (pattern) {
// 		validators = [
// 			...validators,
// 			matchesPattern(new RegExp(pattern)),
// 		];
// 	}

// 	return composeValidators(...validators)(name);
// };