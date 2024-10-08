export type TOptions = Partial<{
    nullable: boolean;
    optional: boolean;
}>;

export type TFunctionReturnContructor<T> = () => new (...args: any[]) => T;
export type TConstructor<T> = new (...args: any[]) => T;

export type TMetadata<T extends Object> = Record<
    string,
    Array<{
        initializer: TFunctionReturnContructor<T> | TConstructor<T>;
        options?: TOptions;
    }>
>;

export const instanceOfKey = Symbol.for("__bool:entity:instanceOf__");

/**
 *
 * @param path
 * @returns
 */
export const InstanceOf =
    <T extends Object>(
        initializer: (() => new (...args: any[]) => T) | (new (...args: any[]) => T),
        options?: TOptions
    ) =>
    (target: Object, propertyKey: string) => {
        const metadata: TMetadata<T> = {
            ...(Reflect.getOwnMetadata(instanceOfKey, Object.getPrototypeOf(target.constructor)) ||
                undefined),
            ...(Reflect.getOwnMetadata(instanceOfKey, target.constructor) || undefined)
        };

        metadata[propertyKey] =
            propertyKey in metadata
                ? [
                      ...metadata[propertyKey],
                      {
                          initializer,
                          options
                      }
                  ]
                : [
                      {
                          initializer,
                          options
                      }
                  ];

        Reflect.defineMetadata(instanceOfKey, metadata, target.constructor);
    };
