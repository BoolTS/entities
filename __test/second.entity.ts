import * as Zod from "zod";

import { Entity, InstanceOf, ZodSchema } from "../src";
import { FirstEntity } from "./first.entity";

const infoSchema = Zod.object({
    content: Zod.string(),
    slug: Zod.string(),
    viewCount: Zod.number()
}).optional();

@Entity()
export class SecondEntity {
    @ZodSchema(infoSchema)
    public info?: Zod.infer<typeof infoSchema>;

    @InstanceOf(() => FirstEntity, { optional: true })
    public __firstEntity: FirstEntity | undefined;
}

export default SecondEntity;
