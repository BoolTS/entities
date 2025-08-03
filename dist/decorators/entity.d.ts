import type { TConstructor } from "../ultils";
export declare const entityKey: unique symbol;
export declare const Entity: <T extends TConstructor<Object>>() => (target: T, context?: ClassDecoratorContext) => T;
export default Entity;
