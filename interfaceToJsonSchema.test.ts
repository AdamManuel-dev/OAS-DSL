import { jsonSchemaToOpenApi, addSchema, addRequestBody } from "./interfaceToJsonSchema";
import { builder } from "./baseOpenAPI";
import * as TJS from "typescript-json-schema";

describe("interfaceToJsonSchema", () => {
  describe("jsonSchemaToOpenApi", () => {
    it("should convert JSON schema to OpenAPI schema format", () => {
      const jsonSchema: TJS.Definition = {
        type: "object",
        properties: {
          name: { type: "string" },
          age: { type: "number" },
        },
        required: ["name"],
      };

      const result = jsonSchemaToOpenApi(jsonSchema);

      expect(result).toEqual({
        type: "object",
        properties: {
          name: { type: "string" },
          age: { type: "number" },
        },
        required: ["name"],
      });
    });

    it("should handle empty properties", () => {
      const jsonSchema: TJS.Definition = {
        type: "object",
        properties: {},
        required: [],
      };

      const result = jsonSchemaToOpenApi(jsonSchema);

      expect(result).toEqual({
        type: "object",
        properties: {},
        required: [],
      });
    });
  });

  describe("addSchema", () => {
    beforeEach(() => {
      // Reset the builder schemas before each test
      if (builder.rootDoc.components?.schemas) {
        builder.rootDoc.components.schemas = {};
      }
    });

    it("should add a schema from a TypeScript file", () => {
      addSchema("Pet", "./types/Pet.ts");

      const schemas = builder.rootDoc.components?.schemas;
      expect(schemas).toBeDefined();
      expect(schemas?.Pet).toBeDefined();
      expect((schemas?.Pet as any)?.type).toBe("object");
      expect((schemas?.Pet as any)?.properties).toBeDefined();
      expect((schemas?.Pet as any)?.properties?.name).toBeDefined();
    });

    it("should add Dog schema with correct properties", () => {
      addSchema("Dog", "./types/Dog.ts");

      const schemas = builder.rootDoc.components?.schemas;
      expect(schemas?.Dog).toBeDefined();
      expect((schemas?.Dog as any)?.properties?.size).toBeDefined();
      expect((schemas?.Dog as any)?.properties?.breed).toBeDefined();
    });

    it("should throw error for non-existent type", () => {
      expect(() => {
        addSchema("NonExistentType", "./types/Pet.ts");
      }).toThrow("type NonExistentType not found");
    });

    it("should throw error for non-existent file", () => {
      expect(() => {
        addSchema("Pet", "./types/NonExistent.ts");
      }).toThrow();
    });
  });

  describe("addRequestBody", () => {
    beforeEach(() => {
      // Reset the builder request bodies before each test
      if (builder.rootDoc.components?.requestBodies) {
        builder.rootDoc.components.requestBodies = {};
      }
    });

    it("should add a request body with correct structure", () => {
      addRequestBody("Pet", "CreatePet", "Create a new pet", "./types/Pet.ts");

      const requestBodies = builder.rootDoc.components?.requestBodies;
      expect(requestBodies).toBeDefined();
      expect(requestBodies?.CreatePet).toBeDefined();

      const createPetBody = requestBodies?.CreatePet as any;
      expect(createPetBody?.description).toBe("Create a new pet");
      expect(createPetBody?.content).toBeDefined();
      expect(createPetBody?.content["application/json"]).toBeDefined();
      expect(createPetBody?.content["application/json"]?.schema).toBeDefined();
    });

    it("should use custom description", () => {
      addRequestBody("Dog", "CreateDog", "Create a new dog", "./types/Dog.ts");

      const requestBodies = builder.rootDoc.components?.requestBodies;
      const createDogBody = requestBodies?.CreateDog as any;
      expect(createDogBody?.description).toBe("Create a new dog");
    });

    it("should throw error for non-existent type", () => {
      expect(() => {
        addRequestBody(
          "NonExistentType",
          "CreateSomething",
          "Create something",
          "./types/Pet.ts"
        );
      }).toThrow("type NonExistentType not found");
    });
  });
});
