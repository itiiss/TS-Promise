"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function constructorError() {
    throw new TypeError("this constructor cannot be called as a function");
}
exports.constructorError = constructorError;
function resolverError() {
    throw new TypeError("resolver function must be the first argument");
}
exports.resolverError = resolverError;
function resolveRecursiveError() {
    return new TypeError("resolver cannot be a chain");
}
exports.resolveRecursiveError = resolveRecursiveError;
function cannotReturnOwn() {
    return new TypeError("A promise callback cannot return a same promise");
}
exports.cannotReturnOwn = cannotReturnOwn;
function validateError() {
    return new Error('Array methods must be provided as an array');
}
exports.validateError = validateError;
