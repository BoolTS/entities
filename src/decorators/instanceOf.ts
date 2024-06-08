import * as Zod from "zod";
import { entityKey } from "./entity";
import { instanceOf, TOptions } from "../hooks/instanceOf";


export const instanceOfKey = "__bool:entity:instanceOf__";

/**
 * 
 * @param path 
 * @returns 
 */
export const InstanceOf = <T extends Object>(
    constructor: new (...args: any[]) => T,
    options?: TOptions
) => {
    if (!Reflect.getOwnMetadataKeys(constructor).includes(entityKey)) {
        throw Error("The constructor has not registered the entity metadata.");
    }

    return (
        target: Object,
        propertyKey: string
    ) => {
        let tmpValue: T | null | undefined = undefined;

        Object.defineProperty(target, propertyKey, {
            get: () => tmpValue,
            set: (newValue: any) => {
                tmpValue = instanceOf(newValue, constructor, options);
            }
        });
    }
}