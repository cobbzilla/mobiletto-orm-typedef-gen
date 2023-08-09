import { MobilettoOrmTypeDef, MobilettoOrmTypeDefConfig } from "mobiletto-orm-typedef";
import { generate, GenerateOptions, findTypeDefPackage } from "../generate.js";

export const generateService = (
    typeDef: MobilettoOrmTypeDef | MobilettoOrmTypeDefConfig,
    typeDefPackage?: string,
    utilsPath?: string,
    opts?: GenerateOptions,
): string => {
    typeDefPackage ||= findTypeDefPackage();
    utilsPath ||= `~/utils`;
    opts ||= {};
    opts.prepareContext = (typeDef: MobilettoOrmTypeDef, ctx: Record<string, unknown>): Record<string, unknown> => {
        return ctx;
    };
    return generate(typeDef, `templates/service/${typeDef.singleton ? "singletonS" : "s"}ervice.ts.hbs`, opts, {
        typeDefPackage,
        utilsPath,
    });
};

export const generateServiceHelper = (
    typeDef: MobilettoOrmTypeDef | MobilettoOrmTypeDefConfig,
    sessionHeader?: string,
    sessionHeaderImport?: string,
    sessionCookie?: string,
    sessionCookieImport?: string,
    opts?: GenerateOptions,
): string => {
    sessionHeader ||= "SESSION_HEADER";
    sessionHeaderImport ||= "~/utils/auth";
    sessionCookie ||= "sessionCookie";
    sessionCookieImport ||= "~/utils/auth";
    opts ||= {};
    opts.prepareContext = (typeDef: MobilettoOrmTypeDef, ctx: Record<string, unknown>): Record<string, unknown> => {
        return ctx;
    };
    return generate(typeDef, "templates/service/serviceHelper.ts.hbs", opts, {
        sessionHeader,
        sessionHeaderImport,
        sessionCookie,
        sessionCookieImport,
    });
};

export const generateStore = (
    typeDef: MobilettoOrmTypeDef | MobilettoOrmTypeDefConfig,
    typeDefPackage: string,
    servicesImportPath: string,
    storeImportPath: string,
    sessionHeader: string,
    sessionHeaderImport: string,
    sessionCookie: string,
    sessionCookieImport: string,
    opts?: GenerateOptions,
): string => {
    opts ||= {};
    opts.prepareContext = (typeDef: MobilettoOrmTypeDef, ctx: Record<string, unknown>): Record<string, unknown> => {
        return ctx;
    };
    return generate(typeDef, `templates/service/${typeDef.singleton ? "singletonS" : "s"}ervice.ts.hbs`, opts, {
        typeDefPackage,
        servicesImportPath,
        storeImportPath,
        sessionHeader,
        sessionHeaderImport,
        sessionCookie,
        sessionCookieImport,
    });
};

export const generateAdmin = (
    typeDef: MobilettoOrmTypeDef | MobilettoOrmTypeDefConfig,
    typeDefPackage: string,
    componentHelperPath: string, // ~/components/model/${typeDef.typeName}/admin
    sessionStoreImport: string, // ~/stores/session
    localeMessages: string, // localeMessages
    opts?: GenerateOptions,
): string => {
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
