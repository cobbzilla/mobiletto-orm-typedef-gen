import { generate } from "../generate.js";
export const generateTypeScriptType = (typeDef, opts) => {
    return generate(typeDef, "templates/type/tsType.ts.hbs", opts);
};
