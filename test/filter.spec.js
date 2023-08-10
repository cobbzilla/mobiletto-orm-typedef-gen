import { describe, it } from "mocha";
import { expect } from "chai";
import { generateErrorFilter, generateSessionFilter, STANDARD_AUTOGEN_FILE_DISCLAIMER } from "../lib/esm/index.js";

describe("Nuxt server filter builder test", async () => {
    it("builds an error filter", async () => {
        const errorFilter = generateErrorFilter("mobiletto-orm-typedef-gen");
        // todo: more thorough validation that the output is correct
        expect(errorFilter.startsWith("// " + STANDARD_AUTOGEN_FILE_DISCLAIMER + "\n\nimport")).is.true;
    });
    it("builds a session filter", async () => {
        const sessionFilter = generateSessionFilter("mobiletto-orm-typedef-gen");
        // todo: more thorough validation that the output is correct
        expect(sessionFilter.startsWith("// " + STANDARD_AUTOGEN_FILE_DISCLAIMER + "\n\nimport")).is.true;
    });
});
