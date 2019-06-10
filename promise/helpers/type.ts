const toString = Object.prototype.toString

export function isObject(val: any): val is Object {
    return val !== null && typeof val === 'object';
}

export function isFunction(val: any): val is Function {
    return toString.call(val) === '[object Function]'
}

export function isObjectOrFunction(val: any):boolean {
    return isFunction(val) || isObject(val)
}


