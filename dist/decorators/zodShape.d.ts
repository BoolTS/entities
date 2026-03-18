import { type ZodRawShape, type ZodType } from "zod/v4";
export type TMetadata = Record<string | symbol, ZodType>;
export declare const ZodShape: <T extends Object>(shape: ZodRawShape, options?: Partial<{
    nullable: boolean;
    optional: boolean;
    partial: boolean;
}>) => (target: T, propertyKey: string) => void;
