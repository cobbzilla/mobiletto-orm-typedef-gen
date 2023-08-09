import { MobilettoOrmObject, MobilettoOrmTypeDef } from "mobiletto-orm-typedef";
export type MobilettoOrmFindApiOpts = {
    field?: string;
    value?: string;
    textSearch?: string;
    opts?: {
        first?: boolean;
        removed?: boolean;
        noRedact?: boolean;
    };
};
export declare const updateOrmList: <T extends MobilettoOrmObject>(typeDef: MobilettoOrmTypeDef, list: T[] | null, id: string, opts?: {
    object?: T | undefined;
    remove?: boolean | undefined;
} | undefined) => void;
