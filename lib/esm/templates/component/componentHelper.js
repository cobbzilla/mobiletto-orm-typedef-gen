import { errMatch, errMatchStart, normalizeMsg, fieldErrorMessage } from "hokey-runtime";
export const typeDefFieldErrorMessage = (field, messages, labelPrefixes, clientErrors, serverErrors, submitted, objPath) => {
    if (submitted === false) {
        return "";
    }
    const fields = Array.isArray(field) ? field : [field];
    const fieldName = fields[0];
    for (const f of fields) {
        const clientErrFields = Object.keys(clientErrors);
        const serverErrFields = Object.keys(serverErrors);
        let errMsg = clientErrFields.find(errMatch(f));
        if (errMsg) {
            errMsg = errMsg + "_" + clientErrors[errMsg][0];
        }
        else {
            errMsg = serverErrFields.find(errMatch(f)) || undefined;
            if (errMsg) {
                errMsg = errMsg + "_" + serverErrors[errMsg][0];
            }
        }
        if (!errMsg && objPath && objPath.length > 0) {
            errMsg = clientErrFields.find(errMatchStart(objPath));
            if (errMsg) {
                errMsg = errMsg + "_" + clientErrors[errMsg][0];
            }
            else {
                errMsg = serverErrFields.find(errMatchStart(objPath));
                if (errMsg) {
                    errMsg = errMsg + "_" + serverErrors[errMsg][0];
                }
            }
        }
        if (errMsg) {
            errMsg = normalizeMsg(errMsg);
            const labelPfx = labelPrefixes.includes("") ? labelPrefixes : [...labelPrefixes, ""];
            const fld = normalizeMsg(fieldName);
            return fieldErrorMessage(fld, errMsg, messages, labelPfx);
        }
    }
    return "";
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const deepUpdate = (obj, fieldPath, value) => {
    let thing = obj;
    const parts = fieldPath.split(".");
    for (let i = 0; i < parts.length - 1; i++) {
        if (typeof thing[parts[i]] === "undefined") {
            thing[parts[i]] = {};
        }
        thing = thing[parts[i]];
    }
    thing[parts[parts.length - 1]] = value;
};
