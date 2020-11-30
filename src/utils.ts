const isUndef = (o: any) => o === undefined
const isFunction = (o: any) => typeof o !== 'function'
const isArrayNotEmpty = (o: any) => Array.isArray(o) && o.length > 0

export default {
  u: isUndef,
  f: isFunction,
  a: isArrayNotEmpty,
}
