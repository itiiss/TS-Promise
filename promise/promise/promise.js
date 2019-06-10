"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var error_1 = require("../helpers/error");
var type_1 = require("../helpers/type");
var uid = 0;
var PROMISED_ID = Math.random().toString(36).substring(2);
var Promise = /** @class */ (function () {
    function Promise(resolver) {
        this.PromisedStatus = 'pending';
        this.PromiseValue = undefined;
        this.self = this;
        this.subscribes = [];
        this[PROMISED_ID] = uid++;
        'function' !== typeof resolver && error_1.resolverError();
        this instanceof Promise ? this.init(resolver) : error_1.constructorError();
    }
    Promise.prototype.Resolve = function (value) {
        var _this = this;
        setTimeout(function () {
            if (_this.PromisedStatus !== "pending") {
                return;
            }
            _this.PromisedStatus = "fulfilled";
            _this.PromiseValue = value;
            for (var i = 0; i < _this.subscribes.length; i++) {
                _this.subscribes[i].onResolve(value);
            }
        });
    };
    Promise.prototype.Reject = function (reason) {
        var _this = this;
        setTimeout(function () {
            if (_this.PromisedStatus !== "pending") {
                return;
            }
            _this.PromisedStatus = "rejected";
            _this.PromiseValue = reason;
            for (var i = 0; i < _this.subscribes.length; i++) {
                _this.subscribes[i].onReject(reason);
            }
        });
    };
    Promise.prototype.init = function (resolver) {
        var _this = this;
        try {
            resolver(function (value) {
                _this.Resolve(value);
            }, function (reason) {
                _this.Reject(reason);
            });
        }
        catch (e) {
            this.Reject(e);
        }
    };
    Promise.prototype.resolvePromise = function (promise, x, resolve, reject) {
        var _this = this;
        var then;
        var throwed = false;
        if (promise === x) {
            return reject(error_1.resolveRecursiveError());
        }
        if (null !== x && type_1.isObjectOrFunction(x)) {
            try {
                then = x.then;
                if (type_1.isFunction(x)) {
                    then.call(x, function (y) {
                        if (throwed) {
                            return;
                        }
                        throwed = true;
                        return _this.resolvePromise(promise, y, resolve, reject);
                    }, function (r) {
                        if (throwed) {
                            return;
                        }
                        throwed = true;
                        return reject(r);
                    });
                }
                else {
                    return resolve(x);
                }
            }
            catch (e) {
                if (throwed)
                    return;
                throwed = true;
                return reject(e);
            }
        }
        else {
            return resolve(x);
        }
    };
    Promise.prototype.then = function (onFulfilled, onRejected) {
    };
    return Promise;
}());
exports.default = Promise;
