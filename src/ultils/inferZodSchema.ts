import * as Zod from "zod";
import {
    TZodSchemaMetadata,
    zodSchemaKey,
    instanceOfKey,
    TInstanceOfMetadata,
    arrayOfKey,
    TFunctionReturnContructor,
    TConstructor,
    TInstanceOfOptions
} from "../decorators";

const zodSchemaMapper = new Map<new (...args: any[]) => any, Zod.Schema>();

export const inferZodSchema = <TInstance extends Object>(
    target: new (...args: any[]) => TInstance
) => {
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
                    ? Zod.lazy(() =>
                          generateSchema(
                              (initializer as TFunctionReturnContructor<any>)(),
                              options,
                              false
                          )
                      )
                    : generateSchema(
                          (initializer as TFunctionReturnContructor<any>)(),
                          options,
                          false
                      );

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
                    ? Zod.lazy(() =>
                          generateSchema(
                              (initializer as TFunctionReturnContructor<any>)(),
                              options,
                              true
                          )
                      )
                    : generateSchema(
                          (initializer as TFunctionReturnContructor<any>)(),
                          options,
                          true
                      );

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

export const generateSchema = (
    target: new (...args: any[]) => Object,
    options?: TInstanceOfOptions,
    isArray: boolean = false
) => {
    const instanceZodSchema = inferZodSchema(target);
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
