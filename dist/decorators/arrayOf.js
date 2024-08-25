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
    const metadata = Reflect.getOwnMetadata(exports.arrayOfKey, target.constructor) ||
        Reflect.getOwnMetadata(exports.arrayOfKey, Object.getPrototypeOf(target.constructor)) || {
        [propertyKey]: []
    };
    if (propertyKey in metadata) {
        metadata[propertyKey].push({
            initializer: initializer,
            options: options
        });
    }
    Reflect.defineMetadata(exports.arrayOfKey, metadata, target.constructor);
};
exports.ArrayOf = ArrayOf;
