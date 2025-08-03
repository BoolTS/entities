import * as Zod from "zod/v4";

import { Entity, ZodSchema } from "@src";
// import { OuterEntity } from "./outerEntity";

export const idSchema = Zod.uuid();

@Entity()
export class BaseEntity {
    @ZodSchema(idSchema)
    id!: string;
}
