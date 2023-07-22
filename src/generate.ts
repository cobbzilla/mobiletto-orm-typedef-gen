import {
    MobilettoOrmError,
    MobilettoOrmFieldDefConfigs,
    MobilettoOrmTypeDef,
    MobilettoOrmTypeDefConfig,
    MobilettoOrmValidationError,
    ValidationErrors,
} from "mobiletto-orm-typedef";
import * as fs from "fs";

import Handlebars from "handlebars";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

export const STANDARD_AUTOGEN_FILE_DISCLAIMER = "DO NOT EDIT THIS FILE. AUTO-GENERATED BY mobiletto-orm-typedef-gen";

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
    mobilettoOrmObjectPackage?: string;
};

const findDecls = (name: string, fields: MobilettoOrmFieldDefConfigs) => {
    return _findDecls(name, fields, []);
};
const _findDecls = (name: string, fields: MobilettoOrmFieldDefConfigs, decls: TypeDeclaration[]) => {
    for (const fieldName of Object.keys(fields)) {
        const field = fields[fieldName];
        if (field.type === "object" && field.fields) {
            const subName = name + "_" + field.name;
            const subFields = field.fields;
            decls.unshift({ name: subName, fields: subFields });
            _findDecls(subName, subFields, decls);
        }
    }
    return decls;
};

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

const onlyUnique = <T>(value: T, index: number, array: T[]) => array.indexOf(value) === index;

const defaultPrepareContext = (typeDef: MobilettoOrmTypeDef, ctx: Record<string, unknown>): Record<string, unknown> => {
    const fieldNames: string[] = ctx.fieldNames as string[];
    for (const fieldName of fieldNames) {
        /* eslint-disable @typescript-eslint/no-explicit-any */
        const field = (ctx.fields as Record<string, any>)[fieldName];
        /* eslint-enable @typescript-eslint/no-explicit-any */
        field.optional = !field.required || field.when;
        field.typeIsBoolean = field.type === "boolean";
        field.typeIsString = field.type === "string";
        field.typeIsNumber = field.type === "number";
        field.typeIsArray = field.type === "array";
        field.typeIsObject = field.type === "object";
        if (field.typeIsArray) {
            field.valueType =
                field.values && Array.isArray(field.values) && field.values.length > 0
                    ? typeof field.values[0]
                    : field.items &&
                      Array.isArray(field.items) &&
                      field.items.length > 0 &&
                      typeof field.items[0] === "object" &&
                      field.items[0].value
                    ? typeof field.items[0].value
                    : null;
            if (field.valueType == null) {
                const errors: ValidationErrors = {};
                errors[field.name] = ["indeterminateArrayValueType"];
                throw new MobilettoOrmValidationError(errors);
            }
            field.arrayIndent = "    ";
        }
        if (field.default) {
            field.defaultValue = JSON.stringify(field.default);
        }
        if (field.regex) {
            field.regexValue = field.regex.toString();
        }
        if (field.values && Array.isArray(field.values) && field.values.length > 0) {
            field.isEnum = true;
            field.enumValues = JSON.stringify(field.values);
        } else if (field.items && Array.isArray(field.items) && field.items.length > 0 && field.items[0].value) {
            field.isEnum = true;
            field.enumValues = JSON.stringify(field.items.map((i: { value: string }) => i.value));
        }
        if (field.when) {
            field.hasWhen = true;
            field.whenCode = field.when.toString();
            if (ctx.typescript) {
                field.whenCode = field.whenCode.replace(
                    /\(([a-z_]+)\)/i,
                    (a: string, b: string) => `(${b}: Record<string, unknown>)`,
                );
            }
            field.whenFieldNames =
                field.whenFields ||
                (Array.from(field.whenCode.matchAll(/v\.([A-Za-z\d_.\s+]+)/g)) as string[][])
                    .map((matches): string | null => (matches && matches.length > 1 ? matches[1] : null))
                    .filter((x) => x != null)
                    .map((f) => f?.replace(/\s+/, ""))
                    .map((f) => (f?.includes(".") ? f.substring(0, f.indexOf(".")) : f))
                    .filter(onlyUnique);
            field.whenFieldNamesQuoted = field.whenFieldNames
                .filter((f: string) => f !== fieldName)
                .map((f: string) => JSON.stringify(f));
            field.whenFieldSignature = field.whenFieldNames
                .map((f: string) => {
                    const fld = (ctx.fields as MobilettoOrmFieldDefConfigs)[f];
                    return f + (fld.required ? "" : "?") + ": " + fld.type;
                })
                .join(", ");
        }
        if (field.test && field.test.message && field.test.valid) {
            field.testCode = field.test.valid.toString();
        }
        field.Name = capitalize(field.name);
        field.fullName = (ctx.name !== typeDef.typeName ? ctx.name + "_" : "") + field.name;
    }

    ctx.fieldNamesArray = JSON.stringify(fieldNames);
    ctx.fieldParamsArray = fieldNames.join(",");
    ctx.typeName = typeDef.typeName;
    ctx.curlyOpen = "{";
    ctx.curlyClose = "}";
    return ctx;
};

