import { getIn } from "formik";
import { denormalize } from "normalizr";
import { DeviceGroupSchema } from "../../infrastructure/api/entities";

const hydrateDeviceGroup = (state, id) => denormalize(id, DeviceGroupSchema, state.entities);
const hydrateDeviceGroups = state => 
    Object.keys(
        getIn(state.entities, ['devicegroups']) || {}
    )
    .map(id => hydrateDeviceGroup(state, id));

export const selectDeviceGroups = state => hydrateDeviceGroups(state);

export const selectUnclaimed = state => hydrateDeviceGroups(state);