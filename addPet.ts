import { addSchema, addRequestBody } from "./interfaceToJsonSchema";

addSchema("Pet", "./types/Pet.ts");
addRequestBody("Pet", "CreatePet", "Create a new pet", "./types/Pet.ts");