export const generate = (
    typeDef: MobilettoOrmTypeDef | MobilettoOrmTypeDefConfig,
    templatePath: string,
    opts?: GenerateOptions,
): string => {
    if (!(typeDef instanceof MobilettoOrmTypeDef)) {
        typeDef = new MobilettoOrmTypeDef(typeDef);
    }
    const typescript = !opts || opts.typescript !== false;
    const mobilettoOrmObjectPackage = opts?.mobilettoOrmObjectPackage || "mobiletto-orm-typedef";
    const disclaimer = opts?.disclaimer ? opts.disclaimer : STANDARD_AUTOGEN_FILE_DISCLAIMER;
    const name = opts?.name ? opts.name : typeDef.typeName;
    const decls = [...findDecls(name, typeDef.fields), { name, fields: typeDef.fields, root: true }];
    let allData = "";
    let first = true;
    while (decls.length > 0) {
        const decl = decls.pop();
        if (!decl) break;
        const typeContext = defaultPrepareContext(typeDef, {
            typeDef,
            name: decl.name,
            Name: capitalize(decl.name),
            fields: decl.fields,
            fieldNames: Object.keys(decl.fields),
            disclaimer: decls.length > 0 ? null : disclaimer,
            header: decls.length > 0 ? null : opts?.header,
            first,
            root: decl.root || false,
            typescript,
            mobilettoOrmObjectPackage,
        });
        const preparedContext = opts?.prepareContext ? opts.prepareContext(typeDef, typeContext) : typeContext;
        first = false;
        typeContext.ctx = typeContext;
        // sanity, scrub templatePath; we should only every read template files
        const lastSlash = templatePath.lastIndexOf("/");
        if (lastSlash === -1 || lastSlash === templatePath.length - 1) {
            throw new MobilettoOrmError(`invalid template path: ${templatePath}`);
        }
        const endPath =
            templatePath.substring(0, lastSlash).replace(/[^A-Z0-9_./-]/gi, "") + templatePath.substring(lastSlash);
        if (endPath !== templatePath) {
            throw new MobilettoOrmError(`invalid template path: ${templatePath}`);
        }
        if (!templatePath.endsWith(".ts.hbs")) {
            throw new MobilettoOrmError(`invalid template path: ${templatePath}`);
        }

        const localTemplate = __dirname + "/" + templatePath;
        let template;
        try {
            template = fs.readFileSync(localTemplate).toString("utf8");
        } catch (e) {
            try {
                template = fs.readFileSync(templatePath).toString("utf8");
            } catch (e2) {
                throw new MobilettoOrmError(`template path not found: ${templatePath}`);
            }
        }
        const data = Handlebars.compile(template)(preparedContext);
        allData = data + allData;
    }
    if (opts?.outfile) {
        const outDir = dirname(opts.outfile);
        if (!fs.existsSync(outDir)) {
            fs.mkdirSync(outDir, { recursive: true });
        }
        fs.writeFileSync(opts.outfile, allData);
    }
    return allData;
};
