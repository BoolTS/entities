import { TInstanceOfOptions } from "../decorators";
type TInfer<TExtendOptions extends TInstanceOfOptions, TReturnType> = TExtendOptions extends undefined ? TReturnType : TExtendOptions["nullable"] extends true ? TExtendOptions["optional"] extends true ? TReturnType | null | undefined : TReturnType | null : TExtendOptions["optional"] extends true ? TReturnType | undefined : TReturnType;
export declare const instanceOf: <TInstance extends Object, TExtendOptions extends Partial<{
    nullable: boolean;
    optional: boolean;
}>>(data: unknown, target: new (...args: any[]) => TInstance, options?: TExtendOptions) => TInfer<TExtendOptions, TInstance>;
export {};
