
export interface Thenable<R> {
    then<U>(
        onFulfilled?: (value: R) => U | Thenable<U>,
        onRejected?: (error: any) => | Thenable<U>,
    ): Thenable<U>
}

export interface Resolve<R> {
    (value?: R | Thenable<R>): void
}

export interface Reject {
    (error?: any): void;
}



export interface Resolver<R> {
    (resolve: Resolve<R>, reject: Reject): void;
}

export type PromiseStatus = 'pending' | 'fulfilled' | 'rejected'
