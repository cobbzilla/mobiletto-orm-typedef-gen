import { MobilettoOrmTypeDef, MobilettoOrmTypeDefConfig } from "mobiletto-orm-typedef";
import { GenerateOptions } from "../generate.js";
export declare const generateService: (typeDef: MobilettoOrmTypeDef | MobilettoOrmTypeDefConfig, typeDefPackage: string, opts?: GenerateOptions, utilsPath?: string) => string;
export declare const generateServiceHelper: (opts?: GenerateOptions, sessionHeader?: string, sessionHeaderImport?: string, sessionCookie?: string, sessionCookieImport?: string) => string;
export declare const generateStore: (typeDef: MobilettoOrmTypeDef | MobilettoOrmTypeDefConfig, typeDefPackage: string, opts?: GenerateOptions, servicesImportPath?: string, utilsImportPath?: string) => string;
export declare const generateStoreHelper: (opts?: GenerateOptions) => string;
export declare const generateAdmin: (typeDef: MobilettoOrmTypeDef | MobilettoOrmTypeDefConfig, typeDefPackage: string, opts?: GenerateOptions, adminHelperPath?: string, sessionStoreImport?: string, localeMessages?: string, utilsImportPath?: string) => string;
export declare const generateAdminHelper: (opts?: GenerateOptions) => string;
