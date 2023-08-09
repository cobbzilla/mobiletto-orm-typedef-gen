import { MobilettoOrmTypeDef, MobilettoOrmTypeDefConfig } from "mobiletto-orm-typedef";
import { GenerateOptions } from "../generate.js";
export declare const _generate: (apiTemplate: string, typeDef: MobilettoOrmTypeDef | MobilettoOrmTypeDefConfig, typeDefPackage: string, opts?: GenerateOptions) => string;
export declare const generateApiIdGet: (typeDef: MobilettoOrmTypeDef | MobilettoOrmTypeDefConfig, typeDefPackage: string, opts?: GenerateOptions) => string;
export declare const generateApiIdPut: (typeDef: MobilettoOrmTypeDef | MobilettoOrmTypeDefConfig, typeDefPackage: string, opts?: GenerateOptions) => string;
export declare const generateApiIdPatch: (typeDef: MobilettoOrmTypeDef | MobilettoOrmTypeDefConfig, typeDefPackage: string, opts?: GenerateOptions) => string;
export declare const generateApiIdDelete: (typeDef: MobilettoOrmTypeDef | MobilettoOrmTypeDefConfig, typeDefPackage: string, opts?: GenerateOptions) => string;
export declare const generateApiIndexPost: (typeDef: MobilettoOrmTypeDef | MobilettoOrmTypeDefConfig, typeDefPackage: string, opts?: GenerateOptions) => string;
export declare const generateApi: (typeDef: MobilettoOrmTypeDef | MobilettoOrmTypeDefConfig, typeDefPackage: string, opts?: GenerateOptions) => Record<string, string>;
