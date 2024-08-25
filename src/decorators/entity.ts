import type { TMetadata as TInstanceOfMetadata } from "./instanceOf";
import type { TMetadata as TZodSchemaMetadata } from "./zodSchema";
import { arrayOfKey } from "./arrayOf";
import { instanceOfKey } from "./instanceOf";
import { zodSchemaKey } from "./zodSchema";

export const entityKey = Symbol.for("__bool:entity__");

export const Entity =
    () =>
    <T extends Object>(target: T, context?: ClassDecoratorContext) => {
        Reflect.defineMetadata(entityKey, undefined, target);

        // Zod
        const zodMetadata: TZodSchemaMetadata = {
            ...(Reflect.getOwnMetadata(zodSchemaKey, Object.getPrototypeOf(target)) || undefined),
            ...(Reflect.getOwnMetadata(zodSchemaKey, target) || undefined)
        };

        Reflect.defineMetadata(zodSchemaKey, zodMetadata, target);

        // Instance of
        const instanceOfMetadata: TInstanceOfMetadata<T> = {
            ...(Reflect.getOwnMetadata(instanceOfKey, Object.getPrototypeOf(target.constructor)) ||
                undefined),
            ...(Reflect.getOwnMetadata(instanceOfKey, target) || undefined)
        };

        Reflect.defineMetadata(instanceOfKey, instanceOfMetadata, target);

        // Array of
        const arrayOfMetadata: TInstanceOfMetadata<T> = {
            ...(Reflect.getOwnMetadata(arrayOfKey, Object.getPrototypeOf(target.constructor)) ||
                undefined),
            ...(Reflect.getOwnMetadata(arrayOfKey, target) || undefined)
        };

        Reflect.defineMetadata(arrayOfKey, arrayOfMetadata, target);

        return target;
    };

export default Entity;
