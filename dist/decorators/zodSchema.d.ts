import * as Zod from "zod";
export type TMetadata = Record<string, Zod.Schema>;
export declare const zodSchemaKey: unique symbol;
/**
 *
 * @param path
 * @returns
 */
export declare const ZodSchema: (schema: Zod.Schema) => (target: Object, propertyKey: string) => void;
