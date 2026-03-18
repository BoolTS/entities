import type { ZodType } from "zod/v4";

import { Keys } from "../constants";

export type TMetadata = Record<string | symbol, ZodType>;

export const metadataRegister =
    <T extends Object>(schema: ZodType) =>
    (target: T, propertyKey: string) => {
        const metadata: TMetadata = {
            ...(Reflect.getOwnMetadata(Keys.zodSchema, Object.getPrototypeOf(target.constructor)) ||
                undefined),
            ...(Reflect.getOwnMetadata(Keys.zodSchema, target.constructor) || undefined)
        };

        metadata[propertyKey] = schema;

        Reflect.defineMetadata(Keys.zodSchema, metadata, target.constructor);
    };
