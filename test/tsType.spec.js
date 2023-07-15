import { describe, it } from "mocha";
import { expect } from "chai";
import { MobilettoOrmTypeDef, rand } from "mobiletto-orm-typedef";
import { generateTypeScriptType, STANDARD_AUTOGEN_FILE_DISCLAIMER } from "../lib/esm/index.js";

describe("type builder test", async () => {
    it("builds a simple type", async () => {
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
        const builtType = generateTypeScriptType(typeDef);
        expect(builtType).eq(
            "// " +
                STANDARD_AUTOGEN_FILE_DISCLAIMER +
                "\n" +
                'import { MobilettoOrmObject } from "mobiletto-orm-typedef";\n' +
                `export type ${typeDef.typeName}Type = MobilettoOrmObject & {\n` +
                "    value?: number;\n" +
                "    int: number;\n" +
                "    flag?: boolean;\n" +
                "};\n",
        );
    });
    it("builds a complex type", async () => {
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
        const builtTypes = generateTypeScriptType(typeDef);
        expect(builtTypes).eq(
            "// " +
                STANDARD_AUTOGEN_FILE_DISCLAIMER +
                "\n" +
                'import { MobilettoOrmObject } from "mobiletto-orm-typedef";\n' +
                "export type ComplexBuilder_nested_nestedType = {\n" +
                "    inner?: number;\n" +
                "};\n" +
                "export type ComplexBuilder_nestedType = {\n" +
                "    value?: string;\n" +
                "    nested: ComplexBuilder_nested_nestedType;\n" +
                "};\n" +
                "export type ComplexBuilderType = MobilettoOrmObject & {\n" +
                "    primary: string;\n" +
                "    nested?: ComplexBuilder_nestedType;\n" +
                "};\n",
        );
    });
});
