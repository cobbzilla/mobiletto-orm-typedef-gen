import { MobilettoOrmTypeDef, MobilettoOrmTypeDefConfig } from "mobiletto-orm-typedef";
import { generate, GenerateOptions } from "../generate.js";

export const generateTypeScriptType = (
    typeDef: MobilettoOrmTypeDef | MobilettoOrmTypeDefConfig,
    opts?: GenerateOptions,
): string => {
    return generate(typeDef, "templates/tsType.ts.hbs", opts);
};
