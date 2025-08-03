import type { TConstructor } from "../ultils";

export type TOptions = Partial<{
    nullable: boolean;
    optional: boolean;
}>;

export type TMetadata<T extends TConstructor<Object>> = Record<
    string,
    Array<{
        initializer: T | (() => T);
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
    <T extends Object, K extends TConstructor<Object>>(
        initializer: K | (() => K),
        options?: TOptions
    ) =>
    (target: T, propertyKey: string) => {
        const metadata: TMetadata<K> = {
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
