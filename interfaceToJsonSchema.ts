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
  example: (schema as any).example,
  description: schema.description,
});

/**
 * Add a schemma to the OpenAPI specification
 */
export const addSchema = (name: string, ...paths: string[]) => {
  const program = TJS.getProgramFromFiles(
    paths.map((_) => resolve(_)),
    basicTsConfig
  );

  const Schema = TJS.generateSchema(program, name);

  if (!Schema) {
    throw new Error(
      `Failed to generate ${name} schema from ${paths.join("|")}`
    );
  }

  builder.addSchema(name, jsonSchemaToOpenApi(Schema));
};

/**
 * Add a request body schema to the OpenAPI specification
 * @param typeName - The TypeScript type/interface name to generate the schema from
 * @param requestBodyName - The name to use in the OpenAPI components/requestBodies section
 * @param description - Description for the request body
 * @param paths - File paths containing the TypeScript type definition
 */
export const addRequestBody = (
  typeName: string,
  requestBodyName: string,
  description: string,
  ...paths: string[]
) => {
  const program = TJS.getProgramFromFiles(
    paths.map((_) => resolve(_)),
    basicTsConfig
  );

  const Schema = TJS.generateSchema(program, typeName);

  if (!Schema) {
    throw new Error(
      `Failed to generate ${typeName} schema from ${paths.join("|")}`
    );
  }

  builder.addRequestBody(requestBodyName, {
    content: {
      "application/json": {
        schema: jsonSchemaToOpenApi(Schema),
      },
    },
    description,
  });
};
