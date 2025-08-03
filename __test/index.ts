import { arrayOf } from "@src";
import { SecondEntity } from "./second.entity";

try {
    // const ins = instanceOf(
    //     {
    //         id: "8a639ab0-a240-412b-ad9b-8ff903f6f894",
    //         info: {
    //             content: "12123123",
    //             slug: "sdjfsjhfkjshdf",
    //             viewCount: 100
    //         },
    //         __firstEntity: {
    //             id: "8a639ab0-a240-412b-ad9b-8ff903f6f894",
    //             info: {
    //                 content: "12123123",
    //                 slug: "sdjfsjhfkjshdf",
    //                 viewCount: 100
    //             },
    //             __secondEntities: [
    //                 {
    //                     id: "8a639ab0-a240-412b-ad9b-8ff903f6f894",
    //                     info: {
    //                         content: "12123123",
    //                         slug: "sdjfsjhfkjshdf",
    //                         viewCount: 200
    //                     },
    //                     __firstEntity: {
    //                         id: "8a639ab0-a240-412b-ad9b-8ff903f6f894",
    //                         info: {
    //                             content: "12123123",
    //                             slug: "sdjfsjhfkjshdf",
    //                             viewCount: 100
    //                         },
    //                         __secondEntities: []
    //                     }
    //                 },
    //                 {
    //                     id: "8a639ab0-a240-412b-ad9b-8ff903f6f894",
    //                     info: {
    //                         content: "12123123",
    //                         slug: "sdjfsjhfkjshdf",
    //                         viewCount: 100
    //                     }
    //                 },
    //                 {
    //                     id: "8a639ab0-a240-412b-ad9b-8ff903f6f894",
    //                     info: {
    //                         content: "12123123",
    //                         slug: "sdjfsjhfkjshdf",
    //                         viewCount: 100
    //                     }
    //                 }
    //             ]
    //         }
    //     },
    //     SecondEntity
    // );

    const arr = arrayOf(
        [
            {
                id: "8a639ab0-a240-412b-ad9b-8ff903f6f894",
                info: {
                    content: "12123123",
                    slug: "sdjfsjhfkjshdf",
                    viewCount: 200
                }
            },
            {
                id: "8a639ab0-a240-412b-ad9b-8ff903f6f894",
                info: {
                    content: "12123123",
                    slug: "sdjfsjhfkjshdf",
                    viewCount: 100
                }
            },
            {
                id: "8a639ab0-a240-412b-ad9b-8ff903f6f894",
                info: {
                    content: "12123123",
                    slug: "sdjfsjhfkjshdf",
                    viewCount: 100
                }
            }
        ],
        SecondEntity
    );

    console.log(arr);
} catch (error) {
    console.error(JSON.stringify(error));
}
