import * as Zod from "zod";

import { entityKey } from "../decorators/entity";


export type TOptions = Partial<{
    nullable: boolean;
    optional: boolean;
}>;

const acceptableSchema = Zod.record(
    Zod.any()
);

export const instanceOf = <T extends Object>(
    data: unknown,
    target: new (...args: any[]) => T,
    options?: TOptions
) => {
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
        return validation.data;
    }

    const instance = new target();

    Object.assign(instance, validation.data);

    return instance;
}
