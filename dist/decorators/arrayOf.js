"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArrayOf = exports.arrayOfKey = void 0;
exports.arrayOfKey = Symbol.for("__bool:entity:arrayOf__");
/**
 *
 * @param path
 * @returns
 */
const ArrayOf = (initializer, options) => (target, propertyKey) => {
    const metadata = {
        ...(Reflect.getOwnMetadata(exports.arrayOfKey, Object.getPrototypeOf(target.constructor)) ||
            undefined),
        ...(Reflect.getOwnMetadata(exports.arrayOfKey, target.constructor) || undefined)
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
    Reflect.defineMetadata(exports.arrayOfKey, metadata, target.constructor);
};
exports.ArrayOf = ArrayOf;
