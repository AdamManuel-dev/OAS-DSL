import { MediaTypeObject, ResponseObject } from "openapi3-ts/oas31";
import { builder } from "./baseOpenAPI";
import { RequestBodyRef, ResponseRef, SchemaRef } from "./referenceBuilder";

/**
 * Automatically adds a schema to the OpenAPI specification just from importing
 * Becomes available within OpenAPIDoc by the next line after the import
 */
import "./addDog";
import "./addPet";

builder
  .addTag({ name: "pet", description: "Operations about pets" })
  .addPath("/pet", {
    get: {
      tags: ["pet"],
      summary: "Find pet by ID",
      description: "Returns a single pet",
      operationId: "getPetById",
      responses: {
        200: ResponseRef`Created${{
          summary: "Pet",
        }}`,
      },
    },
    post: {
      tags: ["pet"],
      summary: "Update pet by ID",
      description: "Updated a single pet",
      operationId: "updatePetById",
      requestBody: RequestBodyRef`CreatePet`,
      responses: {
        200: ResponseRef`Updated`,
        400: <ResponseObject>{
          description: "Invalid ID supplied",
          content: {
            "application/json": <MediaTypeObject>{
              schema: SchemaRef`Dog`,
              example: {
                size: 12,
                breed: "Labrador Retriever",
              },
            },
          },
        },
      },
    },
  })
  .addResponse("Created", {
    description: "Object created",
    summary: "Create",
  })
  .addResponse("Updated", {
    description: "Object updated",
    summary: "Update",
  })
  .addParameter("petId", {
    name: "id",
    in: "header",
    schema: {
      type: "string",
    },
  });

/**
 * Validates the OpenAPI document using additional requirements,
 * like presence of examples for each schema definition
 */
import "./validate";

/**
 * Outputs the OpenAPI document as YAML to STDOUT which is piped into FullOpenAPISpec.yaml
 */
console.log(builder.getSpecAsYaml());
