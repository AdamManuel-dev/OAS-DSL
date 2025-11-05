import { exec } from "child_process";
import { promisify } from "util";
import * as fs from "fs";
import * as path from "path";

const execAsync = promisify(exec);

describe("OpenAPI Generation Integration Tests", () => {
  const outputFile = path.join(__dirname, "../OpenAPISpec.yaml");

  afterAll(() => {
    // Clean up generated files
    if (fs.existsSync(outputFile)) {
      fs.unlinkSync(outputFile);
    }
  });

  it("should generate valid OpenAPI spec without errors", async () => {
    const { stdout, stderr } = await execAsync("npm run generate:openapi");

    // Check that the output file was created (generation succeeded)
    expect(fs.existsSync(outputFile)).toBe(true);

    // Check that there are no error messages in stderr
    expect(stderr.toLowerCase()).not.toContain("error:");
  }, 30000);

  it("should generate spec with correct structure", async () => {
    await execAsync("npm run generate:openapi");

    const content = fs.readFileSync(outputFile, "utf-8");

    // Check for key OpenAPI elements
    expect(content).toContain("openapi: 3.1.0");
    expect(content).toContain("title: My API");
    expect(content).toContain("paths:");
    expect(content).toContain("/pet:");
    expect(content).toContain("components:");
    expect(content).toContain("schemas:");
  }, 30000);

  it("should include Pet schema", async () => {
    await execAsync("npm run generate:openapi");

    const content = fs.readFileSync(outputFile, "utf-8");

    expect(content).toContain("Pet:");
    expect(content).toContain("type: object");
  }, 30000);

  it("should include Dog schema", async () => {
    await execAsync("npm run generate:openapi");

    const content = fs.readFileSync(outputFile, "utf-8");

    expect(content).toContain("Dog:");
    expect(content).toContain("size:");
    expect(content).toContain("breed:");
  }, 30000);

  it("should include request bodies", async () => {
    await execAsync("npm run generate:openapi");

    const content = fs.readFileSync(outputFile, "utf-8");

    expect(content).toContain("requestBodies:");
    expect(content).toContain("CreatePet:");
  }, 30000);

  it("should include responses", async () => {
    await execAsync("npm run generate:openapi");

    const content = fs.readFileSync(outputFile, "utf-8");

    expect(content).toContain("responses:");
    expect(content).toContain("Created:");
    expect(content).toContain("Updated:");
  }, 30000);

  it("should include servers", async () => {
    await execAsync("npm run generate:openapi");

    const content = fs.readFileSync(outputFile, "utf-8");

    expect(content).toContain("servers:");
    expect(content).toContain("https://api.example.com");
    expect(content).toContain("Production server");
  }, 30000);

  it("should not contain empty object values", async () => {
    await execAsync("npm run generate:openapi");

    const content = fs.readFileSync(outputFile, "utf-8");

    // The grep command should have filtered these out
    expect(content).not.toContain(": {}");
  }, 30000);
});
