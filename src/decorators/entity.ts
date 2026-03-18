import type { TConstructor } from "../ultils";
import type { TMetadata as TInstanceOfMetadata } from "./instanceOf";
import type { TMetadata as TZodSchemaMetadata } from "./zodSchema";

import { Keys } from "../constants";

export const entityKey = Symbol.for("__bool:entity__");

export const Entity =
    <T extends TConstructor<Object>>() =>
    (target: T, context?: ClassDecoratorContext) => {
        Reflect.defineMetadata(entityKey, undefined, target);

        // Zod
        const zodMetadata: TZodSchemaMetadata = {
            ...(Reflect.getOwnMetadata(Keys.zodSchema, Object.getPrototypeOf(target)) || undefined),
            ...(Reflect.getOwnMetadata(Keys.zodSchema, target) || undefined)
        };

        Reflect.defineMetadata(Keys.zodSchema, zodMetadata, target);

        // Instance of
        const instanceOfMetadata: TInstanceOfMetadata<T> = {
            ...(Reflect.getOwnMetadata(
                Keys.instanceOf,
                Object.getPrototypeOf(target.constructor)
            ) || undefined),
            ...(Reflect.getOwnMetadata(Keys.instanceOf, target) || undefined)
        };

        Reflect.defineMetadata(Keys.instanceOf, instanceOfMetadata, target);

        // Array of
        const arrayOfMetadata: TInstanceOfMetadata<T> = {
            ...(Reflect.getOwnMetadata(Keys.arrayOf, Object.getPrototypeOf(target.constructor)) ||
                undefined),
            ...(Reflect.getOwnMetadata(Keys.arrayOf, target) || undefined)
        };

        Reflect.defineMetadata(Keys.arrayOf, arrayOfMetadata, target);

        return target;
    };

export default Entity;
