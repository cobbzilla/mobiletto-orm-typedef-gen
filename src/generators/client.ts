import { MobilettoOrmTypeDef, MobilettoOrmTypeDefConfig } from "mobiletto-orm-typedef";
import { generate, GenerateOptions } from "../generate.js";

const DUMMY_TYPEDEF = new MobilettoOrmTypeDef({ typeName: "dummy", fields: {} });

export const generateService = (
    typeDef: MobilettoOrmTypeDef | MobilettoOrmTypeDefConfig,
    typeDefPackage: string,
    opts?: GenerateOptions,
    utilsPath?: string,
): string => {
    utilsPath ||= `~/utils/model`;
    opts ||= {};
    opts.prepareContext = (typeDef: MobilettoOrmTypeDef, ctx: Record<string, unknown>): Record<string, unknown> => {
        return ctx;
    };
    opts.rootOnly = true;
    return generate(typeDef, `templates/service/${typeDef.singleton ? "singletonS" : "s"}ervice.ts.hbs`, opts, {
        typeDefPackage,
        utilsPath,
    });
};

export const generateServiceHelper = (
    opts?: GenerateOptions,
    sessionHeader?: string,
    sessionHeaderImport?: string,
    sessionCookie?: string,
    sessionCookieImport?: string,
): string => {
    sessionHeader ||= "SESSION_HEADER";
    sessionHeaderImport ||= "~/utils/auth";
    sessionCookie ||= "sessionCookie";
    sessionCookieImport ||= "~/utils/auth";
    opts ||= {};
    opts.prepareContext = (typeDef: MobilettoOrmTypeDef, ctx: Record<string, unknown>): Record<string, unknown> => {
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

export const generateStore = (
    typeDef: MobilettoOrmTypeDef | MobilettoOrmTypeDefConfig,
    typeDefPackage: string,
    opts?: GenerateOptions,
    servicesImportPath?: string,
    utilsImportPath?: string,
): string => {
    servicesImportPath ||= "~/utils/services/model";
    utilsImportPath ||= "~/utils/model";
    opts ||= {};
    opts.prepareContext = (typeDef: MobilettoOrmTypeDef, ctx: Record<string, unknown>): Record<string, unknown> => {
        return ctx;
    };
    opts.rootOnly = true;
    return generate(typeDef, `templates/store/${typeDef.singleton ? "singletonS" : "s"}tore.ts.hbs`, opts, {
        typeDefPackage,
        servicesImportPath,
        utilsImportPath,
    });
};

export const generateStoreHelper = (opts?: GenerateOptions): string => {
    opts ||= {};
    opts.prepareContext = (typeDef: MobilettoOrmTypeDef, ctx: Record<string, unknown>): Record<string, unknown> => {
        return ctx;
    };
    opts.rootOnly = true;
    return generate(DUMMY_TYPEDEF, `templates/store/storeHelper.ts.hbs`, opts);
};

export const generateAdmin = (
    typeDef: MobilettoOrmTypeDef | MobilettoOrmTypeDefConfig,
    typeDefPackage: string,
    opts?: GenerateOptions,
    componentHelperPath?: string,
    sessionStoreImport?: string,
    localeMessages?: string,
): string => {
    componentHelperPath ||= `~/utils/model`;
    sessionStoreImport ||= `~/stores/session`;
    localeMessages ||= "localeMessages";
    opts ||= {};
    opts.prepareContext = (typeDef: MobilettoOrmTypeDef, ctx: Record<string, unknown>): Record<string, unknown> => {
        return ctx;
    };
    return generate(typeDef, `templates/component/admin.vue.hbs`, opts, {
        typeDefPackage,
        componentHelperPath,
        sessionStoreImport,
        localeMessages,
    });
};

export const generateAdminHelper = (opts?: GenerateOptions): string => {
    opts ||= {};
    opts.prepareContext = (typeDef: MobilettoOrmTypeDef, ctx: Record<string, unknown>): Record<string, unknown> => {
        return ctx;
    };
    return generate(DUMMY_TYPEDEF, `templates/component/adminHelper.ts.hbs`, opts);
};
