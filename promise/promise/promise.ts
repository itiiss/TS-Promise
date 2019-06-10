import { constructorError,
         resolveRecursiveError,
         resolverError,
         cannotReturnOwn } from '../helpers/error'
import {isFunction, isObject, isObjectOrFunction} from '../helpers/type'

import { Thenable, Resolve, Reject, Resolver, PromiseStatus } from './type'

let uid = 0;

const PROMISED_ID = Math.random().toString(36).substring(2);

export default class Promise<R> implements Thenable<R> {
    private PromisedStatus: PromiseStatus = 'pending';
    private PromiseValue: any = undefined;
    private self: any = this;
    subscribes: any[] = [];


    constructor(resolver: Resolver<R>) {
        this[PROMISED_ID] = uid++;
        'function' !== typeof resolver && resolverError();
        this instanceof Promise ? this.init(resolver) : constructorError();
    }


    private Resolve(value: any): void {
        setTimeout(() => {
            if(this.PromisedStatus !== "pending") {
                return
            }
            this.PromisedStatus = "fulfilled";
            this.PromiseValue = value;

            for(let i = 0; i< this.subscribes.length; i++) {
                this.subscribes[i].onResolve(value)
            }
        })
    }

    private Reject(reason: any) {
        setTimeout(() => {
            if(this.PromisedStatus !== "pending") {
                return
            }
            this.PromisedStatus = "rejected";
            this.PromiseValue = reason;

            for(let i = 0; i< this.subscribes.length; i++) {
                this.subscribes[i].onReject(reason)
            }
        })
    }

    private init(resolver: Resolver<R>) {
        try {
            resolver(
                value => {
                    this.Resolve(value)
                }, reason => {
                    this.Reject(reason)
                }
            )
        } catch (e) {
            this.Reject(e)
        }
    }

    private resolvePromise(promise:Promise<R>, x:Promise<R>, resolve:Resolve<R>, reject: Reject): Promise<R> | void{
        let then: any;
        let throwed: boolean = false;
        if(promise === x) {
            return reject(resolveRecursiveError())
        }
        if(null !== x && isObjectOrFunction(x)) {
            try {
                then = x.then;
                if(isFunction(x)) {
                    then.call(x, (y)=> {
                        if(throwed) {
                            return
                        }
                        throwed = true;
                        return this.resolvePromise(promise, y, resolve ,reject)
                    }, (r) =>{
                        if(throwed) {
                            return
                        }
                        throwed = true;
                        return reject(r)
                    })
                } else {
                    return resolve(x)
                }
            } catch (e) {
                if(throwed) return
                throwed = true;
                return reject(e)
            }
        } else {
            return resolve(x)
        }
    }

    then<U>(onFulfilled?: (value: R) => (Thenable<U> | U), onRejected?: (error: any) => Thenable<U>): Thenable<U> {

    }
}
