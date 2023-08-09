import { MobilettoOrmValidationErrors } from "mobiletto-orm-typedef";
export declare const typeDefFieldErrorMessage: (field: string | string[], messages: Record<string, string>, labelPrefixes: string[], clientErrors: MobilettoOrmValidationErrors, serverErrors: MobilettoOrmValidationErrors, submitted?: boolean, objPath?: string) => string;
export declare const deepUpdate: (obj: any, fieldPath: string, value: any) => void;
