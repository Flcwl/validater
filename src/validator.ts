// Using Validater better with the following validator
// https://github.com/validatorjs/validator.js

// No Assert to type of the following function parameter

// required
export const required = (value: any, isRequired = true) => {
  return isRequired && !!value
}

// min
export const min = (value: string, minLength: number) => {
  return required(value) && value.length >= minLength
}

// max
export const max = (value: string, maxLength: number) => {
  return required(value) && value.length <= maxLength
}

// len
export const len = (value: string, length: number) => {
  return required(value) && value.length === length
}

// pattern
export const pattern = (value: string, regexp: RegExp) => {
  return required(value) && regexp.test(value)
}

// nonPattern
export const nonPattern = (value: string, regexp: RegExp) => {
  return required(value) && !regexp.test(value)
}

// include
export const include = (value: any, array: any[]) => {
  return required(value) && array.includes(value)
}

// exclude
export const exclude = (value: any, array: any[]) => {
  return required(value) && !array.includes(value)
}

// equals
export const equals = (value: any, expect: any) => {
  return required(value) && value === expect
}

// unequals
export const unequals = (value: any, expect: any) => {
  return required(value) && value !== expect
}

// startsWith
export const startsWith = (value: string, start: string) => {
  return required(value) && value.startsWith(start)
}

// endsWith
export const endsWith = (value: string, end: string) => {
  return required(value) && value.endsWith(end)
}

// type: boolean|number|string
export const type = (value: any, type: string) => {
  return required(value) && typeof value === type
}

// alpha
export const alpha = (value: string) => {
  return required(value) && /^[a-zA-Z]+$/.test(value)
}

// numeric
export const numeric = (value: string) => {
  return required(value) && /^[0-9]+$/.test(value)
}
