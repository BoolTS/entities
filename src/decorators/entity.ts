export const entityKey = "__bool:entity__";

export const Entity = () => <T extends Object>(
    target: T,
    context?: ClassDecoratorContext
) => {
    Reflect.defineMetadata(entityKey, undefined, target);

    return target;
}

export default Entity;
