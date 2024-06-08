import * as Zod from "zod";
import { entityKey } from "../decorators/entity";
import { instanceOf } from "./instanceOf";
const acceptableSchema = Zod.array(Zod.record(Zod.any()));
export const arrayOf = (data, target, options) => {
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
    return validation.data.map(x => instanceOf(x, target));
};
