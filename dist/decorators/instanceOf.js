import { instanceOf } from "../hooks/instanceOf";
export const instanceOfKey = "__bool:entity:instanceOf__";
/**
 *
 * @param path
 * @returns
 */
export const InstanceOf = (initializer, options) => {
    return (target, propertyKey) => {
        let tmpValue = undefined;
        Object.defineProperty(target, propertyKey, {
            get: () => tmpValue,
            set: (newValue) => {
                tmpValue = instanceOf(newValue, !initializer.prototype ?
                    initializer() : initializer, options);
            }
        });
    };
};
