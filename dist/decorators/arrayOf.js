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
    const metadata = Reflect.getOwnMetadata(exports.arrayOfKey, target.constructor, propertyKey) || {
        [propertyKey]: [
            {
                initializer: initializer,
                options: options
            }
        ]
    };
    if (propertyKey in metadata) {
        metadata[propertyKey].push({
            initializer: initializer,
            options: options
        });
    }
    Reflect.defineMetadata(exports.arrayOfKey, metadata, target.constructor);
    // Object.defineProperty(target, propertyKey, {
    //     get: () => tmpValue,
    //     set: (newValue: any) => {
    //         tmpValue = arrayOf(
    //             newValue,
    //             !initializer.prototype
    //                 ? (initializer as () => new (...args: any[]) => T)()
    //                 : (initializer as new (...args: any[]) => T),
    //             options
    //         );
    //     }
    // });
};
exports.ArrayOf = ArrayOf;
