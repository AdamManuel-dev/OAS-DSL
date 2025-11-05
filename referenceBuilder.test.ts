import {
  RequestBodyRef,
  ResponseRef,
  SchemaRef,
  ParameterRef,
} from "./referenceBuilder";

describe("referenceBuilder", () => {
  describe("RequestBodyRef", () => {
    it("should create a reference object with correct $ref", () => {
      const result = RequestBodyRef`CreatePet`;
      expect(result).toEqual({
        $ref: "#/components/requestBodies/CreatePet",
      });
    });

    it("should throw error for multiple template strings", () => {
      expect(() => {
        // @ts-expect-error Testing error case
        RequestBodyRef`First${"Second"}`;
      }).toThrow("Too many template strings");
    });
  });

  describe("ResponseRef", () => {
    it("should create a reference object with correct $ref", () => {
      const result = ResponseRef`Created`;
      expect(result).toEqual({
        $ref: "#/components/responses/Created",
      });
    });

    it("should include summary when provided", () => {
      const result = ResponseRef`Created${{ summary: "Pet created" }}`;
      expect(result).toEqual({
        $ref: "#/components/responses/Created",
        summary: "Pet created",
      });
    });

    it("should include description when provided", () => {
      const result = ResponseRef`Created${{
        description: "Resource was created",
      }}`;
      expect(result).toEqual({
        $ref: "#/components/responses/Created",
        description: "Resource was created",
      });
    });

    it("should include both summary and description when provided", () => {
      const result = ResponseRef`Created${{
        summary: "Created",
        description: "Resource was created",
      }}`;
      expect(result).toEqual({
        $ref: "#/components/responses/Created",
        summary: "Created",
        description: "Resource was created",
      });
    });
  });

  describe("SchemaRef", () => {
    it("should create a reference object with correct $ref", () => {
      const result = SchemaRef`Pet`;
      expect(result).toEqual({
        $ref: "#/components/schemas/Pet",
      });
    });

    it("should throw error for multiple template strings", () => {
      expect(() => {
        // @ts-expect-error Testing error case
        SchemaRef`First${"Second"}`;
      }).toThrow("Too many template strings");
    });
  });

  describe("ParameterRef", () => {
    it("should create a reference object with correct $ref", () => {
      const result = ParameterRef`petId`;
      expect(result).toEqual({
        $ref: "#/components/parameters/petId",
      });
    });

    it("should throw error for multiple template strings", () => {
      expect(() => {
        // @ts-expect-error Testing error case
        ParameterRef`First${"Second"}`;
      }).toThrow("Too many template strings");
    });
  });
});
