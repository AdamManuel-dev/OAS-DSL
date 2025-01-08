import { MediaTypeObject, ResponseObject } from "openapi3-ts/oas31";
import { builder } from "./baseOpenAPI";
import { RequestBodyRef, ResponseRef, SchemaRef } from "./referenceBuilder";
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

console.log(builder.getSpecAsYaml());
