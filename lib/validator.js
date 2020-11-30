"use strict";
// Using Validater better with the following validator
// https://github.com/validatorjs/validator.js
Object.defineProperty(exports, "__esModule", { value: true });
exports.numeric = exports.alpha = exports.type = exports.endsWith = exports.startsWith = exports.unequals = exports.equals = exports.exclude = exports.include = exports.nonPattern = exports.pattern = exports.len = exports.max = exports.min = exports.required = void 0;
// No Assert to type of the following function parameter
// required
exports.required = (value, isRequired = true) => {
    return isRequired && !!value;
};
// min
exports.min = (value, minLength) => {
    return exports.required(value) && value.length >= minLength;
};
// max
exports.max = (value, maxLength) => {
    return exports.required(value) && value.length <= maxLength;
};
// len
exports.len = (value, length) => {
    return exports.required(value) && value.length === length;
};
// pattern
exports.pattern = (value, regexp) => {
    return exports.required(value) && regexp.test(value);
};
// nonPattern
exports.nonPattern = (value, regexp) => {
    return exports.required(value) && !regexp.test(value);
};
// include
exports.include = (value, array) => {
    return exports.required(value) && array.includes(value);
};
// exclude
exports.exclude = (value, array) => {
    return exports.required(value) && !array.includes(value);
};
// equals
exports.equals = (value, expect) => {
    return exports.required(value) && value === expect;
};
// unequals
exports.unequals = (value, expect) => {
    return exports.required(value) && value !== expect;
};
// startsWith
exports.startsWith = (value, start) => {
    return exports.required(value) && value.startsWith(start);
};
// endsWith
exports.endsWith = (value, end) => {
    return exports.required(value) && value.endsWith(end);
};
// type: boolean|number|string
exports.type = (value, type) => {
    return exports.required(value) && typeof value === type;
};
// alpha
exports.alpha = (value) => {
    return exports.required(value) && /^[a-zA-Z]+$/.test(value);
};
// numeric
exports.numeric = (value) => {
    return exports.required(value) && /^[0-9]+$/.test(value);
};
