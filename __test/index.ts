import * as Zod from "zod";

import { arrayOf, instanceOf } from "../src";
import { SecondEntity } from "./second.entity";

try {
    const ins = instanceOf(
        {
            info: {
                content: "12123123",
                slug: "sdjfsjhfkjshdf",
                viewCount: 100
            },
            __firstEntity: {
                info: {
                    content: "12123123",
                    slug: "sdjfsjhfkjshdf",
                    viewCount: 100
                },
                __secondEntities: [
                    {
                        info: {
                            content: "12123123",
                            slug: "sdjfsjhfkjshdf",
                            viewCount: 200
                        }
                    },
                    {
                        info: {
                            content: "12123123",
                            slug: "sdjfsjhfkjshdf",
                            viewCount: 100
                        }
                    },
                    {
                        info: {
                            content: "12123123",
                            slug: "sdjfsjhfkjshdf",
                            viewCount: 100
                        }
                    }
                ]
            }
        },
        SecondEntity
    );

    // const arr = arrayOf(
    //     [
    //         {
    //             info: {
    //                 content: "12123123",
    //                 slug: "sdjfsjhfkjshdf",
    //                 viewCount: 200
    //             }
    //         },
    //         {
    //             info: {
    //                 content: "12123123",
    //                 slug: "sdjfsjhfkjshdf",
    //                 viewCount: 100
    //             }
    //         },
    //         {
    //             info: {
    //                 content: "12123123",
    //                 slug: "sdjfsjhfkjshdf",
    //                 viewCount: 100
    //             }
    //         }
    //     ],
    //     SecondEntity
    // );

    console.debug(ins.__firstEntity?.__secondEntities);
} catch (error) {
    console.error(error);
}
