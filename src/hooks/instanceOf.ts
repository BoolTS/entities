import * as Zod from "zod";

import { entityKey } from "../decorators/entity";

export type TOptions = Partial<{
    nullable: boolean;
    optional: boolean;
}>;

const acceptableSchema = Zod.record(Zod.any());

type TInfer<TExtendOptionss extends TOptions, TReturnType> = TExtendOptionss extends undefined
    ? TReturnType
    : TExtendOptionss["nullable"] extends true
    ? TExtendOptionss["optional"] extends true
        ? TReturnType | null | undefined
        : TReturnType | null
    : TExtendOptionss["optional"] extends true
    ? TReturnType | undefined
    : TReturnType;

export const instanceOf = <TInstance extends Object, TExtendOptionss extends TOptions>(
    data: unknown,
    target: new (...args: any[]) => TInstance,
    options?: TExtendOptionss
): TInfer<TExtendOptionss, TInstance> => {
    if (!Reflect.getOwnMetadataKeys(target).includes(entityKey)) {
        throw Error("The constructor has not registered the entity metadata.");
    }

    // Update acceptable schema
    const nullableAcceptableSchema = !options?.nullable
        ? acceptableSchema
        : acceptableSchema.nullable();

    const optionalAcceptableSchema = !options?.optional
        ? nullableAcceptableSchema
        : nullableAcceptableSchema.optional();

    const validation = optionalAcceptableSchema.safeParse(data);

    if (!validation.success) {
        throw validation.error.issues;
    }

    if (!validation.data) {
        return validation.data as TInfer<TExtendOptionss, TInstance>;
    }

    const instance = new target();

    Object.assign(instance, validation.data);

    return instance as TInfer<TExtendOptionss, TInstance>;
};
