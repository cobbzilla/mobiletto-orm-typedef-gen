import { DUMMY_TYPEDEF, generate } from "../generate.js";
import * as fs from "fs";
export const genApiEndpoint = (apiTemplate, typeDef, typeDefPackage, opts, ctx) => {
    opts || (opts = {});
    opts.prepareContext = (typeDef, ctx) => {
        return ctx;
    };
    const cx = ctx ? Object.assign({}, ctx, { typeDefPackage }) : { typeDefPackage };
    return generate(typeDef, `templates/api/${apiTemplate}.ts.hbs`, opts, cx);
};
export const generateApiIdGet = (typeDef, typeDefPackage, opts, singletonDefault, singletonDefaultImport) => {
    const ctx = singletonDefault && singletonDefaultImport ? { singletonDefault, singletonDefaultImport } : {};
    return genApiEndpoint("id.get", typeDef, typeDefPackage, opts, ctx);
};
export const generateApiIdPut = (typeDef, typeDefPackage, opts) => {
    return genApiEndpoint("id.put", typeDef, typeDefPackage, opts);
};
export const generateApiIdPatch = (typeDef, typeDefPackage, opts) => {
    return genApiEndpoint("id.patch", typeDef, typeDefPackage, opts);
};
export const generateApiIdDelete = (typeDef, typeDefPackage, opts) => {
    return genApiEndpoint("id.delete", typeDef, typeDefPackage, opts);
};
export const generateApiIndexPost = (typeDef, typeDefPackage, opts, utilsImportPath) => {
    return genApiEndpoint("index.post", typeDef, typeDefPackage, opts, utilsImportPath ? { utilsImportPath } : undefined);
};
const apiOutfile = (opts, tsFile) => opts.outfile ? Object.assign({}, opts, { outfile: `${opts.outfile}/${tsFile}` }) : opts;
export const generateApi = (typeDef, typeDefPackage, opts, singletonDefault, singletonDefaultImport, utilsImportPath) => {
    opts || (opts = {});
    utilsImportPath || (utilsImportPath = "~/utils/model");
    if (opts.outfile) {
        const stat = fs.statSync(opts.outfile, { throwIfNoEntry: false });
        if (stat && !stat.isDirectory()) {
            throw new Error(`generateApi: opts.outfile (${opts.outfile}) must either not exist, or be an existing directory`);
        }
    }
    return {
        find: generateApiIdGet(typeDef, typeDefPackage, apiOutfile(opts, "[id].get.ts"), singletonDefault, singletonDefaultImport),
        create: generateApiIdPut(typeDef, typeDefPackage, apiOutfile(opts, "[id].put.ts")),
        update: generateApiIdPatch(typeDef, typeDefPackage, apiOutfile(opts, "[id].patch.ts")),
        delete: generateApiIdDelete(typeDef, typeDefPackage, apiOutfile(opts, "[id].delete.ts")),
        search: generateApiIndexPost(typeDef, typeDefPackage, apiOutfile(opts, "index.post.ts"), utilsImportPath),
    };
};
export const generateErrorFilter = (typeDefPackage, opts, logger, loggerImport) => {
    logger || (logger = "logger");
    loggerImport || (loggerImport = "~/server/utils/logger");
    opts || (opts = {});
    opts.prepareContext = (typeDef, ctx) => {
        return ctx;
    };
    return generate(DUMMY_TYPEDEF, `templates/filter/errorFilter.ts.hbs`, opts, {
        typeDefPackage,
        logger,
        loggerImport,
    });
};
export const generateSessionFilter = (typeDefPackage, opts, AccountType, SessionType, SESSION_HEADER, sessionHeaderImport, SESSION_COOKIE_NAME, sessionCookieNameImport, cookieOptions, cookieOptionsImport, errorFilterImport, sessionRepository, sessionRepositoryImport, accountRepository, accountRepositoryImport) => {
    AccountType || (AccountType = "AccountType");
    SessionType || (SessionType = "SessionType");
    SESSION_HEADER || (SESSION_HEADER = "SESSION_HEADER");
    sessionHeaderImport || (sessionHeaderImport = "~/utils/auth");
    SESSION_COOKIE_NAME || (SESSION_COOKIE_NAME = "SESSION_COOKIE_NAME");
    sessionCookieNameImport || (sessionCookieNameImport = "~/utils/auth");
    cookieOptions || (cookieOptions = "cookieOptions");
    cookieOptionsImport || (cookieOptionsImport = "~/server/utils/cookie");
    errorFilterImport || (errorFilterImport = "~/server/utils/filter/errorFilter");
    sessionRepository || (sessionRepository = "sessionRepository");
    sessionRepositoryImport || (sessionRepositoryImport = "~/server/utils/repo/sessionRepo");
    accountRepository || (accountRepository = "accountRepository");
    accountRepositoryImport || (accountRepositoryImport = "~/server/utils/repo/accountRepo");
    opts || (opts = {});
    opts.prepareContext = (typeDef, ctx) => {
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
//# sourceMappingURL=server.js.map