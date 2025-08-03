import { Entity, ZodSchema } from "@src";
import * as Zod from "zod/v4";

export const idSchema = Zod.uuid();

@Entity()
export class OuterEntity {
    @ZodSchema(idSchema)
    createdAt!: string;
}
