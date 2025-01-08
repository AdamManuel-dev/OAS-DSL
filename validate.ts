import { ResponseObject, SchemaObject } from "openapi3-ts/oas31";
import { builder } from "./baseOpenAPI";

// Error if any defined schema is missing an example
Object.entries(builder.rootDoc.components?.schemas || {}).forEach(
  ([name, responses]) => {
    if ((responses as any)?.type) {
      if (!(responses as SchemaObject)?.example) {
        throw new Error(`Missing description for response ${name}`);
      }
    }
  }
);

console.log("Extra Schema Validation Passed!");
