import type { ZodType } from "zod/v4";

import { metadataRegister } from "./@common";

export type TMetadata = Record<string | symbol, ZodType>;

export const ZodSchema = <T extends Object>(schema: ZodType) => metadataRegister<T>(schema);
