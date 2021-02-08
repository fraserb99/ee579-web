import { compose, withHandlers } from "recompose";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";

export const formContainer = (
	title,
	submitText,
	initialValues,
	apiAction,
	actions,
) => compose(
	withRouter,
	connect((state, props) => ({
		title,
		submitText,
		formEntity: initialValues(state, props),
	}), dispatch => ({
		actions: bindActionCreators(actions, dispatch),
		submitActions: bindActionCreators({ apiAction }, dispatch),
	})),
	withHandlers({
		onSubmit: ({ actions, push, returnUrl, history, ...props }) => (values, form) => {console.log(history);return apiAction(actions)(values, form, history)}
	}),
)