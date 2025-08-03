import * as Zod from "zod/v4";

export type TMetadata = Record<string | symbol, Zod.Schema>;

export const zodSchemaKey = Symbol.for("__bool:entity:zodSchema__");

/**
 *
 * @param path
 * @returns
 */
export const ZodSchema =
    <T extends Object>(schema: Zod.Schema) =>
    (target: T, propertyKey: string) => {
        const metadata: TMetadata = {
            ...(Reflect.getOwnMetadata(zodSchemaKey, Object.getPrototypeOf(target.constructor)) ||
                undefined),
            ...(Reflect.getOwnMetadata(zodSchemaKey, target.constructor) || undefined)
        };

        metadata[propertyKey] = schema;

        Reflect.defineMetadata(zodSchemaKey, metadata, target.constructor);
    };
