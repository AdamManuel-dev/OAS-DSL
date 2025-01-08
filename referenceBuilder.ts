export const requestBodyRef = (names: TemplateStringsArray) => {
  if (names.length !== 1) {
    throw new Error("Too many template strings");
  }
  return `#/components/requestBodies/${names[0]}`;
};
export const responseRef = (names: TemplateStringsArray) => {
  if (names.length !== 1) {
    throw new Error("Too many template strings");
  }
  return `#/components/responses/${names[0]}`;
};
export const schemaRef = (names: TemplateStringsArray) => {
  if (names.length !== 1) {
    throw new Error("Too many template strings");
  }
  return `#/components/schemas/${names[0]}`;
};
export const parameterRef = (names: TemplateStringsArray) => {
  if (names.length !== 1) {
    throw new Error("Too many template strings");
  }
  return `#/components/parameters/${names[0]}`;
};
