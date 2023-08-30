import { MobilettoOrmTypeDef, MobilettoOrmTypeDefConfig } from "mobiletto-orm-typedef";
import { DUMMY_TYPEDEF, generate, GenerateOptions } from "../generate.js";
import * as fs from "fs";

export const genApiEndpoint = (
    apiTemplate: string,
    typeDef: MobilettoOrmTypeDef | MobilettoOrmTypeDefConfig,
    typeDefPackage: string,
    opts?: GenerateOptions,
    ctx?: Record<string, string>,
): string => {
    opts ||= {};
    opts.prepareContext = (typeDef: MobilettoOrmTypeDef, ctx: Record<string, unknown>): Record<string, unknown> => {
        return ctx;
    };
    const cx = ctx ? Object.assign({}, ctx, { typeDefPackage }) : { typeDefPackage };
    return generate(typeDef, `templates/api/${apiTemplate}.ts.hbs`, opts, cx);
};

export const generateApiIdGet = (
    typeDef: MobilettoOrmTypeDef | MobilettoOrmTypeDefConfig,
    typeDefPackage: string,
    opts?: GenerateOptions,
    singletonDefault?: string,
    singletonDefaultImport?: string,
): string => {
    const ctx: Record<string, string> =
        singletonDefault && singletonDefaultImport ? { singletonDefault, singletonDefaultImport } : {};
    return genApiEndpoint("id.get", typeDef, typeDefPackage, opts, ctx);
};

export const generateApiIdPut = (
    typeDef: MobilettoOrmTypeDef | MobilettoOrmTypeDefConfig,
    typeDefPackage: string,
    opts?: GenerateOptions,
): string => {
    return genApiEndpoint("id.put", typeDef, typeDefPackage, opts);
};

export const generateApiIdPatch = (
    typeDef: MobilettoOrmTypeDef | MobilettoOrmTypeDefConfig,
    typeDefPackage: string,
    opts?: GenerateOptions,
): string => {
    return genApiEndpoint("id.patch", typeDef, typeDefPackage, opts);
};

export const generateApiIdDelete = (
    typeDef: MobilettoOrmTypeDef | MobilettoOrmTypeDefConfig,
    typeDefPackage: string,
    opts?: GenerateOptions,
): string => {
    return genApiEndpoint("id.delete", typeDef, typeDefPackage, opts);
};

export const generateApiIndexPost = (
    typeDef: MobilettoOrmTypeDef | MobilettoOrmTypeDefConfig,
    typeDefPackage: string,
    opts?: GenerateOptions,
    utilsImportPath?: string,
): string => {
    return genApiEndpoint(
        "index.post",
        typeDef,
        typeDefPackage,
        opts,
        utilsImportPath ? { utilsImportPath } : undefined,
    );
};

const apiOutfile = (opts: GenerateOptions, tsFile: string) =>
    opts.outfile ? Object.assign({}, opts, { outfile: `${opts.outfile}/${tsFile}` }) : opts;

export const generateApi = (
    typeDef: MobilettoOrmTypeDef | MobilettoOrmTypeDefConfig,
    typeDefPackage: string,
    opts?: GenerateOptions,
    singletonDefault?: string,
    singletonDefaultImport?: string,
    utilsImportPath?: string,
): Record<string, string> => {
    opts ||= {};
    utilsImportPath ||= "~/utils/model";
    if (opts.outfile) {
        const stat = fs.statSync(opts.outfile, { throwIfNoEntry: false });
        if (stat && !stat.isDirectory()) {
            throw new Error(
                `generateApi: opts.outfile (${opts.outfile}) must either not exist, or be an existing directory`,
            );
        }
    }
    return {
        find: generateApiIdGet(
            typeDef,
            typeDefPackage,
            apiOutfile(opts, "[id].get.ts"),
            singletonDefault,
            singletonDefaultImport,
        ),
        create: generateApiIdPut(typeDef, typeDefPackage, apiOutfile(opts, "[id].put.ts")),
        update: generateApiIdPatch(typeDef, typeDefPackage, apiOutfile(opts, "[id].patch.ts")),
        delete: generateApiIdDelete(typeDef, typeDefPackage, apiOutfile(opts, "[id].delete.ts")),
        search: generateApiIndexPost(typeDef, typeDefPackage, apiOutfile(opts, "index.post.ts"), utilsImportPath),
    };
};

export const generateErrorFilter = (
    typeDefPackage: string,
    opts?: GenerateOptions,
    logger?: string,
    loggerImport?: string,
): string => {
    logger ||= "logger";
    loggerImport ||= "~/server/utils/logger";
    opts ||= {};
    opts.prepareContext = (typeDef: MobilettoOrmTypeDef, ctx: Record<string, unknown>): Record<string, unknown> => {
        return ctx;
    };
    return generate(DUMMY_TYPEDEF, `templates/filter/errorFilter.ts.hbs`, opts, {
        typeDefPackage,
        logger,
        loggerImport,
    });
};

export const generateSessionFilter = (
    typeDefPackage: string,
    opts?: GenerateOptions,
    AccountType?: string,
    SessionType?: string,
    SESSION_HEADER?: string,
    sessionHeaderImport?: string,
    SESSION_COOKIE_NAME?: string,
    sessionCookieNameImport?: string,
    cookieOptions?: string,
    cookieOptionsImport?: string,
    errorFilterImport?: string,
    sessionRepository?: string,
    sessionRepositoryImport?: string,
    accountRepository?: string,
    accountRepositoryImport?: string,
): string => {
    AccountType ||= "AccountType";
    SessionType ||= "SessionType";
    SESSION_HEADER ||= "SESSION_HEADER";
    sessionHeaderImport ||= "~/utils/auth";
    SESSION_COOKIE_NAME ||= "SESSION_COOKIE_NAME";
    sessionCookieNameImport ||= "~/utils/auth";
    cookieOptions ||= "cookieOptions";
    cookieOptionsImport ||= "~/server/utils/cookie";
    errorFilterImport ||= "~/server/utils/filter/errorFilter";
    sessionRepository ||= "sessionRepository";
    sessionRepositoryImport ||= "~/server/utils/repo/sessionRepo";
    accountRepository ||= "accountRepository";
    accountRepositoryImport ||= "~/server/utils/repo/accountRepo";
    opts ||= {};
    opts.prepareContext = (typeDef: MobilettoOrmTypeDef, ctx: Record<string, unknown>): Record<string, unknown> => {
        return ctx;
    };
    return generate(DUMMY_TYPEDEF, `templates/filter/sessionFilter.ts.hbs`, opts, {
        typeDefPackage,
        AccountType,
        SessionType,
        SESSION_HEADER,
        sessionHeaderImport,
        SESSION_COOKIE_NAME,
        sessionCookieNameImport,
        cookieOptions,
        cookieOptionsImport,
        errorFilterImport,
        sessionRepository,
        sessionRepositoryImport,
        accountRepository,
        accountRepositoryImport,
    });
};
