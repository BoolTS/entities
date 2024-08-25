"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZodSchema = exports.zodSchemaKey = void 0;
exports.zodSchemaKey = Symbol.for("__bool:entity:zodSchema__");
/**
 *
 * @param path
 * @returns
 */
const ZodSchema = (schema) => (target, propertyKey) => {
    const metadata = Reflect.getOwnMetadata(exports.zodSchemaKey, target.constructor) ||
        Reflect.getOwnMetadata(exports.zodSchemaKey, Object.getPrototypeOf(target.constructor)) ||
        {};
    metadata[propertyKey] = schema;
    Reflect.defineMetadata(exports.zodSchemaKey, metadata, target.constructor);
};
exports.ZodSchema = ZodSchema;
