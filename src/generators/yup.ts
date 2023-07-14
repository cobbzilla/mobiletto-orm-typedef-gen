import { MobilettoOrmTypeDef, MobilettoOrmTypeDefConfig } from "mobiletto-orm-typedef";
import { generate, GenerateOptions } from "../generate.js";

export const generateYup = (
    typeDef: MobilettoOrmTypeDef | MobilettoOrmTypeDefConfig,
    opts?: GenerateOptions
): string => {
    opts ||= {};
    opts.prepareContext = (typeDef: MobilettoOrmTypeDef, ctx: Record<string, unknown>): Record<string, unknown> => {
        return ctx;
    };
    return generate(typeDef, "templates/yup.ts.hbs", opts);
};
