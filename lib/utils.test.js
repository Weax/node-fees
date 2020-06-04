const { removeTrailingCommaJson, readFileAsync, getFilePathFromArgv, roundResult } = require("./utils");
const mock = require("mock-fs");

beforeAll(function () {
  mock({
    testFile: "test",
  });
});
afterAll(mock.restore);

describe("readFileAsync", () => {
  it("reads the file contents", async () => {
    const filePath = "./testFile";
    const data = await readFileAsync(filePath);

    expect(data).toEqual("test");
  });
});

describe("removeTrailingCommaJson", () => {
  it("should remove trailing comma in Json arrays", () => {
    const input = '[{"currency": "EUR"},]';

    expect(removeTrailingCommaJson(input)).toBe('[{"currency": "EUR"}]');
  });
});

describe("getFilePathFromArgv", () => {
  it("should get correct input file path from app arguments", () => {
    process.argv = ['node', 'app.js', '/files/1/2/input.json'];
    const filePath = getFilePathFromArgv();

    expect(filePath).toEqual('/files/1/2/input.json');
  });
});

describe("roundResult", () => {
  it("should ceil to cents (up)", () => {
    expect(roundResult(11.019)).toBe(11.02);
    expect(roundResult(11.011)).toBe(11.02);
    expect(roundResult(11.00001)).toBe(11.01);
    expect(roundResult(11.9)).toBe(11.9);
  });
});