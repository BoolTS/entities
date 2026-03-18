import type { ZodInt32, ZodNullable, ZodOptional, ZodType } from "zod/v4";

import { int32 } from "zod/v4";
import { metadataRegister } from "./@common";

export type TMetadata = Record<string | symbol, ZodType>;

export type TOptions = {
    nullable?: boolean;
    optional?: boolean;
    multipleOf?: number;
    gt?: number;
    gte?: number;
    lt?: number;
    lte?: number;
    positive?: boolean;
    nonnegative?: boolean;
    negative?: boolean;
    nonpositive?: boolean;
};

export const Int32 = <T extends Object>({
    nullable,
    optional,
    multipleOf,
    gt,
    gte,
    lt,
    lte,
    positive,
    nonnegative,
    negative,
    nonpositive
}: TOptions = {}) => {
    let convertedSchema:
        | ZodInt32
        | ZodNullable<ZodInt32>
        | ZodOptional<ZodInt32>
        | ZodOptional<ZodNullable<ZodInt32>> = int32();

    if (typeof multipleOf === "number") {
        convertedSchema = convertedSchema.multipleOf(multipleOf);
    }

    if (typeof lte === "number") {
        convertedSchema = convertedSchema.lte(lte);
    }

    if (typeof gte === "number") {
        convertedSchema = convertedSchema.gte(gte);
    }

    if (typeof lt === "number") {
        convertedSchema = convertedSchema.lt(lt);
    }

    if (typeof gt === "number") {
        convertedSchema = convertedSchema.gt(gt);
    }

    if (typeof positive === "boolean" && positive) {
        convertedSchema = convertedSchema.positive();
    }

    if (typeof nonpositive === "boolean" && nonpositive) {
        convertedSchema = convertedSchema.nonpositive();
    }

    if (typeof negative === "boolean" && negative) {
        convertedSchema = convertedSchema.negative();
    }

    if (typeof nonnegative === "boolean" && nonnegative) {
        convertedSchema = convertedSchema.nonnegative();
    }

    if (nullable) {
        convertedSchema = convertedSchema.nullable();
    }

    if (optional) {
        convertedSchema = convertedSchema.optional();
    }

    return metadataRegister<T>(convertedSchema);
};
