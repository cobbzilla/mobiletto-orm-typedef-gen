import { describe, it } from "mocha";
import { expect } from "chai";
import { MobilettoOrmTypeDef, rand } from "mobiletto-orm-typedef";
import { generateService, generateServiceHelper, STANDARD_AUTOGEN_FILE_DISCLAIMER } from "../lib/esm/index.js";

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

describe("API client service builder test", async () => {
    it("builds a simple API client service", async () => {
        const builtService = generateService(typeDef, "mobiletto-orm-typedef-gen");
        expect(builtService).eq(
            "// " +
                STANDARD_AUTOGEN_FILE_DISCLAIMER +
                "\n" +
                "\n" +
                'import { type Ref } from "vue";\n' +
                "import type {\n" +
                "  MobilettoOrmObject,\n" +
                "  MobilettoOrmPurgeResults,\n" +
                "  MobilettoOrmValidationErrors,\n" +
                '} from "mobiletto-orm-typedef";\n' +
                `import { type ${typeDef.typeName}Type, ${typeDef.typeName}TypeDef } from "mobiletto-orm-typedef-gen";\n` +
                'import * as a from "~/utils/model/serviceHelper.js";\n' +
                'import type { MobilettoOrmFindApiOpts } from "~/utils/model/storeHelper.js";\n' +
                "\n" +
                `export const ${typeDef.typeName}Service = {\n` +
                `  search${typeDef.typeName},\n` +
                `  find${typeDef.typeName},\n` +
                `  create${typeDef.typeName},\n` +
                `  update${typeDef.typeName},\n` +
                `  delete${typeDef.typeName},\n` +
                "};\n" +
                "\n" +
                `function search${typeDef.typeName}(\n` +
                "  query?: MobilettoOrmFindApiOpts,\n" +
                `): Promise<${typeDef.typeName}Type[]> {\n` +
                `  return $fetch("/api/model/${typeDef.typeName}", a.authPostJson(query)).then(\n` +
                `    a.handleJsonResponse<${typeDef.typeName}Type[]> as (response: unknown) => Promise<${typeDef.typeName}Type[]>,\n` +
                "  );\n" +
                "}\n" +
                "\n" +
                `function find${typeDef.typeName}(\n` +
                "  id: string,\n" +
                "  serverErrors: Ref<MobilettoOrmValidationErrors>,\n" +
                `): Promise<${typeDef.typeName}Type> {\n` +
                "  return $fetch(`/api/model/" +
                typeDef.typeName +
                "/${id}`, a.authGet())\n" +
                `    .then(a.handleJsonResponse<${typeDef.typeName}Type> as (response: unknown) => Promise<${typeDef.typeName}Type>)\n` +
                `    .catch(a.handleErrors(serverErrors)) as Promise<${typeDef.typeName}Type>;\n` +
                "}\n" +
                "\n" +
                `function create${typeDef.typeName}(\n` +
                `  ${typeDef.typeName}: ${typeDef.typeName}Type,\n` +
                "  serverErrors: Ref<MobilettoOrmValidationErrors>,\n" +
                `): Promise<${typeDef.typeName}Type> {\n` +
                `  const id = ${typeDef.typeName}TypeDef.id(${typeDef.typeName});\n` +
                "  return $fetch(`/api/model/" +
                typeDef.typeName +
                "/${id}`, a.authPutJson(" +
                typeDef.typeName +
                "))\n" +
                `    .then(a.handleJsonResponse<${typeDef.typeName}Type> as (response: unknown) => Promise<${typeDef.typeName}Type>)\n` +
                `    .catch(a.handleErrors(serverErrors)) as Promise<${typeDef.typeName}Type>;\n` +
                "}\n" +
                "\n" +
                `function update${typeDef.typeName}(\n` +
                `  ${typeDef.typeName}: ${typeDef.typeName}Type,\n` +
                "  serverErrors: Ref<MobilettoOrmValidationErrors>,\n" +
                `): Promise<${typeDef.typeName}Type> {\n` +
                `  const id = ${typeDef.typeName}TypeDef.id(${typeDef.typeName});\n` +
                "  return $fetch(`/api/model/" +
                typeDef.typeName +
                "/${id}`, a.authPatchJson(" +
                typeDef.typeName +
                "))\n" +
                `    .then(a.handleJsonResponse<${typeDef.typeName}Type> as (response: unknown) => Promise<${typeDef.typeName}Type>)\n` +
                `    .catch(a.handleErrors(serverErrors)) as Promise<${typeDef.typeName}Type>;\n` +
                "}\n" +
                "\n" +
                `function delete${typeDef.typeName}(\n` +
                "  id: string,\n" +
                "  serverErrors: Ref<MobilettoOrmValidationErrors>,\n" +
                "  purge?: boolean,\n" +
                "): Promise<MobilettoOrmObject | MobilettoOrmPurgeResults> {\n" +
                "  return $fetch(\n" +
                "    `/api/model/" +
                typeDef.typeName +
                '/${id}/${purge ? `?purge=${purge}` : ""}`,\n' +
                "    a.authDelete(),\n" +
                "  )\n" +
                `    .then(a.handleJsonResponse<MobilettoOrmObject | MobilettoOrmPurgeResults> as (response: unknown) => Promise<${typeDef.typeName}Type>)\n` +
                `    .catch(a.handleErrors(serverErrors)) as Promise<${typeDef.typeName}Type>;\n` +
                "}\n",
        );
    });
    it("build the service helper", async () => {
        const builtServiceHelper = generateServiceHelper(typeDef);
        expect(builtServiceHelper).eq(
            "// " +
                STANDARD_AUTOGEN_FILE_DISCLAIMER +
                "\n" +
                "\n" +
                'import type { H3Error } from "h3";\n' +
                'import type { MobilettoOrmValidationErrors } from "mobiletto-orm-typedef";\n' +
                'import { SESSION_HEADER } from "~/utils/auth";\n' +
                'import { sessionCookie } from "~/utils/auth";\n' +
                "\n" +
                "export function authHeader() {\n" +
                "  const session = sessionCookie();\n" +
                "  if (session) {\n" +
                "    const headers: Record<string, string> = {};\n" +
                "    headers[SESSION_HEADER] = session.value;\n" +
                "    return headers;\n" +
                "  } else {\n" +
                "    return {};\n" +
                "  }\n" +
                "}\n" +
                "\n" +
                "export function authHead(headers = null) {\n" +
                '  return authReq("HEAD", headers);\n' +
                "}\n" +
                "export function authGet(headers = null) {\n" +
                '  return authReq("GET", headers);\n' +
                "}\n" +
                "export function authDelete(headers = null) {\n" +
                '  return authReq("DELETE", headers);\n' +
                "}\n" +
                "\n" +
                "export type OptionalHeaders = Record<string, string> | null;\n" +
                "\n" +
                'export type HttpMethodType = "GET" | "POST" | "PUT" | "PATCH" | "HEAD" | "DELETE";\n' +
                "\n" +
                "export function authReq(method: HttpMethodType, headers: OptionalHeaders = null) {\n" +
                "  return {\n" +
                "    method,\n" +
                "    headers: headers ? Object.assign({}, headers, authHeader()) : authHeader(),\n" +
                "  };\n" +
                "}\n" +
                "\n" +
                "export function authPostJson<T>(obj: T, headers: OptionalHeaders = null) {\n" +
                '  return authDataJson<T>(obj, "POST", headers);\n' +
                "}\n" +
                "export function authPutJson<T>(obj: T, headers: OptionalHeaders = null) {\n" +
                '  return authDataJson<T>(obj, "PUT", headers);\n' +
                "}\n" +
                "export function authPatchJson<T>(obj: T, headers: OptionalHeaders = null) {\n" +
                '  return authDataJson<T>(obj, "PATCH", headers);\n' +
                "}\n" +
                "\n" +
                "export function authDataJson<T>(obj: T, method: HttpMethodType, headers: OptionalHeaders = null) {\n" +
                "  return {\n" +
                "    method,\n" +
                "    headers: headers\n" +
                "      ? Object.assign({}, headers, authHeader(), {\n" +
                '          "Content-Type": "application/json",\n' +
                "        })\n" +
                "      : authHeader(),\n" +
                "    body: JSON.stringify(obj),\n" +
                "  };\n" +
                "}\n" +
                "\n" +
                "export function handleJsonResponse<T>(response: Response): Promise<T> {\n" +
                '  if (response && typeof response.text === "function") {\n' +
                "    return response.text().then((text) => {\n" +
                "      let data;\n" +
                "      try {\n" +
                '        data = typeof text === "string" ? JSON.parse(text) : null;\n' +
                "      } catch (e) {\n" +
                "        // console.log(`handleJsonResponse: error parsing: ${text}`);\n" +
                "        data = null;\n" +
                "      }\n" +
                "      if (!response.ok) {\n" +
                "        const error = data || text || response.statusText;\n" +
                "        return Promise.reject(error);\n" +
                "      }\n" +
                "      // console.log(`handleJsonResponse returning: ${JSON.stringify(data, null, 2)}`)\n" +
                "      return data;\n" +
                "    });\n" +
                "  } else {\n" +
                "    return Promise.resolve(response as T);\n" +
                "  }\n" +
                "}\n" +
                "\n" +
                "export const handleErrors = (serverErrors?: Ref<MobilettoOrmValidationErrors>) => (e: H3Error) => {\n" +
                "  if (!e.statusCode || !serverErrors) throw e;\n" +
                "  if (e.statusCode === 403) {\n" +
                '    serverErrors.value.global = ["forbidden"];\n' +
                "  } else if (e.statusCode === 404) {\n" +
                '    if (typeof e.data?.data === "string" && e.data.data.length > 0) {\n' +
                '      serverErrors.value[e.data.data] = ["notFound"];\n' +
                "    }\n" +
                "  } else if (e.statusCode === 422) {\n" +
                '    if (typeof e.data?.data === "string" && e.data.data.length > 0) {\n' +
                "      serverErrors.value = JSON.parse(e.data.data) as MobilettoOrmValidationErrors;\n" +
                "    }\n" +
                "  } else {\n" +
                "    throw e;\n" +
                "  }\n" +
                "};\n",
        );
    });
});
