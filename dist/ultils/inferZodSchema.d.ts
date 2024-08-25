import * as Zod from "zod";
export declare const inferZodSchema: <TInstance extends Object>(target: new (...args: any[]) => TInstance) => Zod.ZodType<any, Zod.ZodTypeDef, any>;
