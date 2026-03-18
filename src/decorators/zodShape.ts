import { type ZodRawShape, type ZodType, ZodObject } from "zod/v4";

import { object } from "zod/v4";
import { metadataRegister } from "./@common";

export type TMetadata = Record<string | symbol, ZodType>;

export const ZodShape = <T extends Object>(
    shape: ZodRawShape,
    options?: Partial<{
        nullable: boolean;
        optional: boolean;
        partial: boolean;
    }>
) => {
    let convertedSchema: ZodType = object(shape);

    if (options) {
        const { nullable, optional, partial } = options;

        if (nullable) {
            convertedSchema = convertedSchema.nullable();
        }

        if (optional) {
            convertedSchema = convertedSchema.optional();
        }

        if (partial && convertedSchema instanceof ZodObject) {
            convertedSchema = convertedSchema.partial();
        }
    }

    return metadataRegister<T>(convertedSchema);
};
