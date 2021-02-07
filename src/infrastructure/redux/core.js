import { fromJS } from "immutable"

export const mapObject = (obj, fn) =>
Object.fromEntries(
  Object.entries(obj).map(
    ([k, v], i) => [k, fn(v, k, i)]
  )
)

export const formatState = state => mapObject(state, x => fromJS(x));