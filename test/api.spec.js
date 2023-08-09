import { describe, it } from "mocha";
import { expect } from "chai";
import { MobilettoOrmTypeDef, rand } from "mobiletto-orm-typedef";
import { generateApi, STANDARD_AUTOGEN_FILE_DISCLAIMER } from "../lib/esm/index.js";

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

describe("Nuxt server API builder test", async () => {
    it("builds a simple Nuxt server API", async () => {
        const builtApi = generateApi(typeDef, "mobiletto-orm-typedef-gen");
        expect(builtApi.find).eq(
            "/* eslint-disable camelcase,@typescript-eslint/no-unused-vars */\n" +
                "// " +
                STANDARD_AUTOGEN_FILE_DISCLAIMER +
                "\n" +
                "\n" +
                'import { H3Event } from "h3";\n' +
                "\n" +
                "export default defineEventHandler(async (event: H3Event) => {\n" +
                `  return await filterErrors(event, "${typeDef.typeName}.lookup", async (event: H3Event) => {\n` +
                `    return await requireAdminAccountObject(event, "${typeDef.typeName}.lookup", async (event: H3Event, session, account) => {\n` +
                `      const ${typeDef.typeName}Repo = ${typeDef.typeName}Repository();\n` +
                "      const id =event?.context?.params?.id;\n" +
                `      if (!id) throw notFound(${typeDef.typeName}Repo.typeDef.idFieldName());\n` +
                `      const ${typeDef.typeName}_by_id = await ${typeDef.typeName}Repo.safeFindById(id);\n` +
                `      if (${typeDef.typeName}_by_id) return ${typeDef.typeName}_by_id;\n` +
                "      throw notFound(id);\n" +
                "    });\n" +
                "  });\n" +
                "});\n",
        );
    });
});
