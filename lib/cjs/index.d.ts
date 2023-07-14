import { MobilettoOrmError, MobilettoOrmNotFoundError, MobilettoOrmTypeDef, MobilettoOrmSyncError, MobilettoOrmValidationError } from "mobiletto-orm-typedef";
export { STANDARD_AUTOGEN_FILE_DISCLAIMER } from "./generate.js";
export { generateTypeScriptType } from "./generators/tsType.js";
export { generateYup } from "./generators/yup.js";
export * from "mobiletto-orm-typedef";
declare const _default: {
    MobilettoOrmError: typeof MobilettoOrmError;
    MobilettoOrmNotFoundError: typeof MobilettoOrmNotFoundError;
    MobilettoOrmTypeDef: typeof MobilettoOrmTypeDef;
    MobilettoOrmSyncError: typeof MobilettoOrmSyncError;
    MobilettoOrmValidationError: typeof MobilettoOrmValidationError;
    addError: (errors: import("mobiletto-orm-typedef").ValidationErrors, fieldPath: string, err: string) => void;
    fsSafeName: (name: string) => string;
    rand: (len?: number | undefined) => string;
    sha: (val: string | number | boolean) => string;
    MIN_ID_LENGTH: number;
};
export default _default;
