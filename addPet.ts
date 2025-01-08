import { addSchema, addRequestBody } from "./interfaceToJsonSchema";

addSchema("Pet", "./types/Pet.ts");
addRequestBody("Pet", "./types/Pet.ts", "CreatePet");
