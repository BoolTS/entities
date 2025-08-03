import type { TConstructor } from "../ultils";
import type { TMetadata as TInstanceOfMetdata, TOptions } from "./instanceOf";

export const arrayOfKey = Symbol.for("__bool:entity:arrayOf__");

/**
 *
 * @param path
 * @returns
 */
export const ArrayOf =
    <T extends Object, K extends TConstructor<Object>>(
        initializer: K | (() => K),
        options?: TOptions
    ) =>
    (target: T, propertyKey: string) => {
        const metadata: TInstanceOfMetdata<K> = {
            ...(Reflect.getOwnMetadata(arrayOfKey, Object.getPrototypeOf(target.constructor)) ||
                undefined),
            ...(Reflect.getOwnMetadata(arrayOfKey, target.constructor) || undefined)
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

        Reflect.defineMetadata(arrayOfKey, metadata, target.constructor);
    };
