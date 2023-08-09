import { describe, it } from "mocha";
import { expect } from "chai";
import { MobilettoOrmTypeDef, rand } from "mobiletto-orm-typedef";
import { generateAdmin, generateAdminHelper, STANDARD_AUTOGEN_FILE_DISCLAIMER } from "../lib/esm/index.js";

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

describe("Vue 3 admin component builder test", async () => {
    it("builds a simple Vue 3 admin component", async () => {
        const builtAdmin = generateAdmin(typeDef, "mobiletto-orm-typedef-gen");
        expect(builtAdmin.startsWith(`<!-- ${STANDARD_AUTOGEN_FILE_DISCLAIMER} -->\n\n<template>`)).is.true;
    });
    it("builds a Vue 3 admin helper", async () => {
        const builtAdmin = generateAdminHelper(typeDef);
        expect(builtAdmin.startsWith(`// ${STANDARD_AUTOGEN_FILE_DISCLAIMER}\n\nimport `)).is.true;
    });
});
