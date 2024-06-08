import * as Zod from "zod";
import { entityKey } from "../decorators/entity";
const acceptableSchema = Zod.record(Zod.any());
export const instanceOf = (data, target, options) => {
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
};
