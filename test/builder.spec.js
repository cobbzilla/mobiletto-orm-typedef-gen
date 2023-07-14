import { describe, it } from "mocha";
import { expect } from "chai";
import { MobilettoOrmTypeDef, rand } from "mobiletto-orm-typedef";
import { buildType } from "../lib/esm/index.js";

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
        const builtType = buildType(typeDef);
        expect(builtType).eq(
            `export type ${typeDef.typeName}Type = {\n` +
                "    _meta?: {\n" +
                "        id: string;\n" +
                "        version: string;\n" +
                "        removed?: boolean;\n" +
                "        ctime: number;\n" +
                "        mtime: number;\n" +
                "    };\n" +
                "    value?: number;\n" +
                "    int: number;\n" +
                "    flag?: boolean;\n" +
                "};\n"
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
        const builtTypes = buildType(typeDef);
        expect(builtTypes).eq(
            "export type ComplexBuilder_nested_nestedType = {\n" +
                "    inner?: number;\n" +
                "};\n" +
                "\n" +
                "export type ComplexBuilder_nestedType = {\n" +
                "    value?: string;\n" +
                "    nested: ComplexBuilder_nested_nestedType;\n" +
                "};\n" +
                "\n" +
                "export type ComplexBuilderType = {\n" +
                "    _meta?: {\n" +
                "        id: string;\n" +
                "        version: string;\n" +
                "        removed?: boolean;\n" +
                "        ctime: number;\n" +
                "        mtime: number;\n" +
                "    };\n" +
                "    primary: string;\n" +
                "    nested?: ComplexBuilder_nestedType;\n" +
                "};\n"
        );
    });
});
