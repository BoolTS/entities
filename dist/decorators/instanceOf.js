"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InstanceOf = exports.instanceOfKey = void 0;
exports.instanceOfKey = Symbol.for("__bool:entity:instanceOf__");
/**
 *
 * @param path
 * @returns
 */
const InstanceOf = (initializer, options) => (target, propertyKey) => {
    const metadata = {
        ...(Reflect.getOwnMetadata(exports.instanceOfKey, Object.getPrototypeOf(target.constructor)) ||
            undefined),
        ...(Reflect.getOwnMetadata(exports.instanceOfKey, target.constructor) || undefined)
    };
    metadata[propertyKey] =
        propertyKey in metadata
            ? [
                ...metadata[propertyKey],
                {
                    initializer,
                    options
                }
            ]
            : [
                {
                    initializer,
                    options
                }
            ];
    Reflect.defineMetadata(exports.instanceOfKey, metadata, target.constructor);
};
exports.InstanceOf = InstanceOf;
