import { describe, it } from "mocha";
import { expect } from "chai";
import { MobilettoOrmTypeDef, rand } from "mobiletto-orm-typedef";
import { generateYup, STANDARD_AUTOGEN_FILE_DISCLAIMER } from "../lib/esm/index.js";

describe("yup builder test", async () => {
    it("builds a yup validation schema for a simple type", async () => {
        const typeDef = new MobilettoOrmTypeDef({
            typeName: `TestType_${rand(10)}`,
            fields: {
                value: { type: "number" },
                int: {
                    maxValue: 500,
                    primary: true,
                },
                flag: { default: true },
            },
        });
        const builtType = generateYup(typeDef);
        expect(builtType).eq(
            "// " +
                STANDARD_AUTOGEN_FILE_DISCLAIMER +
                '\nimport * as yup from "yup";' +
                `\nexport const ${typeDef.typeName}Schema = yup.object({` +
                "\n    value: yup.number()," +
                "\n    int: yup.number().required('required').max(500, 'maxValue')," +
                "\n    flag: yup.boolean()," +
                "\n});\n"
        );
    });
    it("builds a yup validation schema for a complex type", async () => {
        const typeDef = new MobilettoOrmTypeDef({
            typeName: "ComplexBuilder",
            fields: {
                primary: { primary: true },
                nested: {
                    fields: {
                        value: { type: "string" },
                        nested: {
                            required: true,
                            fields: {
                                inner: { default: 0 },
                            },
                        },
                    },
                },
            },
        });
        const builtTypes = generateYup(typeDef);
        expect(builtTypes).eq(
            "// " +
                STANDARD_AUTOGEN_FILE_DISCLAIMER +
                "\n" +
                'import * as yup from "yup";\n' +
                "export const ComplexBuilder_nested_nestedSchema = yup.object({\n" +
                "    inner: yup.number(),\n" +
                "});\n" +
                "\n" +
                "export const ComplexBuilder_nestedSchema = yup.object({\n" +
                "    value: yup.string(),\n" +
                "    nested: ComplexBuilder_nested_nestedSchema,\n" +
                "});\n" +
                "\n" +
                "export const ComplexBuilderSchema = yup.object({\n" +
                "    primary: yup.string().required('required'),\n" +
                "    nested: ComplexBuilder_nestedSchema,\n" +
                "});\n"
        );
    });
});
