import { TOptions } from "./instanceOf";
export declare const arrayOfKey: unique symbol;
/**
 *
 * @param path
 * @returns
 */
export declare const ArrayOf: <T extends Object>(initializer: (() => new (...args: any[]) => T) | (new (...args: any[]) => T), options?: TOptions) => (target: Object, propertyKey: string) => void;
