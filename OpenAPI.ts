import { builder } from "./baseOpenAPI";
import { requestBodyRef, responseRef } from "./referenceBuilder";
import "./addDog";
import "./addPet";

builder
  .addPath("/pet", {
    get: {
      tags: ["pet"],
      summary: "Find pet by ID",
      description: "Returns a single pet",
      operationId: "getPetById",
      responses: {
        200: {
          $ref: responseRef`Created`,
        },
      },
    },
    post: {
      tags: ["pet"],
      summary: "Update pet by ID",
      description: "Updated a single pet",
      operationId: "updatePetById",
      requestBody: {
        $ref: requestBodyRef`CreatePet`,
      },
      responses: {
        200: {
          $ref: responseRef`Updated`,
        },
        400: {
          $ref: responseRef`InvalidInput`,
        },
      },
    },
  })
  .addResponse("Created", {
    description: "Object created",
  })
  .addResponse("Updated", {
    description: "Object updated",
  })
  .addParameter("petId", {
    name: "id",
    in: "header",
    schema: {
      type: "string",
    },
  });

console.log(builder.getSpecAsYaml());
