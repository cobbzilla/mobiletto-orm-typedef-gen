import { generate } from "../generate.js";
export const generateTypeScriptType = (typeDef, opts) => {
    return generate(typeDef, "templates/tsType.ts.hbs", opts);
};
