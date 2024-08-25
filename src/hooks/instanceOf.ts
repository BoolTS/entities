import { entityKey, TInstanceOfOptions } from "../decorators";
import { inferZodSchema } from "../ultils";

type TInfer<
    TExtendOptions extends TInstanceOfOptions,
    TReturnType
> = TExtendOptions extends undefined
    ? TReturnType
    : TExtendOptions["nullable"] extends true
    ? TExtendOptions["optional"] extends true
        ? TReturnType | null | undefined
        : TReturnType | null
    : TExtendOptions["optional"] extends true
    ? TReturnType | undefined
    : TReturnType;

const zodSchemaMapper = new Map<
    new (...args: any[]) => any,
    Readonly<{
        optional: boolean;
        nullable: boolean;
        schema: Zod.Schema;
    }>[]
>();

export const instanceOf = <TInstance extends Object, TExtendOptions extends TInstanceOfOptions>(
    data: unknown,
    target: new (...args: any[]) => TInstance,
    options?: TExtendOptions
): TInfer<TExtendOptions, TInstance> => {
    if (!Reflect.getOwnMetadataKeys(target).includes(entityKey)) {
        throw Error("The constructor has not registered the entity metadata.");
    }

    const convertedOptions: Required<TInstanceOfOptions> = {
        optional: options?.optional || false,
        nullable: options?.nullable || false
    };

    const cachedSchemas = zodSchemaMapper.get(target);
    const cachedIndex = !cachedSchemas
        ? -1
        : cachedSchemas.findIndex(
              (schema) =>
                  schema.optional === convertedOptions.optional &&
                  schema.nullable === convertedOptions.nullable
          );
    const mainSchema =
        !cachedSchemas || cachedIndex < 0
            ? generateInstanceOfSchema(target, convertedOptions)
            : cachedSchemas[cachedIndex].schema;

    if (!cachedSchemas) {
        zodSchemaMapper.set(target, [
            Object.freeze({
                ...convertedOptions,
                schema: mainSchema
            })
        ]);
    } else if (cachedIndex < 0) {
        cachedSchemas.push(
            Object.freeze({
                ...convertedOptions,
                schema: mainSchema
            })
        );

        zodSchemaMapper.set(target, cachedSchemas);
    }

    const validation =
        "passthrough" in mainSchema && typeof mainSchema.passthrough === "function"
            ? mainSchema.passthrough().safeParse(data)
            : mainSchema.safeParse(data);

    if (!validation.success) {
        throw validation.error.issues;
    }

    return validation.data as TInfer<TExtendOptions, TInstance>;
};

const generateInstanceOfSchema = (
    target: new (...args: any[]) => Object,
    options: TInstanceOfOptions
) => {
    const instanceZodSchema = inferZodSchema(target);
    const nullableSchema = !options?.nullable ? instanceZodSchema : instanceZodSchema.nullable();
    const optionalSchema = !options?.optional ? nullableSchema : nullableSchema.optional();
    const transformSchema = optionalSchema.transform((transformData) => {
        if (!transformData) {
            return transformData;
        }

        const instance = new target();
        Object.assign(instance, transformData);
        return instance;
    });

    return transformSchema;
};
