import { getIn } from "formik";
import { denormalize } from "normalizr";
import { DeviceSchema } from "../../infrastructure/api/entities";

const hydrateDevice = (state, id) => denormalize(id, DeviceSchema, state.entities);
const hydrateDevices = state => 
    Object.keys(
        getIn(state.entities, ['devices']) || {}
    )
    .map(id => hydrateDevice(state, id));

export const selectDevices = state => hydrateDevices(state);