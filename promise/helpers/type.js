"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var toString = Object.prototype.toString;
function isObject(val) {
    return val !== null && typeof val === 'object';
}
exports.isObject = isObject;
function isFunction(val) {
    return toString.call(val) === '[object Function]';
}
exports.isFunction = isFunction;
function isObjectOrFunction(val) {
    return isFunction(val) || isObject(val);
}
exports.isObjectOrFunction = isObjectOrFunction;
