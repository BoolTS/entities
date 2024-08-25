"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Entity = exports.entityKey = void 0;
const arrayOf_1 = require("./arrayOf");
const instanceOf_1 = require("./instanceOf");
const zodSchema_1 = require("./zodSchema");
exports.entityKey = Symbol.for("__bool:entity__");
const Entity = () => (target, context) => {
    Reflect.defineMetadata(exports.entityKey, undefined, target);
    // Zod
    const zodMetadata = {
        ...(Reflect.getOwnMetadata(zodSchema_1.zodSchemaKey, Object.getPrototypeOf(target)) || undefined),
        ...(Reflect.getOwnMetadata(zodSchema_1.zodSchemaKey, target) || undefined)
    };
    Reflect.defineMetadata(zodSchema_1.zodSchemaKey, zodMetadata, target);
    // Instance of
    const instanceOfMetadata = {
        ...(Reflect.getOwnMetadata(instanceOf_1.instanceOfKey, Object.getPrototypeOf(target.constructor)) ||
            undefined),
        ...(Reflect.getOwnMetadata(instanceOf_1.instanceOfKey, target) || undefined)
    };
    Reflect.defineMetadata(instanceOf_1.instanceOfKey, instanceOfMetadata, target);
    // Array of
    const arrayOfMetadata = {
        ...(Reflect.getOwnMetadata(arrayOf_1.arrayOfKey, Object.getPrototypeOf(target.constructor)) ||
            undefined),
        ...(Reflect.getOwnMetadata(arrayOf_1.arrayOfKey, target) || undefined)
    };
    Reflect.defineMetadata(arrayOf_1.arrayOfKey, arrayOfMetadata, target);
    return target;
};
exports.Entity = Entity;
exports.default = exports.Entity;
