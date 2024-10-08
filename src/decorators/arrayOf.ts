import { TMetadata as TInstanceOfMetdata, TOptions } from "./instanceOf";

export const arrayOfKey = Symbol.for("__bool:entity:arrayOf__");

/**
 *
 * @param path
 * @returns
 */
export const ArrayOf =
    <T extends Object>(
        initializer: (() => new (...args: any[]) => T) | (new (...args: any[]) => T),
        options?: TOptions
    ) =>
    (target: Object, propertyKey: string) => {
        const metadata: TInstanceOfMetdata<T> = {
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
