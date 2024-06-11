"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InstanceOf = exports.instanceOfKey = void 0;
const instanceOf_1 = require("../hooks/instanceOf");
exports.instanceOfKey = "__bool:entity:instanceOf__";
/**
 *
 * @param path
 * @returns
 */
const InstanceOf = (initializer, options) => {
    return (target, propertyKey) => {
        let tmpValue = undefined;
        Object.defineProperty(target, propertyKey, {
            get: () => tmpValue,
            set: (newValue) => {
                tmpValue = (0, instanceOf_1.instanceOf)(newValue, !initializer.prototype ?
                    initializer() : initializer, options);
            }
        });
    };
};
exports.InstanceOf = InstanceOf;
