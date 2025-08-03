import * as Zod from "zod/v4";

import { Entity, InstanceOf, ZodSchema } from "@src";
import { BaseEntity } from "./entity";
import { FirstEntity } from "./first.entity";
// import { Types } from "mongoose";

// const mongoIdSchema = Zod.instanceof(Types.ObjectId);

const infoSchema = Zod.object({
    content: Zod.string(),
    slug: Zod.string(),
    viewCount: Zod.number()
}).optional();

@Entity()
export class SecondEntity extends BaseEntity {
    @ZodSchema(infoSchema)
    info?: Zod.infer<typeof infoSchema>;

    @InstanceOf(FirstEntity, { optional: true, nullable: true })
    __firstEntity!: FirstEntity | null | undefined;
}
