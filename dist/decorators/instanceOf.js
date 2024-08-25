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
    const metadata = Reflect.getOwnMetadata(exports.instanceOfKey, target.constructor, propertyKey) || {
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
    Reflect.defineMetadata(exports.instanceOfKey, metadata, target.constructor);
    // Object.defineProperty(target, propertyKey, {
    //     get: () => tmpValue,
    //     set: (newValue: any) => {
    //         tmpValue = instanceOf(
    //             newValue,
    //             !initializer.prototype
    //                 ? (initializer as () => new (...args: any[]) => T)()
    //                 : (initializer as new (...args: any[]) => T),
    //             options
    //         );
    //     }
    // });
};
exports.InstanceOf = InstanceOf;
