import { describe, it } from "mocha";
import { expect } from "chai";
import { MobilettoOrmTypeDef, rand } from "mobiletto-orm-typedef";
import { generateStore, generateStoreHelper, STANDARD_AUTOGEN_FILE_DISCLAIMER } from "../lib/esm/index.js";

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

describe("Pinia store builder test", async () => {
    it("builds a simple Pinia store", async () => {
        const builtStore = generateStore(typeDef, "mobiletto-orm-typedef-gen");
        expect(builtStore).eq(
            "// " +
                STANDARD_AUTOGEN_FILE_DISCLAIMER +
                "\n" +
                "\n" +
                'import { Ref } from "vue";\n' +
                'import { defineStore } from "pinia";\n' +
                'import { MobilettoOrmValidationErrors } from "mobiletto-orm";\n' +
                `import { ${typeDef.typeName}Type, ${typeDef.typeName}TypeDef } from "mobiletto-orm-typedef-gen";\n` +
                `import { ${typeDef.typeName}Service } from "~/utils/services/model/${typeDef.typeName}Service";\n` +
                'import { MobilettoOrmFindApiOpts, updateOrmList } from "~/utils/model/storeHelper.js";\n' +
                "\n" +
                `const updateList = (list: ${typeDef.typeName}Type[] | null, id: string, opts?: { object?: ${typeDef.typeName}Type; remove?: boolean }) => {\n` +
                `  return updateOrmList<${typeDef.typeName}Type>(${typeDef.typeName}TypeDef, list, id, opts);\n` +
                "};\n" +
                "\n" +
                `export const use${typeDef.typeName}Store = defineStore("${typeDef.typeName}", {\n` +
                "  state: () => ({\n" +
                "    finding: false,\n" +
                `    found: null as ${typeDef.typeName}Type | null,\n` +
                "    creating: false,\n" +
                `    created: null as ${typeDef.typeName}Type | null,\n` +
                "    updating: false,\n" +
                `    updated: null as ${typeDef.typeName}Type | null,\n` +
                "    deleting: false,\n" +
                "    deleted: null as boolean | null,\n" +
                "    searching: false,\n" +
                `    ${typeDef.typeName}List: null as ${typeDef.typeName}Type[] | null,\n` +
                "  }),\n" +
                "  getters: {\n" +
                `      ${typeDef.typeName}Busy: (state) => state.finding || state.creating || state.updating || state.deleting || state.searching,\n` +
                "  },\n" +
                "  actions: {\n" +
                `    async lookup(id: string, serverErrors: Ref<MobilettoOrmValidationErrors>): Promise<${typeDef.typeName}Type> {\n` +
                "      this.found = null;\n" +
                "      this.finding = true;\n" +
                "      try {\n" +
                `        this.found = await ${typeDef.typeName}Service.find${typeDef.typeName}(id, serverErrors);\n` +
                "        if (this.found) {\n" +
                `          updateList(this.${typeDef.typeName}List, ${typeDef.typeName}TypeDef.id(this.found), {object: this.found});\n` +
                "        }\n" +
                "        return this.found;\n" +
                "      } finally {\n" +
                "        this.finding = false;\n" +
                "      }\n" +
                "    },\n" +
                `    async search(query?: MobilettoOrmFindApiOpts): Promise<${typeDef.typeName}Type[]> {\n` +
                "      try {\n" +
                "        this.searching = true;\n" +
                `        this.${typeDef.typeName}List = await ${typeDef.typeName}Service.search${typeDef.typeName}(query);\n` +
                `        return this.${typeDef.typeName}List || [];\n` +
                "      } finally {\n" +
                "        this.searching = false;\n" +
                "      }\n" +
                "    },\n" +
                `    async create(object: ${typeDef.typeName}Type, serverErrors: Ref<MobilettoOrmValidationErrors>): Promise<${typeDef.typeName}Type> {\n` +
                "      try {\n" +
                "        this.created = null;\n" +
                "        this.creating = true;\n" +
                `        this.created = await ${typeDef.typeName}Service.create${typeDef.typeName}(object, serverErrors);\n` +
                "        return this.created;\n" +
                "      } finally {\n" +
                "        this.creating = false;\n" +
                "      }\n" +
                "    },\n" +
                `    async update(object: ${typeDef.typeName}Type, serverErrors: Ref<MobilettoOrmValidationErrors>): Promise<${typeDef.typeName}Type> {\n` +
                "      try {\n" +
                "        this.updated = null;\n" +
                "        this.updating = true;\n" +
                `        this.updated = await ${typeDef.typeName}Service.update${typeDef.typeName}(object, serverErrors);\n` +
                "        if (this.updated) {\n" +
                `          updateList(this.${typeDef.typeName}List, ${typeDef.typeName}TypeDef.id(this.updated), {object: this.updated});\n` +
                "        }\n" +
                "        return this.updated;\n" +
                "      } finally {\n" +
                "        this.updating = false;\n" +
                "      }\n" +
                "    },\n" +
                "    async delete(id: string, serverErrors: Ref<MobilettoOrmValidationErrors>, purge?: boolean): Promise<boolean> {\n" +
                "      try {\n" +
                "        this.deleted = null;\n" +
                "        this.deleting = true;\n" +
                `        const deleteResult = await ${typeDef.typeName}Service.delete${typeDef.typeName}(id, serverErrors, !!purge);\n` +
                "        if (deleteResult) {\n" +
                `          updateList(this.${typeDef.typeName}List, id, { remove: true });\n` +
                "          this.deleted = true;\n" +
                "        } else {\n" +
                "          this.deleted = false;\n" +
                "        }\n" +
                "        return this.deleted;\n" +
                "      } finally {\n" +
                "        this.deleting = false;\n" +
                "      }\n" +
                "    },\n" +
                "  },\n" +
                "});\n",
        );
    });
    it("builds a Pinia store helper", async () => {
        const builtStoreHelper = generateStoreHelper(typeDef);
        expect(builtStoreHelper).eq(
            "// " +
                STANDARD_AUTOGEN_FILE_DISCLAIMER +
                "\n" +
                "\n" +
                'import { MobilettoOrmObject, MobilettoOrmTypeDef } from "mobiletto-orm-typedef";\n' +
                "\n" +
                "export type MobilettoOrmFindApiOpts = {\n" +
                "    field?: string;\n" +
                "    value?: string;\n" +
                "    textSearch?: string;\n" +
                "    opts?: {\n" +
                "        first?: boolean;\n" +
                "        removed?: boolean;\n" +
                "        noRedact?: boolean;\n" +
                "    };\n" +
                "};\n" +
                "\n" +
                "export const updateOrmList = <T extends MobilettoOrmObject>(\n" +
                "    typeDef: MobilettoOrmTypeDef,\n" +
                "    list: T[] | null,\n" +
                "    id: string,\n" +
                "    opts?: { object?: T; remove?: boolean },\n" +
                ") => {\n" +
                "    if (!opts) return;\n" +
                "    if (list) {\n" +
                "        const foundIndex = list.findIndex((e) => typeDef.id(e) === id);\n" +
                "        if (foundIndex && foundIndex >= 0) {\n" +
                "            if (opts && opts.remove === true) {\n" +
                "                list.splice(foundIndex, 1);\n" +
                "            } else if (opts && opts.object) {\n" +
                "                list.splice(foundIndex, 1, opts.object);\n" +
                "            }\n" +
                "        }\n" +
                "    }\n" +
                "};\n",
        );
    });
});
