import { TOptions } from "./instanceOf";
type TInfer<TReturnType, TExtendOptions extends TOptions> = TExtendOptions extends undefined ? TReturnType[] : TExtendOptions["nullable"] extends true ? TExtendOptions["optional"] extends true ? (TReturnType[] | null | undefined) : TReturnType[] | null : TExtendOptions["optional"] extends true ? (TReturnType[] | undefined) : TReturnType[];
export declare const arrayOf: <TInstance extends Object, TExtendOptions extends Partial<{
    nullable: boolean;
    optional: boolean;
}>>(data: unknown, target: new (...args: any[]) => TInstance, options?: TExtendOptions) => TInfer<TInstance, TExtendOptions>;
export {};
