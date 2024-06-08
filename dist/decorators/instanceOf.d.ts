import { TOptions } from "../hooks/instanceOf";
export declare const instanceOfKey = "__bool:entity:instanceOf__";
/**
 *
 * @param path
 * @returns
 */
export declare const InstanceOf: <T extends Object>(initializer: (() => new (...args: any[]) => T) | (new (...args: any[]) => T), options?: TOptions) => (target: Object, propertyKey: string) => void;
