export type TOptions = Partial<{
    nullable: boolean;
    optional: boolean;
}>;
export type TFunctionReturnContructor<T> = () => new (...args: any[]) => T;
export type TConstructor<T> = new (...args: any[]) => T;
export type TMetadata<T extends Object> = Record<string, Array<{
    initializer: TFunctionReturnContructor<T> | TConstructor<T>;
    options?: TOptions;
}>>;
export declare const instanceOfKey: unique symbol;
/**
 *
 * @param path
 * @returns
 */
export declare const InstanceOf: <T extends Object>(initializer: (() => new (...args: any[]) => T) | (new (...args: any[]) => T), options?: TOptions) => (target: Object, propertyKey: string) => void;
