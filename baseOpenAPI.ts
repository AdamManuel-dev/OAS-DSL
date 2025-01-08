import { OpenApiBuilder } from "openapi3-ts/oas31";
import packageJson from "./package.json";

export const builder = new OpenApiBuilder().addOpenApiVersion("3.1.0").addInfo({
  title: "My API",
  version: packageJson.version,
  description: "API for managing products",
  contact: {
    email: "contact@example.com",
    name: "API Support",
    url: "https://example.com/support",
  },
  license: {
    name: "Apache 2.0",
    url: "https://www.apache.org/licenses/LICENSE-2.0.html",
  },
  termsOfService: "https://example.com/terms",
});
