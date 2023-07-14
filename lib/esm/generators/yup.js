import { generate } from "../generate.js";
export const generateYup = (typeDef, opts) => {
    opts || (opts = {});
    opts.prepareContext = (typeDef, ctx) => {
        return ctx;
    };
    return generate(typeDef, "templates/yup.ts.hbs", opts);
};
