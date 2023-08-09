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
    opts || (opts = {});
    return {
        find: generateApiIdGet(typeDef, typeDefPackage, opts.outfile ? Object.assign({}, { outfile: `${opts.outfile}/[id].get.ts` }, opts) : opts),
        create: generateApiIdPut(typeDef, typeDefPackage, opts.outfile ? Object.assign({}, { outfile: `${opts.outfile}/[id].put.ts` }, opts) : opts),
        update: generateApiIdPatch(typeDef, typeDefPackage, opts.outfile ? Object.assign({}, { outfile: `${opts.outfile}/[id].patch.ts` }, opts) : opts),
        delete: generateApiIdDelete(typeDef, typeDefPackage, opts.outfile ? Object.assign({}, { outfile: `${opts.outfile}/[id].delete.ts` }, opts) : opts),
        search: generateApiIndexPost(typeDef, typeDefPackage, opts.outfile ? Object.assign({}, { outfile: `${opts.outfile}/index.post.ts` }, opts) : opts),
    };
};
