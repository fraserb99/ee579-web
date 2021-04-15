import { schema } from "normalizr";

const idAttribute = value => value.id;

export const UserSchema = new schema.Entity('users', {}, { idAttribute });
export const UsersSchema = [UserSchema];

export const UserIdSchema = new schema.Entity('users', {}, { idAttribute: value => value });
export const UserIdListSchema = [UserIdSchema];

export const TenantSchema = new schema.Entity('tenants', {
    users: UserIdListSchema
}, { idAttribute });
export const TenantsSchema = [TenantSchema];

export const DeviceSchema = new schema.Entity('devices', {}, { idAttribute });
export const DevicesSchema = [DeviceSchema];

export const DeviceGroupSchema = new schema.Entity('devicegroups', {}, { idAttribute });
export const DeviceGroupsSchema = [DeviceGroupSchema];

export const RuleSchema = new schema.Entity('rules', {}, { idAttribute });
export const RulesSchema = [RuleSchema];