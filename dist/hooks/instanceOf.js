"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.instanceOf = void 0;
const decorators_1 = require("../decorators");
const ultils_1 = require("../ultils");
const zodSchemaMapper = new Map();
const instanceOf = (data, target, options) => {
    if (!Reflect.getOwnMetadataKeys(target).includes(decorators_1.entityKey)) {
        throw Error("The constructor has not registered the entity metadata.");
    }
    const convertedOptions = {
        optional: options?.optional || false,
        nullable: options?.nullable || false
    };
    const cachedSchemas = zodSchemaMapper.get(target);
    const cachedIndex = !cachedSchemas
        ? -1
        : cachedSchemas.findIndex((schema) => schema.optional === convertedOptions.optional &&
            schema.nullable === convertedOptions.nullable);
    const mainSchema = !cachedSchemas || cachedIndex < 0
        ? generateInstanceOfSchema(target, convertedOptions)
        : cachedSchemas[cachedIndex].schema;
    if (!cachedSchemas) {
        zodSchemaMapper.set(target, [
            Object.freeze({
                ...convertedOptions,
                schema: mainSchema
            })
        ]);
    }
    else if (cachedIndex < 0) {
        cachedSchemas.push(Object.freeze({
            ...convertedOptions,
            schema: mainSchema
        }));
        zodSchemaMapper.set(target, cachedSchemas);
    }
    const validation = mainSchema.safeParse(data);
    if (!validation.success) {
        throw validation.error.issues;
    }
    return validation.data;
};
exports.instanceOf = instanceOf;
const generateInstanceOfSchema = (target, options) => {
    const instanceZodSchema = (0, ultils_1.inferZodSchema)(target);
    const nullableSchema = !options?.nullable ? instanceZodSchema : instanceZodSchema.nullable();
    const optionalSchema = !options?.optional ? nullableSchema : nullableSchema.optional();
    const transformSchema = optionalSchema.transform((transformData) => {
        if (!transformData) {
            return transformData;
        }
        const instance = new target();
        Object.assign(instance, transformData);
        return instance;
    });
    return transformSchema;
};
