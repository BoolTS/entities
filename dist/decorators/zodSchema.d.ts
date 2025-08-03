import * as Zod from "zod/v4";
export type TMetadata = Record<string | symbol, Zod.Schema>;
export declare const zodSchemaKey: unique symbol;
/**
 *
 * @param path
 * @returns
 */
export declare const ZodSchema: <T extends Object>(schema: Zod.Schema) => (target: T, propertyKey: string) => void;
