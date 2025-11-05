import { ResponseObject, SchemaObject } from "openapi3-ts/oas31";
import { builder } from "./baseOpenAPI";

// Warn if any defined schema is missing an example
const missingExamples: string[] = [];
Object.entries(builder.rootDoc.components?.schemas || {}).forEach(
  ([name, schema]) => {
    if ((schema as any)?.type) {
      if (!(schema as SchemaObject)?.example) {
        missingExamples.push(name);
      }
    }
  }
);

if (missingExamples.length > 0) {
  console.warn(`Warning: The following schemas are missing examples: ${missingExamples.join(", ")}`);
}

console.log("Extra Schema Validation Passed!");
