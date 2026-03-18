import type { TConstructor } from "../ultils";

import { Keys } from "../constants";

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
            ...(Reflect.getOwnMetadata(
                Keys.instanceOf,
                Object.getPrototypeOf(target.constructor)
            ) || undefined),
            ...(Reflect.getOwnMetadata(Keys.instanceOf, target.constructor) || undefined)
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

        Reflect.defineMetadata(Keys.instanceOf, metadata, target.constructor);
    };
