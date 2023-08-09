import { MobilettoOrmTypeDef } from "mobiletto-orm-typedef";
import { generate } from "../generate.js";
const DUMMY_TYPEDEF = new MobilettoOrmTypeDef({ typeName: "dummy", fields: {} });
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
export const generateAdmin = (typeDef, typeDefPackage, opts, componentHelperPath, sessionStoreImport, localeMessages) => {
    componentHelperPath || (componentHelperPath = `~/utils/model`);
    sessionStoreImport || (sessionStoreImport = `~/stores/session`);
    localeMessages || (localeMessages = "localeMessages");
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
export const generateAdminHelper = (opts) => {
    opts || (opts = {});
    opts.prepareContext = (typeDef, ctx) => {
        return ctx;
    };
    return generate(DUMMY_TYPEDEF, `templates/component/adminHelper.ts.hbs`, opts);
};
