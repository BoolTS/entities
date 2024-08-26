"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.arrayOf = void 0;
const Zod = __importStar(require("zod"));
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
        ? generateArrayOfSchema(target, convertedOptions)
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
const generateArrayOfSchema = (target, options) => {
    const instanceZodSchema = (0, ultils_1.inferZodSchema)(target);
    const transformSchema = instanceZodSchema.transform((data) => {
        const instance = new target();
        Object.assign(instance, data);
        return instance;
    });
    const arrayOfInstanceZodSchema = Zod.array(transformSchema);
    const nullableSchema = !options?.nullable
        ? arrayOfInstanceZodSchema
        : arrayOfInstanceZodSchema.nullable();
    const optionalSchema = !options?.optional ? nullableSchema : nullableSchema.optional();
    return optionalSchema;
};
