import * as Zod from "zod";

import { entityKey } from "./entity";
import { arrayOf } from "../hooks/arrayOf";
import { TOptions } from "../hooks/instanceOf";
import { ClassDeclaration } from "typescript";


export const arrayOfKey = "__bool:entity:arrayOf__";

/**
 * 
 * @param path 
 * @returns 
 */
export const ArrayOf = <T extends Object>(
    initializer: (() => ClassDeclaration) | (new (...args: any[]) => T),
    options?: TOptions
) => {
    try {
        const constructor = !initializer.prototype;
    }
    catch (error) {

    }

    // if (!Reflect.getOwnMetadataKeys(constructor).includes(entityKey)) {
    //     throw Error("The constructor has not registered the entity metadata.");
    // }

    return (
        target: Object,
        propertyKey: string
    ) => {
        let tmpValue: Array<T> | null | undefined = undefined;

        Object.defineProperty(target, propertyKey, {
            get: () => tmpValue,
            set: (newValue: any) => {
                // tmpValue = arrayOf(newValue, constructor, options);
            }
        });
    }
}