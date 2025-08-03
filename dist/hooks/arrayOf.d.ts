import type { TInstanceOfOptions } from "../decorators";
import type { TConstructor } from "../ultils";
type TInfer<TExtendOptions extends TInstanceOfOptions, TReturnType> = TExtendOptions extends undefined ? TReturnType[] : TExtendOptions["nullable"] extends true ? TExtendOptions["optional"] extends true ? TReturnType[] | null | undefined : TReturnType[] | null : TExtendOptions["optional"] extends true ? TReturnType[] | undefined : TReturnType[];
export declare const arrayOf: <TInstance extends TConstructor<Object>, TExtendOptions extends TInstanceOfOptions>(data: unknown, target: TInstance, options?: TExtendOptions) => TInfer<TExtendOptions, TInstance>;
export {};
