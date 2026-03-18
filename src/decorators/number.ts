import type { ZodCoercedNumber, ZodNullable, ZodOptional, ZodType } from "zod/v4";

import { coerce, number } from "zod/v4";
import { metadataRegister } from "./@common";

export type TMetadata = Record<string | symbol, ZodType>;

export type TOptions = {
    coerce: boolean;
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

export const Number = <T extends Object>(
    {
        coerce: isCoerce,
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
    }: TOptions = { coerce: false }
) => {
    let convertedSchema:
        | ZodCoercedNumber
        | ZodNullable<ZodCoercedNumber>
        | ZodOptional<ZodCoercedNumber>
        | ZodOptional<ZodNullable<ZodCoercedNumber>> = !isCoerce ? coerce.number() : number();

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
