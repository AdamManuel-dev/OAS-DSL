import { OpenApiBuilder } from "openapi3-ts/oas31";
import packageJson from "./package.json";

const builder = new OpenApiBuilder()
  .addOpenApiVersion("3.1.0")
  .addInfo({
    title: "My API",
    description: "API for managing products",
    version: packageJson.version,
  })
  .addExternalDocs({
    url: "https://example.com/docs",
    description: "Example documentation",
  })
  .addContact(packageJson.author);

builder
  .addLicense({
    name: "Apache 2.0",
    url: "https://www.apache.org/licenses/LICENSE-2.0.html",
  })
  .addTermsOfService("https://example.com/terms");

builder
  .addServer({
    url: "https://api.example.com",
    description: "Production server",
  })
  .addServer({
    url: "https://stg-api.example.com",
    description: "Staging server",
  })
  .addServer({
    url: "https://dev-api.example.com",
    description: "Development server",
  });

export { builder };
