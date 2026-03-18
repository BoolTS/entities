import type { ZodType } from "zod/v4";
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
export declare const Number: <T extends Object>({ coerce: isCoerce, nullable, optional, multipleOf, gt, gte, lt, lte, positive, nonnegative, negative, nonpositive }?: TOptions) => (target: T, propertyKey: string) => void;
