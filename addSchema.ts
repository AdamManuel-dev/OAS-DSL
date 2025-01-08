import { resolve } from "path";
import * as TJS from "typescript-json-schema";
import { builder } from "./baseOpenAPI";
import { ReferenceObject, SchemaObject } from "openapi3-ts/oas31";

const jsonSchemaToOpenApi = (schema: TJS.Definition) => ({
  type: schema.type,
  properties: schema.properties as {
    [propertyName: string]: ReferenceObject | SchemaObject;
  },
  required: schema.required,
});

export const addSchema = (name: string, path: any) => {
  const program = TJS.getProgramFromFiles(
    [resolve(path)],
    {
      strictNullChecks: true,
    } as TJS.CompilerOptions,
    "./"
  );

  const Schema = TJS.generateSchema(program, name);

  if (!Schema) {
    throw new Error(`Failed to generate ${name} schema from ${path}`);
  }

  builder.addSchema(name, jsonSchemaToOpenApi(Schema));
};

export const addRequestBody = (name: string, path: any, newName?: string) => {
  const program = TJS.getProgramFromFiles(
    [resolve(path)],
    {
      strictNullChecks: true,
    } as TJS.CompilerOptions,
    "./"
  );

  const Schema = TJS.generateSchema(program, name);

  if (!Schema) {
    throw new Error(`Failed to generate ${name} schema from ${path}`);
  }

  builder.addRequestBody(newName ?? name, {
    content: {
      "application/json": {
        schema: jsonSchemaToOpenApi(Schema),
      },
    },
    description: "Create a new pet",
  });
};
