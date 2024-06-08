import { TOptions } from "../hooks/instanceOf";
export declare const arrayOfKey = "__bool:entity:arrayOf__";
/**
 *
 * @param path
 * @returns
 */
export declare const ArrayOf: <T extends Object>(initializer: (() => new (...args: any[]) => T) | (new (...args: any[]) => T), options?: TOptions) => (target: Object, propertyKey: string) => void;
