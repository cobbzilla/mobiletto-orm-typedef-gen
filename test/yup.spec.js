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
                '\nimport * as yup from "yup";\n' +
                `export const ${typeDef.typeName}Schema = yup.object({\n` +
                "    value: yup.number()\n" +
                "        .typeError('value_invalid')\n" +
                "        .notRequired(),\n" +
                "    int: yup.number()\n" +
                "        .max(500, 'int_maxValue')\n" +
                "        .typeError('int_invalid')\n" +
                "        .required('int_required'),\n" +
                "    flag: yup.boolean()\n" +
                "        .typeError('flag_invalid')\n" +
                "        .notRequired()\n" +
                "        .default(true),\n" +
                "});\n",
        );
    });
    it("builds a yup validation schema for a complex type", async () => {
        const typeDef = new MobilettoOrmTypeDef({
            typeName: "ComplexBuilder",
            fields: {
                primary: { primary: true, default: "someDefault", max: 25, min: 2, regex: /[A-Z]{2,}/g },
                intEnumeratedValues: {
                    values: [1, 2, 3],
                    when: (v) => v.primary !== "chooseInts",
                },
                stringEnumeratedItems: {
                    items: [{ value: "one" }, { value: "two" }, { value: "three" }],
                    when: (v) => v.primary !== "chooseStrings" || v.nested.favoriteLetters.contains("a"),
                },
                intEnumeratedItems: {
                    required: true,
                    items: [
                        { label: "one", value: 1 },
                        { label: "two", value: 2 },
                        { label: "three", value: 3 },
                    ],
                },
                nested: {
                    when: (v) => v.primary !== "someDefault",
                    fields: {
                        value: { type: "string" },
                        nested: {
                            required: true,
                            fields: {
                                inner: { default: 0, minValue: -1, maxValue: 1 },
                            },
                        },
                        favoriteLetters: {
                            control: "multi",
                            default: ["a", "b", "c"],
                            values: ["a", "b", "c", "x", "y", "z"],
                            when: (v) => v.value === "word_nerd",
                        },
                    },
                },
            },
        });
        const builtTypes = generateYup(typeDef);
        expect(builtTypes).eq(
            "// " +
                STANDARD_AUTOGEN_FILE_DISCLAIMER +
                '\nimport * as yup from "yup";\n' +
                "export const ComplexBuilder_nested_nestedSchema = yup.object({\n" +
                "    inner: yup.number()\n" +
                "        .min(-1, 'ComplexBuilder_nested_nested_inner_minValue')\n" +
                "        .max(1, 'ComplexBuilder_nested_nested_inner_maxValue')\n" +
                "        .typeError('ComplexBuilder_nested_nested_inner_invalid')\n" +
                "        .notRequired(),\n" +
                "});\n" +
                "\n" +
                "export const ComplexBuilder_nestedSchema = yup.object({\n" +
                "    value: yup.string()\n" +
                "        .typeError('ComplexBuilder_nested_value_invalid')\n" +
                "        .notRequired(),\n" +
                "    nested: ComplexBuilder_nested_nestedSchema\n" +
                "        .required('ComplexBuilder_nested_nested_required'),\n" +
                "    favoriteLetters: yup.array().of(yup.string()\n" +
                '            .oneOf(["a","b","c","x","y","z"], \'ComplexBuilder_nested_favoriteLetters_enum\')\n' +
                "            .typeError('ComplexBuilder_nested_favoriteLetters_invalid'))\n" +
                "        .typeError('ComplexBuilder_nested_favoriteLetters_invalid')\n" +
                "        .notRequired()\n" +
                '        .default(["a","b","c"])\n' +
                '        .when(["value"], {\n' +
                "            is: (value) => {\n" +
                '                const w = (v) => v.value === "word_nerd";\n' +
                "                const v = { value };\n" +
                "                return w(v);\n" +
                "            },\n" +
                "            then: (schema) => schema.required('ComplexBuilder_nested_favoriteLetters_required'),\n" +
                "            otherwise: (schema) => schema.notRequired(),\n" +
                "        }),\n" +
                "});\n" +
                "\n" +
                "export const ComplexBuilderSchema = yup.object({\n" +
                "    primary: yup.string()\n" +
                "        .min(2, 'primary_min')\n" +
                "        .max(25, 'primary_max')\n" +
                "        .matches(/[A-Z]{2,}/g, 'primary_regex')\n" +
                "        .typeError('primary_invalid')\n" +
                "        .required('primary_required')\n" +
                '        .default("someDefault"),\n' +
                "    intEnumeratedValues: yup.number()\n" +
                "        .oneOf([1,2,3], 'intEnumeratedValues_enum')\n" +
                "        .typeError('intEnumeratedValues_invalid')\n" +
                "        .notRequired()\n" +
                '        .when(["primary"], {\n' +
                "            is: (primary) => {\n" +
                '                const w = (v) => v.primary !== "chooseInts";\n' +
                "                const v = { primary };\n" +
                "                return w(v);\n" +
                "            },\n" +
                "            then: (schema) => schema.required('intEnumeratedValues_required'),\n" +
                "            otherwise: (schema) => schema.notRequired(),\n" +
                "        }),\n" +
                "    stringEnumeratedItems: yup.string()\n" +
                '        .oneOf(["one","two","three"], \'stringEnumeratedItems_enum\')\n' +
                "        .typeError('stringEnumeratedItems_invalid')\n" +
                "        .notRequired()\n" +
                '        .when(["primary","nested"], {\n' +
                "            is: (primary,nested) => {\n" +
                '                const w = (v) => v.primary !== "chooseStrings" || v.nested.favoriteLetters.contains("a");\n' +
                "                const v = { primary,nested };\n" +
                "                return w(v);\n" +
                "            },\n" +
                "            then: (schema) => schema.required('stringEnumeratedItems_required'),\n" +
                "            otherwise: (schema) => schema.notRequired(),\n" +
                "        }),\n" +
                "    intEnumeratedItems: yup.number()\n" +
                "        .oneOf([1,2,3], 'intEnumeratedItems_enum')\n" +
                "        .typeError('intEnumeratedItems_invalid')\n" +
                "        .required('intEnumeratedItems_required'),\n" +
                "    nested: ComplexBuilder_nestedSchema\n" +
                "        .notRequired()\n" +
                '        .when(["primary"], {\n' +
                "            is: (primary) => {\n" +
                '                const w = (v) => v.primary !== "someDefault";\n' +
                "                const v = { primary };\n" +
                "                return w(v);\n" +
                "            },\n" +
                "            then: (schema) => schema.required('nested_required'),\n" +
                "            otherwise: (schema) => schema.notRequired(),\n" +
                "        }),\n" +
                "});\n",
        );
    });
});
