import type { ZodType } from "zod/v4";
export type TMetadata = Record<string | symbol, ZodType>;
export declare const metadataRegister: <T extends Object>(schema: ZodType) => (target: T, propertyKey: string) => void;
