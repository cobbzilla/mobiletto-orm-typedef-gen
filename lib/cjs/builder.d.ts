import { MobilettoOrmTypeDef, MobilettoOrmTypeDefConfig } from "mobiletto-orm-typedef";
export type BuildTypeOptions = {
    outfile?: string;
    typeName?: string;
};
export declare const buildType: (typeDef: MobilettoOrmTypeDef | MobilettoOrmTypeDefConfig, opts?: BuildTypeOptions) => string;
