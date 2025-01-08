import { ReferenceObject } from "openapi3-ts/oas31";

export const RequestBodyRef = (names: TemplateStringsArray) => {
  if (names.length !== 1) {
    throw new Error("Too many template strings");
  }
  return <ReferenceObject>{
    $ref: `#/components/requestBodies/${names[0]}`,
  };
};
export const ResponseRef = (
  names: TemplateStringsArray,
  { summary, description }: { summary?: string; description?: string } = {}
) => {
  return <ReferenceObject>{
    $ref: `#/components/responses/${names[0]}`,
    summary,
    description,
  };
};
export const SchemaRef = (names: TemplateStringsArray) => {
  if (names.length !== 1) {
    throw new Error("Too many template strings");
  }
  return <ReferenceObject>{
    $ref: `#/components/schemas/${names[0]}`,
  };
};
export const ParameterRef = (names: TemplateStringsArray) => {
  if (names.length !== 1) {
    throw new Error("Too many template strings");
  }
  return <ReferenceObject>{
    $ref: `#/components/parameters/${names[0]}`,
  };
};
