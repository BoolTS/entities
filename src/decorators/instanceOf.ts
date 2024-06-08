import * as Zod from "zod";

import { instanceOf, TOptions } from "../hooks/instanceOf";


export const instanceOfKey = "__bool:entity:instanceOf__";

/**
 * 
 * @param path 
 * @returns 
 */
export const InstanceOf = <T extends Object>(
    initializer: (() => new (...args: any[]) => T) | (new (...args: any[]) => T),
    options?: TOptions
) => {
    return (
        target: Object,
        propertyKey: string
    ) => {
        let tmpValue: T | null | undefined = undefined;

        Object.defineProperty(target, propertyKey, {
            get: () => tmpValue,
            set: (newValue: any) => {
                tmpValue = instanceOf(newValue, !initializer.prototype ?
                    (initializer as () => new (...args: any[]) => T)() : (initializer as new (...args: any[]) => T), options);
            }
        });
    }
}