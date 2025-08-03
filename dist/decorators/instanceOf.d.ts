import type { TConstructor } from "../ultils";
export type TOptions = Partial<{
    nullable: boolean;
    optional: boolean;
}>;
export type TMetadata<T extends TConstructor<Object>> = Record<string, Array<{
    initializer: T | (() => T);
    options?: TOptions;
}>>;
export declare const instanceOfKey: unique symbol;
/**
 *
 * @param path
 * @returns
 */
export declare const InstanceOf: <T extends Object, K extends TConstructor<Object>>(initializer: K | (() => K), options?: TOptions) => (target: T, propertyKey: string) => void;
