import type { ZodType } from "zod/v4";
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
export declare const Int64: <T extends Object>({ nullable, optional, multipleOf, gt, gte, lt, lte, positive, nonnegative, negative, nonpositive }?: TOptions) => (target: T, propertyKey: string) => void;
