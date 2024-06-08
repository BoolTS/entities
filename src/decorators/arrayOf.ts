import * as Zod from "zod";

import { arrayOf } from "../hooks/arrayOf";
import { TOptions } from "../hooks/instanceOf";


export const arrayOfKey = "__bool:entity:arrayOf__";

/**
 * 
 * @param path 
 * @returns 
 */
export const ArrayOf = <T extends Object>(
    initializer: (() => new (...args: any[]) => T) | (new (...args: any[]) => T),
    options?: TOptions
) => (
    target: Object,
    propertyKey: string
) => {
        let tmpValue: Array<T> | null | undefined = undefined;

        Object.defineProperty(target, propertyKey, {
            get: () => tmpValue,
            set: (newValue: any) => {
                tmpValue = arrayOf(newValue, !initializer.prototype ?
                    (initializer as () => new (...args: any[]) => T)() : (initializer as new (...args: any[]) => T), options);
            }
        });
    }