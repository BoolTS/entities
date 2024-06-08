import { TOptions } from "./instanceOf";
export declare const arrayOf: <T extends Object>(data: unknown, target: new (...args: any[]) => T, options?: TOptions) => T[] | null | undefined;
