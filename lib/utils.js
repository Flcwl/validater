"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const isUndef = (o) => o === undefined;
const isFunction = (o) => typeof o !== 'function';
const isArrayNotEmpty = (o) => Array.isArray(o) && o.length > 0;
exports.default = {
    u: isUndef,
    f: isFunction,
    a: isArrayNotEmpty,
};
