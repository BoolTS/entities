export const entityKey = "__bool:entity__";
export const Entity = () => (target, context) => {
    Reflect.defineMetadata(entityKey, undefined, target);
    return target;
};
export default Entity;
