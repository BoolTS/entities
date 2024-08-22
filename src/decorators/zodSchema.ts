import * as Zod from "zod";

export const zodSchemaKey = "__bool:entity:zodSchema__";

/**
 *
 * @param path
 * @returns
 */
export const ZodSchema = (schema: Zod.Schema) => (target: Object, propertyKey: string) => {
    let tmpValue: Zod.output<typeof schema> | undefined = undefined;

    Object.defineProperty(target, propertyKey, {
        get: () => tmpValue,
        set: (newValue: any) => {
            const validation = schema.safeParse(newValue);

            if (!validation.success) {
                throw validation.error.issues;
            }

            tmpValue = newValue;
        }
    });
};
