import * as Zod from "zod";

import { instanceOf } from "../src";
import { SecondEntity } from "./second.entity";



try {
    const ins = instanceOf({
        info: {
            content: "12123123",
            slug: "sdjfsjhfkjshdf",
            viewCount: 100
        },
        __firstEntity: undefined
    }, SecondEntity);

}
catch (error) {
    console.log(error);
}