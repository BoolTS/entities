import * as Zod from "zod";
export declare const zodSchemaKey = "__bool:entity:zodSchema__";
/**
 *
 * @param path
 * @returns
 */
export declare const ZodSchema: (schema: Zod.Schema) => (target: Object, propertyKey: string) => void;
