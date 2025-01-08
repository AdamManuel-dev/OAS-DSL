import { resolve } from "path";
import * as TJS from "typescript-json-schema";
import { builder } from "./baseOpenAPI";
import { ReferenceObject, SchemaObject } from "openapi3-ts/oas31";

const basicTsConfig = <TJS.CompilerOptions>{
  strictNullChecks: true,
  baseUrl: "./",
};

/**
 * Convert a TypeScript generated JSON-Schema schema implemenation/type to an OpenAPI implemenation/type
 */
export const jsonSchemaToOpenApi = (schema: TJS.Definition) => ({
  type: schema.type,
  properties: schema.properties as {
    [propertyName: string]: ReferenceObject | SchemaObject;
  },
  required: schema.required,
});

/**
 * Add a schemma to the OpenAPI specification
 */
export const addSchema = (name: string, ...paths: any) => {
  const program = TJS.getProgramFromFiles(
    paths.map((path: string) => resolve(path)),
    basicTsConfig
  );

  const Schema = TJS.generateSchema(program, name);

  if (!Schema) {
    throw new Error(`Failed to generate ${name} schema from ${path}`);
  }

  builder.addSchema(name, jsonSchemaToOpenApi(Schema));
};

/**
 * Add a request body schema to the OpenAPI specification
 * If newName is provided, it will be used as the name in the OpenAPI specification
 * If newName is not provided, it will be the same as the name in the TypeScript file
 */
export const addRequestBody = (
  name: string,
  newName?: string,
  ...paths: any
) => {
  const program = TJS.getProgramFromFiles(
    paths.map((path: string) => resolve(path)),
    basicTsConfig
  );

  const Schema = TJS.generateSchema(program, name);

  if (!Schema) {
    throw new Error(`Failed to generate ${name} schema from ${paths}`);
  }

  builder.addRequestBody(
    newName?.includes("/") || newName?.includes(".") ? newName : name,
    {
      content: {
        "application/json": {
          schema: jsonSchemaToOpenApi(Schema),
        },
      },
      description: "Create a new pet",
    }
  );
};
