"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArrayOf = exports.arrayOfKey = void 0;
const arrayOf_1 = require("../hooks/arrayOf");
exports.arrayOfKey = "__bool:entity:arrayOf__";
/**
 *
 * @param path
 * @returns
 */
const ArrayOf = (initializer, options) => (target, propertyKey) => {
    let tmpValue = undefined;
    Object.defineProperty(target, propertyKey, {
        get: () => tmpValue,
        set: (newValue) => {
            tmpValue = (0, arrayOf_1.arrayOf)(newValue, !initializer.prototype ?
                initializer() : initializer, options);
        }
    });
};
exports.ArrayOf = ArrayOf;
