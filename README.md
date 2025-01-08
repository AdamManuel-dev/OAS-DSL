Certainly! I'll create a README.md file that explains how this project demonstrates building OpenAPI specifications through separated definitions across the codebase. Here's the content for the README:

**File: /Users/adammanuel/Projects/OpenApiDSL/README.md**
```markdown
# OpenAPI DSL (Domain-Specific Language)

This project demonstrates an approach to building OpenAPI specifications through separated definitions across the codebase. It provides a flexible and maintainable way to define API schemas, endpoints, and other OpenAPI components using TypeScript.

## Overview

The OpenAPI DSL allows you to:

1. Define your API structure in a modular way
2. Generate OpenAPI schemas from TypeScript interfaces
3. Separate concerns by defining different parts of your API in different files
4. Easily maintain and update your API specification as your project evolves

## How it Works

The project uses several key components to build the OpenAPI specification:

1. `baseOpenAPI.ts`: Initializes the OpenAPI builder with basic information.
2. `addSchema.ts`: Provides functions to add schemas and request bodies to the OpenAPI specification.
3. Individual definition files (e.g., `addPet.ts`): Define specific parts of your API.

### Example: Adding a Pet Schema and Request Body

Here's an example of how to add a Pet schema and its corresponding request body:

```typescript
import { addSchema, addRequestBody } from "./addSchema";

addSchema("Pet", "./types/Pet.ts");
addRequestBody("Pet", "./types/Pet.ts", "CreatePet");
```

This code:
1. Adds the "Pet" schema to the OpenAPI specification, generated from the `Pet` interface in `./types/Pet.ts`.
2. Adds a request body named "CreatePet" based on the same "Pet" schema.

## Benefits

- **Modularity**: Each part of your API can be defined in separate files, making it easier to manage large APIs.
- **Type Safety**: By using TypeScript interfaces, you ensure type consistency between your API definition and implementation.
- **Maintainability**: Changes to your API can be made in isolated files, reducing the risk of unintended side effects.
- **Readability**: The DSL approach makes it easy to understand the structure of your API at a glance.

## Getting Started

1. Clone this repository
2. Install dependencies: `npm install` or `yarn install`
3. Define your TypeScript interfaces in the `types` directory
4. Create definition files (like `addPet.ts`) to add schemas and endpoints
5. Run your generate npm script to generate the final OpenAPI specification
