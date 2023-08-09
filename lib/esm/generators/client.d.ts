import { MobilettoOrmTypeDef, MobilettoOrmTypeDefConfig } from "mobiletto-orm-typedef";
import { GenerateOptions } from "../generate.js";
export declare const generateService: (typeDef: MobilettoOrmTypeDef | MobilettoOrmTypeDefConfig, typeDefPackage?: string, utilsPath?: string, opts?: GenerateOptions) => string;
export declare const generateServiceHelper: (typeDef: MobilettoOrmTypeDef | MobilettoOrmTypeDefConfig, sessionHeader?: string, sessionHeaderImport?: string, sessionCookie?: string, sessionCookieImport?: string, opts?: GenerateOptions) => string;
export declare const generateStore: (typeDef: MobilettoOrmTypeDef | MobilettoOrmTypeDefConfig, typeDefPackage: string, servicesImportPath: string, utilsImportPath: string, opts?: GenerateOptions) => string;
export declare const generateStoreHelper: (typeDef: MobilettoOrmTypeDef | MobilettoOrmTypeDefConfig) => string;
export declare const generateAdmin: (typeDef: MobilettoOrmTypeDef | MobilettoOrmTypeDefConfig, typeDefPackage?: string, componentHelperPath?: string, sessionStoreImport?: string, localeMessages?: string, opts?: GenerateOptions) => string;
export declare const generateAdminHelper: (typeDef: MobilettoOrmTypeDef | MobilettoOrmTypeDefConfig) => string;
