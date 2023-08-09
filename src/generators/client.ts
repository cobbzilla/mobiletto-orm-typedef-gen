import { MobilettoOrmTypeDef, MobilettoOrmTypeDefConfig } from "mobiletto-orm-typedef";
import { generate, GenerateOptions, findTypeDefPackage } from "../generate.js";

export const generateService = (
    typeDef: MobilettoOrmTypeDef | MobilettoOrmTypeDefConfig,
    typeDefPackage?: string,
    utilsPath?: string,
    opts?: GenerateOptions,
): string => {
    typeDefPackage ||= findTypeDefPackage();
    utilsPath ||= `~/utils/model`;
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
    utilsImportPath: string,
    opts?: GenerateOptions,
): string => {
    typeDefPackage ||= findTypeDefPackage();
    servicesImportPath ||= "~/utils/services/model";
    utilsImportPath ||= "~/utils/model";
    opts ||= {};
    opts.prepareContext = (typeDef: MobilettoOrmTypeDef, ctx: Record<string, unknown>): Record<string, unknown> => {
        return ctx;
    };
    return generate(typeDef, `templates/store/${typeDef.singleton ? "singletonS" : "s"}tore.ts.hbs`, opts, {
        typeDefPackage,
        servicesImportPath,
        utilsImportPath,
    });
};

export const generateStoreHelper = (typeDef: MobilettoOrmTypeDef | MobilettoOrmTypeDefConfig): string => {
    const opts: GenerateOptions = {};
    opts.prepareContext = (typeDef: MobilettoOrmTypeDef, ctx: Record<string, unknown>): Record<string, unknown> => {
        return ctx;
    };
    return generate(typeDef, `templates/store/storeHelper.ts.hbs`, opts);
};

export const generateAdmin = (
    typeDef: MobilettoOrmTypeDef | MobilettoOrmTypeDefConfig,
    typeDefPackage?: string,
    componentHelperPath?: string,
    sessionStoreImport?: string,
    localeMessages?: string,
    opts?: GenerateOptions,
): string => {
    typeDefPackage ||= findTypeDefPackage();
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

export const generateAdminHelper = (typeDef: MobilettoOrmTypeDef | MobilettoOrmTypeDefConfig): string => {
    const opts: GenerateOptions = {};
    opts.prepareContext = (typeDef: MobilettoOrmTypeDef, ctx: Record<string, unknown>): Record<string, unknown> => {
        return ctx;
    };
    return generate(typeDef, `templates/component/adminHelper.ts.hbs`, opts);
};
