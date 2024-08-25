import * as Zod from "zod";

import { Entity, InstanceOf, ZodSchema } from "../src";
import { FirstEntity } from "./first.entity";
import { BaseEntity, idSchema } from "./entity";
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
    public info?: Zod.infer<typeof infoSchema>;

    @InstanceOf(() => FirstEntity, { optional: true, nullable: true })
    public __firstEntity: FirstEntity | null | undefined;
}

export default SecondEntity;
