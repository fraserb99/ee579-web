import { Button, DialogActions, DialogContent, MenuItem } from "@material-ui/core";
import { Form } from "formik";
import { useSelector } from "react-redux";
import { compose } from "recompose";
import { SubmitButton } from "../../../components/Buttons/SubmitButton";
import { TextRow } from "../../../components/Form/TextRow";
import { withForm } from "../../../infrastructure/form/withForm";
import { selectIsLoading } from "../../../infrastructure/redux/selectors";
import * as Yup from 'yup';
import { useDevices } from "../../Devices/hooks/useDevices";
import { AutoCompleteRow } from "../../../components/Form/AutocompleteRow";

const devicegroupValidationSchema = Yup.object().shape({
    name: Yup.string().required('Please enter a name'),
    devices: Yup.array(Yup.object()).min(1, 'Please add at least one device')
})

const enhance = compose(
    withForm({
        validationSchema: devicegroupValidationSchema
    })
)

export const DeviceGroupForm = enhance(({handleSubmit, handleClose, submitText, ...props}) => {
    const loading = useSelector(selectIsLoading('devicegroups'));
    const devicesLoading = useSelector(selectIsLoading('devices'));
    const devices = useDevices();

    return (
        <Form onSubmit={handleSubmit}>
            <DialogContent>
                <TextRow
                    name='name'
                    label='Name'
                />
                <AutoCompleteRow
                    multiple
                    limitTags={2}
                    name='devices'
                    label='Devices'
                    getOptionSelected={(option, value) => option.id === value.id}
                    getOptionLabel={(option) => option.name}
                    options={devices}
                    loading={devicesLoading}
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