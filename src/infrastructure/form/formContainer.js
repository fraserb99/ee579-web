import { compose, withHandlers } from "recompose";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

export const formContainer = (
	title,
	submitText,
	initialValues,
	apiAction,
	actions,
) => compose(
	connect((state, props) => ({
		title,
		submitText,
		formEntity: initialValues(state, props),
	}), dispatch => ({
		actions: bindActionCreators(actions, dispatch),
		submitActions: bindActionCreators({ apiAction }, dispatch),
	})),
	withHandlers({
		onSubmit: ({ actions, push, returnUrl, ...props }) => (values, form) => {console.log(returnUrl);return apiAction(actions)(values, form, returnUrl)}
	}),
)