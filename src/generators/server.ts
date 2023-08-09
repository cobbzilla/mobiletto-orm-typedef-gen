import { MobilettoOrmTypeDef, MobilettoOrmTypeDefConfig } from "mobiletto-orm-typedef";
import { generate, GenerateOptions } from "../generate.js";
import * as fs from "fs";

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

const apiOutfile = (opts: GenerateOptions, tsFile: string) =>
    opts.outfile ? Object.assign({}, opts, { outfile: `${opts.outfile}/${tsFile}` }) : opts;

export const generateApi = (
    typeDef: MobilettoOrmTypeDef | MobilettoOrmTypeDefConfig,
    typeDefPackage: string,
    opts?: GenerateOptions,
): Record<string, string> => {
    opts ||= {};
    if (opts.outfile) {
        const stat = fs.statSync(opts.outfile, { throwIfNoEntry: false });
        if (stat && !stat.isDirectory()) {
            throw new Error(
                `generateApi: opts.outfile (${opts.outfile}) must either not exist, or be an existing directory`,
            );
        }
    }
    return {
        find: generateApiIdGet(typeDef, typeDefPackage, apiOutfile(opts, "[id].get.ts")),
        create: generateApiIdPut(typeDef, typeDefPackage, apiOutfile(opts, "[id].put.ts")),
        update: generateApiIdPatch(typeDef, typeDefPackage, apiOutfile(opts, "[id].patch.ts")),
        delete: generateApiIdDelete(typeDef, typeDefPackage, apiOutfile(opts, "[id].delete.ts")),
        search: generateApiIndexPost(typeDef, typeDefPackage, apiOutfile(opts, "index.post.ts")),
    };
};
