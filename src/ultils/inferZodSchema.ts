import type { ZodType } from "zod/v4";
import type { TInstanceOfMetadata, TInstanceOfOptions, TZodSchemaMetadata } from "../decorators";
import type { TConstructor } from "./constructor";

import { array, lazy, object } from "zod/v4";
import { arrayOfKey, instanceOfKey, zodSchemaKey } from "../decorators";

const zodSchemaMapper = new Map<TConstructor<any>, ZodType>();

export const inferZodSchema = <TInstance extends TConstructor<Object>>(target: TInstance) => {
    const cachedSchema = zodSchemaMapper.get(target);

    if (cachedSchema) {
        return cachedSchema;
    }

    const zodSchemaMetadata: TZodSchemaMetadata =
        Reflect.getOwnMetadata(zodSchemaKey, target) || {};
    const instanceOfMetadata: TInstanceOfMetadata<any> | undefined = Reflect.getOwnMetadata(
        instanceOfKey,
        target
    );
    const arrayOfMetadata: TInstanceOfMetadata<any> | undefined = Reflect.getOwnMetadata(
        arrayOfKey,
        target
    );

    if (instanceOfMetadata) {
        for (const key in instanceOfMetadata) {
            instanceOfMetadata[key].forEach(({ initializer, options }) => {
                const schemaInfered = !initializer.prototype
                    ? lazy(() => generateSchema(initializer(), options, false))
                    : generateSchema(initializer, options, false);

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
                    ? lazy(() => generateSchema(initializer(), options, true))
                    : generateSchema(initializer, options, true);

                zodSchemaMetadata[key] = !(key in zodSchemaMetadata)
                    ? schemaInfered
                    : zodSchemaMetadata[key].or(schemaInfered);

                return;
            });
        }
    }

    const resultSchema = object(zodSchemaMetadata);
    zodSchemaMapper.set(target, resultSchema);
    return resultSchema;
};

export const generateSchema = <TInstance extends TConstructor<Object>>(
    target: TInstance,
    options?: TInstanceOfOptions,
    isArray: boolean = false
) => {
    const instanceZodSchema = inferZodSchema(target);

    const transformSchema = instanceZodSchema.transform((transformData) => {
        const instance = new target();
        Object.assign(instance, transformData);
        return instance;
    });
    const intermediateSchema = !isArray ? transformSchema : array(transformSchema);
    const nullableSchema = !options?.nullable ? intermediateSchema : intermediateSchema.nullable();
    const optionalSchema = !options?.optional ? nullableSchema : nullableSchema.optional();

    return optionalSchema;
};
