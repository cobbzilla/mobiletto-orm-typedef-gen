import { MobilettoOrmTypeDef, MobilettoOrmTypeDefConfig } from "mobiletto-orm-typedef";
export declare const STANDARD_AUTOGEN_FILE_DISCLAIMER = "DO NOT EDIT THIS FILE. AUTO-GENERATED BY mobiletto-orm-typedef-gen";
export type TypeDeclaration = {
    name: string;
    fields: Record<string, unknown>;
    root?: boolean;
};
export type GenerateOptions = {
    outfile?: string;
    header?: string;
    typescript?: boolean;
    name?: string;
    disclaimer?: string;
    prepareContext?: (typeDef: MobilettoOrmTypeDef, ctx: Record<string, unknown>) => Record<string, unknown>;
};
export declare const generate: (typeDef: MobilettoOrmTypeDef | MobilettoOrmTypeDefConfig, templatePath: string, opts?: GenerateOptions) => string;
