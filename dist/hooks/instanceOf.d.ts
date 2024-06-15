export type TOptions = Partial<{
    nullable: boolean;
    optional: boolean;
}>;
type TInfer<TExtendOptionss extends TOptions, TReturnType> = TExtendOptionss extends undefined ? TReturnType : TExtendOptionss["nullable"] extends true ? TExtendOptionss["optional"] extends true ? (TReturnType | null | undefined) : TReturnType | null : TExtendOptionss["optional"] extends true ? (TReturnType | undefined) : TReturnType;
export declare const instanceOf: <TInstance extends Object, TExtendOptionss extends Partial<{
    nullable: boolean;
    optional: boolean;
}>>(data: unknown, target: new (...args: any[]) => TInstance, options?: TExtendOptionss) => TInfer<TExtendOptionss, TInstance>;
export {};
