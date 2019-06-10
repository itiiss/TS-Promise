
export function constructorError(): void {
    throw new TypeError("this constructor cannot be called as a function")
}

export function resolverError(): void {
    throw new TypeError("resolver function must be the first argument")
}


export function resolveRecursiveError(): TypeError {
    return new TypeError("resolver cannot be a chain")
}

export function cannotReturnOwn(): TypeError {
    return new TypeError("A promise callback cannot return a same promise")
}

export function validateError():Error {
    return new Error('Array methods must be provided as an array')
}
