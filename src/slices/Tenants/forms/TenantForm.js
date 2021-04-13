import { Button, DialogActions, DialogContent, MenuItem } from "@material-ui/core";
import { Form } from "formik";
import { useSelector } from "react-redux";
import { compose } from "recompose";
import { SubmitButton } from "../../../components/Buttons/SubmitButton";
import { TextRow } from "../../../components/Form/TextRow";
import { withForm } from "../../../infrastructure/form/withForm";
import { selectIsLoading } from "../../../infrastructure/redux/selectors";
import * as Yup from 'yup';

const tenantValidationSchema = Yup.object().shape({
    name: Yup.string().required('Please enter a name')
})

const enhance = compose(
    withForm({
        validationSchema: tenantValidationSchema
    })
)

export const TenantForm = enhance(({handleSubmit, handleClose, submitText, ...props}) => {
    const loading = useSelector(selectIsLoading('tenants'))

    return (
        <Form onSubmit={handleSubmit}>
            <DialogContent>
                <TextRow
                    name='name'
                    label='Name'
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>
                    Cancel
                </Button>
                <SubmitButton color="secondary" loading={loading}>
                    {submitText}
                </SubmitButton>
            </DialogActions>
        </Form>
    )
})