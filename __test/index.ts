import * as Zod from "zod";

import { arrayOf, instanceOf } from "../src";
import { SecondEntity } from "./second.entity";

try {
    const ins = instanceOf(
        {
            // _id: new Types.ObjectId(),
            info: {
                content: "12123123",
                slug: "sdjfsjhfkjshdf",
                viewCount: 100
            },
            __firstEntity: {
                // _id: new Types.ObjectId(),
                info: {
                    content: "12123123",
                    slug: "sdjfsjhfkjshdf",
                    viewCount: 100
                },
                __secondEntities: [
                    {
                        // _id: new Types.ObjectId(),
                        info: {
                            content: "12123123",
                            slug: "sdjfsjhfkjshdf",
                            viewCount: 200
                        },
                        __firstEntity: {
                            // _id: new Types.ObjectId(),
                            info: {
                                content: "12123123",
                                slug: "sdjfsjhfkjshdf",
                                viewCount: 100
                            },
                            __secondEntities: []
                        }
                    },
                    {
                        // _id: new Types.ObjectId(),
                        info: {
                            content: "12123123",
                            slug: "sdjfsjhfkjshdf",
                            viewCount: 100
                        }
                    },
                    {
                        // _id: new Types.ObjectId(),
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
    console.error(JSON.stringify(error));
}
