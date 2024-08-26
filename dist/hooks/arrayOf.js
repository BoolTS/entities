"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.arrayOf = void 0;
const entity_1 = require("../decorators/entity");
const ultils_1 = require("../ultils");
const zodSchemaMapper = new Map();
const arrayOf = (data, target, options) => {
    if (!Reflect.getOwnMetadataKeys(target).includes(entity_1.entityKey)) {
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
        ? (0, ultils_1.generateSchema)(target, convertedOptions, true)
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
exports.arrayOf = arrayOf;
