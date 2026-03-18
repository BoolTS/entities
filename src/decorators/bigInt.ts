import type { ZodBigInt, ZodNullable, ZodOptional, ZodType } from "zod/v4";

import { bigint } from "zod/v4";
import { metadataRegister } from "./@common";

export type TMetadata = Record<string | symbol, ZodType>;

export type TOptions = {
    nullable?: boolean;
    optional?: boolean;
    multipleOf?: bigint;
    gt?: bigint;
    gte?: bigint;
    lt?: bigint;
    lte?: bigint;
    positive?: boolean;
    nonnegative?: boolean;
    negative?: boolean;
    nonpositive?: boolean;
};

export const BigInt = <T extends Object>({
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
        | ZodBigInt
        | ZodNullable<ZodBigInt>
        | ZodOptional<ZodBigInt>
        | ZodOptional<ZodNullable<ZodBigInt>> = bigint();

    if (typeof multipleOf === "bigint") {
        convertedSchema = convertedSchema.multipleOf(multipleOf);
    }

    if (typeof lte === "bigint") {
        convertedSchema = convertedSchema.lte(lte);
    }

    if (typeof gte === "bigint") {
        convertedSchema = convertedSchema.gte(gte);
    }

    if (typeof lt === "bigint") {
        convertedSchema = convertedSchema.lt(lt);
    }

    if (typeof gt === "bigint") {
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
