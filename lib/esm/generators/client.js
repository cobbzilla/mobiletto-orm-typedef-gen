import { generate, findTypeDefPackage } from "../generate.js";
export const generateService = (typeDef, typeDefPackage, utilsPath, opts) => {
    typeDefPackage || (typeDefPackage = findTypeDefPackage());
    utilsPath || (utilsPath = `~/utils/model`);
    opts || (opts = {});
    opts.prepareContext = (typeDef, ctx) => {
        return ctx;
    };
    return generate(typeDef, `templates/service/${typeDef.singleton ? "singletonS" : "s"}ervice.ts.hbs`, opts, {
        typeDefPackage,
        utilsPath,
    });
};
export const generateServiceHelper = (typeDef, sessionHeader, sessionHeaderImport, sessionCookie, sessionCookieImport, opts) => {
    sessionHeader || (sessionHeader = "SESSION_HEADER");
    sessionHeaderImport || (sessionHeaderImport = "~/utils/auth");
    sessionCookie || (sessionCookie = "sessionCookie");
    sessionCookieImport || (sessionCookieImport = "~/utils/auth");
    opts || (opts = {});
    opts.prepareContext = (typeDef, ctx) => {
        return ctx;
    };
    return generate(typeDef, "templates/service/serviceHelper.ts.hbs", opts, {
        sessionHeader,
        sessionHeaderImport,
        sessionCookie,
        sessionCookieImport,
    });
};
export const generateStore = (typeDef, typeDefPackage, servicesImportPath, utilsImportPath, opts) => {
    typeDefPackage || (typeDefPackage = findTypeDefPackage());
    servicesImportPath || (servicesImportPath = "~/utils/services/model");
    utilsImportPath || (utilsImportPath = "~/utils/model");
    opts || (opts = {});
    opts.prepareContext = (typeDef, ctx) => {
        return ctx;
    };
    return generate(typeDef, `templates/store/${typeDef.singleton ? "singletonS" : "s"}tore.ts.hbs`, opts, {
        typeDefPackage,
        servicesImportPath,
        utilsImportPath,
    });
};
export const generateStoreHelper = (typeDef) => {
    const opts = {};
    opts.prepareContext = (typeDef, ctx) => {
        return ctx;
    };
    return generate(typeDef, `templates/store/storeHelper.ts.hbs`, opts);
};
export const generateAdmin = (typeDef, typeDefPackage, componentHelperPath, // ~/components/model/${typeDef.typeName}/admin
sessionStoreImport, // ~/stores/session
localeMessages, // localeMessages
opts) => {
    opts || (opts = {});
    opts.prepareContext = (typeDef, ctx) => {
        return ctx;
    };
    return generate(typeDef, `templates/component/admin.vue.hbs`, opts, {
        typeDefPackage,
        componentHelperPath,
        sessionStoreImport,
        localeMessages,
    });
};
export const generateAdminHelper = (typeDef) => {
    const opts = {};
    opts.prepareContext = (typeDef, ctx) => {
        return ctx;
    };
    return generate(typeDef, `templates/component/adminHelper.ts.hbs`, opts);
};
