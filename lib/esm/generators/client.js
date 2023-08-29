import { DUMMY_TYPEDEF, generate } from "../generate.js";
export const generateService = (typeDef, typeDefPackage, opts, utilsPath) => {
    utilsPath || (utilsPath = `~/utils/model`);
    opts || (opts = {});
    opts.prepareContext = (typeDef, ctx) => {
        return ctx;
    };
    opts.rootOnly = true;
    return generate(typeDef, `templates/service/${typeDef.singleton ? "singletonS" : "s"}ervice.ts.hbs`, opts, {
        typeDefPackage,
        utilsPath,
    });
};
export const generateServiceHelper = (opts, sessionHeader, sessionHeaderImport, sessionCookie, sessionCookieImport) => {
    sessionHeader || (sessionHeader = "SESSION_HEADER");
    sessionHeaderImport || (sessionHeaderImport = "~/utils/auth");
    sessionCookie || (sessionCookie = "sessionCookie");
    sessionCookieImport || (sessionCookieImport = "~/utils/auth");
    opts || (opts = {});
    opts.prepareContext = (typeDef, ctx) => {
        return ctx;
    };
    opts.rootOnly = true;
    return generate(DUMMY_TYPEDEF, "templates/service/serviceHelper.ts.hbs", opts, {
        sessionHeader,
        sessionHeaderImport,
        sessionCookie,
        sessionCookieImport,
    });
};
export const generateStore = (typeDef, typeDefPackage, opts, servicesImportPath, utilsImportPath) => {
    servicesImportPath || (servicesImportPath = "~/utils/services/model");
    utilsImportPath || (utilsImportPath = "~/utils/model");
    opts || (opts = {});
    opts.prepareContext = (typeDef, ctx) => {
        return ctx;
    };
    opts.rootOnly = true;
    return generate(typeDef, `templates/store/${typeDef.singleton ? "singletonS" : "s"}tore.ts.hbs`, opts, {
        typeDefPackage,
        servicesImportPath,
        utilsImportPath,
    });
};
export const generateStoreHelper = (opts) => {
    opts || (opts = {});
    opts.prepareContext = (typeDef, ctx) => {
        return ctx;
    };
    opts.rootOnly = true;
    return generate(DUMMY_TYPEDEF, `templates/store/storeHelper.ts.hbs`, opts);
};
export const generateAdmin = (typeDef, typeDefPackage, opts, adminHelperPath, sessionStoreImport, localeMessages, utilsImportPath) => {
    adminHelperPath || (adminHelperPath = `~/utils/model/adminHelper`);
    sessionStoreImport || (sessionStoreImport = `~/stores/sessionStore`);
    localeMessages || (localeMessages = "localeMessages");
    opts || (opts = {});
    opts.prepareContext = (typeDef, ctx) => {
        return ctx;
    };
    opts.rootOnly = true;
    return generate(typeDef, `templates/component/admin.vue.hbs`, opts, {
        typeDefPackage,
        adminHelperPath,
        sessionStoreImport,
        localeMessages,
        utilsImportPath,
    });
};
export const generateAdminHelper = (opts) => {
    opts || (opts = {});
    opts.prepareContext = (typeDef, ctx) => {
        return ctx;
    };
    return generate(DUMMY_TYPEDEF, `templates/component/adminHelper.ts.hbs`, opts);
};
