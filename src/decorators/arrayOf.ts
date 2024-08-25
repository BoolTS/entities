import * as Zod from "zod";

import { arrayOf } from "../hooks/arrayOf";
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
        const metadata: TInstanceOfMetdata<T> = Reflect.getOwnMetadata(
            arrayOfKey,
            target.constructor,
            propertyKey
        ) || {
            [propertyKey]: [
                {
                    initializer: initializer,
                    options: options
                }
            ]
        };

        if (propertyKey in metadata) {
            metadata[propertyKey].push({
                initializer: initializer,
                options: options
            });
        }

        Reflect.defineMetadata(arrayOfKey, metadata, target.constructor);

        // Object.defineProperty(target, propertyKey, {
        //     get: () => tmpValue,
        //     set: (newValue: any) => {
        //         tmpValue = arrayOf(
        //             newValue,
        //             !initializer.prototype
        //                 ? (initializer as () => new (...args: any[]) => T)()
        //                 : (initializer as new (...args: any[]) => T),
        //             options
        //         );
        //     }
        // });
    };
