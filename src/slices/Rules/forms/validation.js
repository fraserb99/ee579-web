import { getIn } from 'formik';
import * as Yup from 'yup';

const oneOf = otherKey => (value, testContext) => {
    const type = getIn(testContext.parent, 'type');
    if (type === 'Webhook')
        return true;

    const otherValue = getIn(testContext.parent, otherKey);
    return value || otherValue;
}

const typeSchema = Yup.string().required('Please select an input type');

const deviceSchema = Yup.object().nullable().test({
    name: 'deviceTest',
    exclusive: true,
    message: 'A trigger device or device group is required',
    test: oneOf('deviceGroup'),
});

const deviceGroupSchema = Yup.object().nullable().test({
    name: 'deviceTest',
    exclusive: true,
    message: 'A trigger device or device group is required',
    test: oneOf('device'),
});

const validateColour = (peripheral, schema) => peripheral === 'Led3' ?
        schema.required('Please select a colour when using Led 3')
        :
        schema

const ledColourSchema = Yup.string().nullable().when('peripheral', validateColour)

export const ruleValidationSchema = (props) =>{
    // console.log(props);
    return Yup.object().shape({
        name: Yup.string().required('Please enter a name'),
        inputs: Yup.array().min(1, 'At least one trigger is required').of(
            Yup.object().shape({
                type: typeSchema,
                device: deviceSchema,
                deviceGroup: deviceGroupSchema,
            })
        ),
        outputs: Yup.array().min(1, 'At least one trigger is required').of(
            Yup.object().shape({
                type: Yup.string().required('Please select an input type'),
                device: deviceSchema,
                deviceGroup: deviceGroupSchema,
                colour: ledColourSchema
            })
        )
    }, [['device', 'deviceGroup']])
}