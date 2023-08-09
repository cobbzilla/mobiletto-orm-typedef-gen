import { generate } from "../generate.js";
export const _generate = (apiTemplate, typeDef, typeDefPackage, opts) => {
    opts || (opts = {});
    opts.prepareContext = (typeDef, ctx) => {
        return ctx;
    };
    return generate(typeDef, `templates/api/${apiTemplate}.ts.hbs`, opts, { typeDefPackage });
};
export const generateApiIdGet = (typeDef, typeDefPackage, opts) => {
    return _generate("id.get", typeDef, typeDefPackage, opts);
};
export const generateApiIdPut = (typeDef, typeDefPackage, opts) => {
    return _generate("id.put", typeDef, typeDefPackage, opts);
};
export const generateApiIdPatch = (typeDef, typeDefPackage, opts) => {
    return _generate("id.patch", typeDef, typeDefPackage, opts);
};
export const generateApiIdDelete = (typeDef, typeDefPackage, opts) => {
    return _generate("id.delete", typeDef, typeDefPackage, opts);
};
export const generateApiIndexPost = (typeDef, typeDefPackage, opts) => {
    return _generate("index.post", typeDef, typeDefPackage, opts);
};
export const generateApi = (typeDef, typeDefPackage, opts) => {
    return {
        find: generateApiIdGet(typeDef, typeDefPackage, opts),
        create: generateApiIdPut(typeDef, typeDefPackage, opts),
        update: generateApiIdPatch(typeDef, typeDefPackage, opts),
        delete: generateApiIdDelete(typeDef, typeDefPackage, opts),
        search: generateApiIndexPost(typeDef, typeDefPackage, opts),
    };
};
