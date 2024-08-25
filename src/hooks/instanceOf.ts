import * as Zod from "zod";

import {
    arrayOfKey,
    entityKey,
    instanceOfKey,
    TConstructor,
    TFunctionReturnContructor,
    TInstanceOfMetadata,
    TInstanceOfOptions,
    TZodSchemaMetadata,
    zodSchemaKey
} from "../decorators";

type TInfer<
    TExtendOptions extends TInstanceOfOptions,
    TReturnType
> = TExtendOptions extends undefined
    ? TReturnType
    : TExtendOptions["nullable"] extends true
    ? TExtendOptions["optional"] extends true
        ? TReturnType | null | undefined
        : TReturnType | null
    : TExtendOptions["optional"] extends true
    ? TReturnType | undefined
    : TReturnType;

export const inferZodSchema = <TInstance extends Object>(
    target: new (...args: any[]) => TInstance
) => {
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

    return Zod.object(zodSchemaMetadata);
};

export const instanceOf = <TInstance extends Object, TExtendOptions extends TInstanceOfOptions>(
    data: unknown,
    target: new (...args: any[]) => TInstance,
    options?: TExtendOptions
): TInfer<TExtendOptions, TInstance> => {
    if (!Reflect.getOwnMetadataKeys(target).includes(entityKey)) {
        throw Error("The constructor has not registered the entity metadata.");
    }

    const instanceZodSchema = inferZodSchema(target);

    // Update acceptable schema
    const nullableSchema = !options?.nullable ? instanceZodSchema : instanceZodSchema.nullable();
    const optionalSchema = !options?.optional ? nullableSchema : nullableSchema.optional();
    const transformSchema = optionalSchema.transform((data) => {
        if (!data) {
            return data;
        }

        const instance = new target();
        Object.assign(instance, data);
        return instance;
    });
    const validation = transformSchema.safeParse(data);

    if (!validation.success) {
        throw validation.error.issues;
    }

    return validation.data as TInfer<TExtendOptions, TInstance>;
};
