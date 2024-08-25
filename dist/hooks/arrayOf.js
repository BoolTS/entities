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
const instanceOf_1 = require("./instanceOf");
const arrayOf = (data, target, options) => {
    if (!Reflect.getOwnMetadataKeys(target).includes(entity_1.entityKey)) {
        throw Error("The constructor has not registered the entity metadata.");
    }
    const instanceZodSchema = (0, instanceOf_1.inferZodSchema)(target);
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
    const validation = optionalSchema.safeParse(data);
    if (!validation.success) {
        throw validation.error.issues;
    }
    return validation.data;
};
exports.arrayOf = arrayOf;
