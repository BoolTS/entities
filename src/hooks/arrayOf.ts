import * as Zod from "zod";

import { entityKey } from "../decorators/entity";
import { inferZodSchema } from "./instanceOf";
import { TInstanceOfOptions } from "../decorators";

type TInfer<
    TExtendOptions extends TInstanceOfOptions,
    TReturnType
> = TExtendOptions extends undefined
    ? TReturnType[]
    : TExtendOptions["nullable"] extends true
    ? TExtendOptions["optional"] extends true
        ? TReturnType[] | null | undefined
        : TReturnType[] | null
    : TExtendOptions["optional"] extends true
    ? TReturnType[] | undefined
    : TReturnType[];

export const arrayOf = <TInstance extends Object, TExtendOptions extends TInstanceOfOptions>(
    data: unknown,
    target: new (...args: any[]) => TInstance,
    options?: TExtendOptions
): TInfer<TExtendOptions, TInstance> => {
    if (!Reflect.getOwnMetadataKeys(target).includes(entityKey)) {
        throw Error("The constructor has not registered the entity metadata.");
    }

    const instanceZodSchema = inferZodSchema(target);
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

    return validation.data as TInfer<TExtendOptions, TInstance>;
};
