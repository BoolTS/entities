export const zodSchemaKey = "__bool:entity:zodSchema__";
/**
 *
 * @param path
 * @returns
 */
export const ZodSchema = (schema) => (target, propertyKey) => {
    let tmpValue = undefined;
    Object.defineProperty(target, propertyKey, {
        get: () => tmpValue,
        set: (newValue) => {
            const validation = schema.safeParse(newValue);
            if (!validation.success) {
                throw validation.error.issues;
            }
            tmpValue = validation.data;
        }
    });
};
