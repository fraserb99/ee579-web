import { Button, DialogActions, DialogContent, InputAdornment, MenuItem, MuiThemeProvider } from "@material-ui/core";
import { Form } from "formik";
import { useSelector } from "react-redux";
import { compose } from "recompose";
import { SubmitButton } from "../../../components/Buttons/SubmitButton";
import { TextRow } from "../../../components/Form/TextRow";
import { withForm } from "../../../infrastructure/form/withForm";
import { selectIsLoading } from "../../../infrastructure/redux/selectors";
import * as Yup from 'yup';
import { PersonOutline, Security } from "@material-ui/icons";
import { roleTheme } from '../UsersPage';

const roleHelpText = {
    User: 'Users can manage rules and devices but cannot invite or remove other users',
    Owner: 'Owners have unrestricted permissions',
}

const updateValidationSchema = Yup.object().shape({
    role: Yup.string().oneOf(['User', 'Owner'], 'Please enter a valid role')
})

const enhance = compose(
    withForm({
        validationSchema: updateValidationSchema
    })
)

export const EditRoleForm = enhance(({handleSubmit, handleClose, submitText, ...props}) => {
    const loading = useSelector(selectIsLoading('users'))
    console.log(props.values);
    return (
        <Form onSubmit={handleSubmit}>
            <DialogContent>
                <TextRow
                    name='email'
                    label='Email'
                    disabled
                />
                <TextRow
                    name='role'
                    label='Role'
                    select
                    helperText={roleHelpText[props.values && props.values.role]}
                    InputProps={{
                        startAdornment: (
                            <MuiThemeProvider theme={roleTheme}>
                                <InputAdornment position="start">
                                    {props.values.role === 'User' ? <PersonOutline /> : <Security color='secondary' />}
                                </InputAdornment>
                            </MuiThemeProvider>
                        ),
                    }}
                >
                    <MenuItem value='User'>User</MenuItem>
                    <MenuItem value='Owner'>Owner</MenuItem>
                </TextRow>
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