import * as Zod from "zod";

import { entityKey } from "../decorators/entity";
import { instanceOf, TOptions } from "./instanceOf";


const acceptableSchema = Zod.array(
    Zod.record(
        Zod.any()
    )
);

type TInfer<TReturnType, TExtendOptions extends TOptions> = TExtendOptions extends undefined ?
    TReturnType[] : TExtendOptions["nullable"] extends true ?
    TExtendOptions["optional"] extends true ?
    (TReturnType[] | null | undefined) : TReturnType[] | null : TExtendOptions["optional"] extends true ?
    (TReturnType[] | undefined) : TReturnType[];

export const arrayOf = <TInstance extends Object, TExtendOptions extends TOptions>(
    data: unknown,
    target: new (...args: any[]) => TInstance,
    options?: TExtendOptions
): TInfer<TInstance, TExtendOptions> => {
    if (!Reflect.getOwnMetadataKeys(target).includes(entityKey)) {
        throw Error("The constructor has not registered the entity metadata.");
    }

    // Update acceptable schema
    const nullableAcceptableSchema = !options?.nullable ?
        acceptableSchema : acceptableSchema.nullable();

    const optionalAcceptableSchema = !options?.optional ?
        nullableAcceptableSchema : nullableAcceptableSchema.optional();

    const validation = optionalAcceptableSchema.safeParse(data);

    if (!validation.success) {
        throw validation.error.issues;
    }

    if (!validation.data) {
        return validation.data as TInfer<TInstance, TExtendOptions>;
    }

    return validation.data.map(x => instanceOf(x, target)) as TInfer<TInstance, TExtendOptions>;
}
