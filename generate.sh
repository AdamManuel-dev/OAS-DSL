#!/bin/bash

npx ts-node ./OpenAPI.ts >FullOpenAPISpec.yaml && grep -v ': {}$' FullOpenAPISpec.yaml >OpenAPISpec.yaml && rm FullOpenAPISpec.yaml
