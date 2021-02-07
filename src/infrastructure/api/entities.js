import { schema } from "normalizr";

const idAttribute = value => value.id;

export const UserSchema = new schema.Entity('users', {}, { idAttribute });
export const UsersSchema = [UserSchema];

export const UserIdSchema = new schema.Entity('users', {}, { idAttribute: value => value });
export const UserIdListSchema = [UserIdSchema];

export const DeviceGroupSchema = new schema.Entity('devicegroups', {}, { idAttribute });
export const DeviceGroupsSchema = [DeviceGroupSchema];