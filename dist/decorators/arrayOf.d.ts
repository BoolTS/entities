import type { TConstructor } from "../ultils";
import type { TOptions } from "./instanceOf";
/**
 *
 * @param path
 * @returns
 */
export declare const ArrayOf: <T extends Object, K extends TConstructor<Object>>(initializer: K | (() => K), options?: TOptions) => (target: T, propertyKey: string) => void;
