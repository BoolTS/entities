import * as Zod from "zod";
import { Entity, ZodSchema } from "../src";

export const idSchema = Zod.string().uuid();

@Entity()
export class OuterEntity {
    @ZodSchema(idSchema)
    createdAt: string;
}
