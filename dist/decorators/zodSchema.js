"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZodSchema = exports.zodSchemaKey = void 0;
exports.zodSchemaKey = "__bool:entity:zodSchema__";
/**
 *
 * @param path
 * @returns
 */
const ZodSchema = (schema) => (target, propertyKey) => {
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
exports.ZodSchema = ZodSchema;
