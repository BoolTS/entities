import { arrayOf } from "../hooks/arrayOf";
export const arrayOfKey = "__bool:entity:arrayOf__";
/**
 *
 * @param path
 * @returns
 */
export const ArrayOf = (initializer, options) => (target, propertyKey) => {
    let tmpValue = undefined;
    Object.defineProperty(target, propertyKey, {
        get: () => tmpValue,
        set: (newValue) => {
            tmpValue = arrayOf(newValue, !initializer.prototype ?
                initializer() : initializer, options);
        }
    });
};
