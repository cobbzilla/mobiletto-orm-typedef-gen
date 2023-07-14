import {
    MobilettoOrmError,
    MobilettoOrmNotFoundError,
    MobilettoOrmTypeDef,
    MobilettoOrmSyncError,
    MobilettoOrmValidationError,
    addError,
    fsSafeName,
    rand,
    sha,
    MIN_ID_LENGTH,
} from "mobiletto-orm-typedef";

export { STANDARD_AUTOGEN_FILE_DISCLAIMER } from "./generate.js";
export { generateTypeScriptType } from "./generators/tsType.js";
export { generateYup } from "./generators/yup.js";

export * from "mobiletto-orm-typedef";

export default {
    MobilettoOrmError,
    MobilettoOrmNotFoundError,
    MobilettoOrmTypeDef,
    MobilettoOrmSyncError,
    MobilettoOrmValidationError,
    addError,
    fsSafeName,
    rand,
    sha,
    MIN_ID_LENGTH,
};
