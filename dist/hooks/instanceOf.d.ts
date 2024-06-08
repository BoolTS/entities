export type TOptions = Partial<{
    nullable: boolean;
    optional: boolean;
}>;
export declare const instanceOf: <T extends Object>(data: unknown, target: new (...args: any[]) => T, options?: TOptions) => T | null | undefined;
