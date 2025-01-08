import { addSchema, addRequestBody } from "./addSchema";

addSchema("Pet", "./types/Pet.ts");
addRequestBody("Pet", "./types/Pet.ts", "CreatePet");
