import * as Zod from "zod";

export type TMetadata = Record<string, Zod.Schema>;

export const zodSchemaKey = Symbol.for("__bool:entity:zodSchema__");

/**
 *
 * @param path
 * @returns
 */
export const ZodSchema = (schema: Zod.Schema) => (target: Object, propertyKey: string) => {
    const metadata: TMetadata = {
        ...(Reflect.getOwnMetadata(zodSchemaKey, Object.getPrototypeOf(target.constructor)) ||
            undefined),
        ...(Reflect.getOwnMetadata(zodSchemaKey, target.constructor) || undefined)
    };

    metadata[propertyKey] = schema;

    Reflect.defineMetadata(zodSchemaKey, metadata, target.constructor);
};
