import * as Zod from "zod";
import { Entity, ZodSchema } from "../src";
import { OuterEntity } from "./outerEntity";

export const idSchema = Zod.string().uuid();

@Entity()
export class BaseEntity extends OuterEntity {
    @ZodSchema(idSchema)
    id: string | undefined;
}
