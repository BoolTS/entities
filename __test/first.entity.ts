import * as Zod from "zod/v4";

import { ArrayOf, Entity, ZodSchema } from "@src";
import { BaseEntity } from "./entity";
import { SecondEntity } from "./second.entity";
// import { Types } from "mongoose";

// const mongoIdSchema = Zod.instanceof(Types.ObjectId);

const infoSchema = Zod.object({
    content: Zod.string(),
    slug: Zod.string(),
    viewCount: Zod.number()
}).optional();

@Entity()
export class FirstEntity extends BaseEntity {
    @ZodSchema(infoSchema)
    public info?: Zod.infer<typeof infoSchema>;

    @ArrayOf(() => SecondEntity)
    public __secondEntities!: Array<SecondEntity>;
}
