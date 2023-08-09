import { MobilettoOrmTypeDef, MobilettoOrmTypeDefConfig } from "mobiletto-orm-typedef";
import { generate, GenerateOptions } from "../generate.js";

export const _generate = (
    apiTemplate: string,
    typeDef: MobilettoOrmTypeDef | MobilettoOrmTypeDefConfig,
    typeDefPackage: string,
    opts?: GenerateOptions,
): string => {
    opts ||= {};
    opts.prepareContext = (typeDef: MobilettoOrmTypeDef, ctx: Record<string, unknown>): Record<string, unknown> => {
        return ctx;
    };
    return generate(typeDef, `templates/api/${apiTemplate}.ts.hbs`, opts, { typeDefPackage });
};

export const generateApiIdGet = (
    typeDef: MobilettoOrmTypeDef | MobilettoOrmTypeDefConfig,
    typeDefPackage: string,
    opts?: GenerateOptions,
): string => {
    return _generate("id.get", typeDef, typeDefPackage, opts);
};

export const generateApiIdPut = (
    typeDef: MobilettoOrmTypeDef | MobilettoOrmTypeDefConfig,
    typeDefPackage: string,
    opts?: GenerateOptions,
): string => {
    return _generate("id.put", typeDef, typeDefPackage, opts);
};

export const generateApiIdPatch = (
    typeDef: MobilettoOrmTypeDef | MobilettoOrmTypeDefConfig,
    typeDefPackage: string,
    opts?: GenerateOptions,
): string => {
    return _generate("id.patch", typeDef, typeDefPackage, opts);
};

export const generateApiIdDelete = (
    typeDef: MobilettoOrmTypeDef | MobilettoOrmTypeDefConfig,
    typeDefPackage: string,
    opts?: GenerateOptions,
): string => {
    return _generate("id.delete", typeDef, typeDefPackage, opts);
};

export const generateApiIndexPost = (
    typeDef: MobilettoOrmTypeDef | MobilettoOrmTypeDefConfig,
    typeDefPackage: string,
    opts?: GenerateOptions,
): string => {
    return _generate("index.post", typeDef, typeDefPackage, opts);
};

export const generateApi = (
    typeDef: MobilettoOrmTypeDef | MobilettoOrmTypeDefConfig,
    typeDefPackage: string,
    opts?: GenerateOptions,
): Record<string, string> => {
    opts ||= {};
    return {
        find: generateApiIdGet(
            typeDef,
            typeDefPackage,
            opts.outfile ? Object.assign({}, { outfile: `${opts.outfile}/[id].get.ts` }, opts) : opts,
        ),
        create: generateApiIdPut(
            typeDef,
            typeDefPackage,
            opts.outfile ? Object.assign({}, { outfile: `${opts.outfile}/[id].put.ts` }, opts) : opts,
        ),
        update: generateApiIdPatch(
            typeDef,
            typeDefPackage,
            opts.outfile ? Object.assign({}, { outfile: `${opts.outfile}/[id].patch.ts` }, opts) : opts,
        ),
        delete: generateApiIdDelete(
            typeDef,
            typeDefPackage,
            opts.outfile ? Object.assign({}, { outfile: `${opts.outfile}/[id].delete.ts` }, opts) : opts,
        ),
        search: generateApiIndexPost(
            typeDef,
            typeDefPackage,
            opts.outfile ? Object.assign({}, { outfile: `${opts.outfile}/index.post.ts` }, opts) : opts,
        ),
    };
};
