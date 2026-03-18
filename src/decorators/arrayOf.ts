import type { TConstructor } from "../ultils";
import type { TMetadata as TInstanceOfMetdata, TOptions } from "./instanceOf";

import { Keys } from "../constants";

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
            ...(Reflect.getOwnMetadata(Keys.arrayOf, Object.getPrototypeOf(target.constructor)) ||
                undefined),
            ...(Reflect.getOwnMetadata(Keys.arrayOf, target.constructor) || undefined)
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

        Reflect.defineMetadata(Keys.arrayOf, metadata, target.constructor);
    };
