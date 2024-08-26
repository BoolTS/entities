import * as Zod from "zod";
import {
    TZodSchemaMetadata,
    zodSchemaKey,
    instanceOfKey,
    TInstanceOfMetadata,
    arrayOfKey,
    TFunctionReturnContructor,
    TConstructor
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
                if (!initializer.prototype) {
                    const lazySchema = Zod.lazy(() => {
                        const classContructor = (initializer as TFunctionReturnContructor<any>)();
                        const classConstructorSchema = inferZodSchema(classContructor);
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

                const classContructor = initializer as TConstructor<any>;
                const classConstructorSchema = inferZodSchema(classContructor);
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
                        const classContructor = (initializer as TFunctionReturnContructor<any>)();
                        const classConstructorSchema = inferZodSchema(classContructor);
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

                const classContructor = initializer as TConstructor<any>;
                const classConstructorSchema = inferZodSchema(classContructor);
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
