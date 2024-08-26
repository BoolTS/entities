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
exports.inferZodSchema = void 0;
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
                if (!initializer.prototype) {
                    const lazySchema = Zod.lazy(() => {
                        const classContructor = initializer();
                        const classConstructorSchema = (0, exports.inferZodSchema)(classContructor);
                        const nullableSchema = !options?.nullable
                            ? classConstructorSchema
                            : classConstructorSchema.nullable();
                        const optionalSchema = !options?.optional
                            ? nullableSchema
                            : nullableSchema.optional();
                        const transformSchema = optionalSchema.transform((data) => {
                            if (!data) {
                                return data;
                            }
                            const instance = new classContructor();
                            Object.assign(instance, data);
                            return instance;
                        });
                        return transformSchema;
                    });
                    zodSchemaMetadata[key] = !(key in zodSchemaMetadata)
                        ? lazySchema
                        : zodSchemaMetadata[key].or(lazySchema);
                    return;
                }
                const classContructor = initializer;
                const classConstructorSchema = (0, exports.inferZodSchema)(classContructor);
                const nullableSchema = !options?.nullable
                    ? classConstructorSchema
                    : classConstructorSchema.nullable();
                const optionalSchema = !options?.optional
                    ? nullableSchema
                    : nullableSchema.optional();
                const transformSchema = optionalSchema.transform((data) => {
                    if (!data) {
                        return data;
                    }
                    const instance = new classContructor();
                    Object.assign(instance, data);
                    return instance;
                });
                zodSchemaMetadata[key] = !(key in zodSchemaMetadata)
                    ? transformSchema
                    : zodSchemaMetadata[key].or(transformSchema);
                return;
            });
        }
    }
    if (arrayOfMetadata) {
        for (const key in arrayOfMetadata) {
            arrayOfMetadata[key].forEach(({ initializer, options }) => {
                if (!initializer.prototype) {
                    const lazySchema = Zod.lazy(() => {
                        const classContructor = initializer();
                        const classConstructorSchema = (0, exports.inferZodSchema)(classContructor);
                        const transformSchema = classConstructorSchema.transform((data) => {
                            const instance = new classContructor();
                            Object.assign(instance, data);
                            return instance;
                        });
                        const arrayOfSchema = Zod.array(transformSchema);
                        const nullableSchema = !options?.nullable
                            ? arrayOfSchema
                            : arrayOfSchema.nullable();
                        const optionalSchema = !options?.optional
                            ? nullableSchema
                            : nullableSchema.optional();
                        return optionalSchema;
                    });
                    zodSchemaMetadata[key] = !(key in zodSchemaMetadata)
                        ? lazySchema
                        : zodSchemaMetadata[key].or(lazySchema);
                    return;
                }
                const classContructor = initializer;
                const classConstructorSchema = (0, exports.inferZodSchema)(classContructor);
                const transformSchema = classConstructorSchema.transform((data) => {
                    const instance = new classContructor();
                    Object.assign(instance, data);
                    return instance;
                });
                const arrayOfSchema = Zod.array(transformSchema);
                const nullableSchema = !options?.nullable
                    ? arrayOfSchema
                    : arrayOfSchema.nullable();
                const optionalSchema = !options?.optional
                    ? nullableSchema
                    : nullableSchema.optional();
                zodSchemaMetadata[key] = !(key in zodSchemaMetadata)
                    ? optionalSchema
                    : zodSchemaMetadata[key].or(optionalSchema);
                return;
            });
        }
    }
    const resultSchema = Zod.object(zodSchemaMetadata);
    zodSchemaMapper.set(target, resultSchema);
    return resultSchema;
};
exports.inferZodSchema = inferZodSchema;
