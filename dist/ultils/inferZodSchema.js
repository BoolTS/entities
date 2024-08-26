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
exports.generateSchema = exports.inferZodSchema = void 0;
const Zod = __importStar(require("zod"));
const decorators_1 = require("../decorators");
const zodSchemaMapper = new Map();
const inferZodSchema = (target) => {
    const cachedSchema = zodSchemaMapper.get(target);
    if (cachedSchema) {
        return cachedSchema;
    }
    const zodSchemaMetadata = Reflect.getOwnMetadata(decorators_1.zodSchemaKey, target) || {};
    const instanceOfMetadata = Reflect.getOwnMetadata(decorators_1.instanceOfKey, target);
    const arrayOfMetadata = Reflect.getOwnMetadata(decorators_1.arrayOfKey, target);
    if (instanceOfMetadata) {
        for (const key in instanceOfMetadata) {
            instanceOfMetadata[key].forEach(({ initializer, options }) => {
                const schemaInfered = !initializer.prototype
                    ? Zod.lazy(() => (0, exports.generateSchema)(initializer(), options, true))
                    : (0, exports.generateSchema)(initializer(), options, true);
                zodSchemaMetadata[key] = !(key in zodSchemaMetadata)
                    ? schemaInfered
                    : zodSchemaMetadata[key].or(schemaInfered);
                return;
            });
        }
    }
    if (arrayOfMetadata) {
        for (const key in arrayOfMetadata) {
            arrayOfMetadata[key].forEach(({ initializer, options }) => {
                const schemaInfered = !initializer.prototype
                    ? Zod.lazy(() => (0, exports.generateSchema)(initializer(), options, true))
                    : (0, exports.generateSchema)(initializer(), options, true);
                zodSchemaMetadata[key] = !(key in zodSchemaMetadata)
                    ? schemaInfered
                    : zodSchemaMetadata[key].or(schemaInfered);
                return;
            });
        }
    }
    const resultSchema = Zod.object(zodSchemaMetadata);
    zodSchemaMapper.set(target, resultSchema);
    return resultSchema;
};
exports.inferZodSchema = inferZodSchema;
const generateSchema = (target, options, isArray = false) => {
    const instanceZodSchema = (0, exports.inferZodSchema)(target);
    const transformSchema = instanceZodSchema.transform((transformData) => {
        const instance = new target();
        Object.assign(instance, transformData);
        return instance;
    });
    const intermediateSchema = !isArray ? transformSchema : Zod.array(transformSchema);
    const nullableSchema = !options?.nullable ? intermediateSchema : intermediateSchema.nullable();
    const optionalSchema = !options?.optional ? nullableSchema : nullableSchema.optional();
    return optionalSchema;
};
exports.generateSchema = generateSchema;
