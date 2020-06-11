const { readFileAsync, getFilePathFromArgv, roundResult } = require("./utils");
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

  it("throws console error when file not found", async () => {
    const stdOut = jest.spyOn(console, 'error').mockImplementation();

    const filePath = "./testFile2";    
    await readFileAsync(filePath);
    expect(stdOut).toHaveBeenCalledTimes(1);

    stdOut.mockRestore();
  });
});

describe("getFilePathFromArgv", () => {
  it("should get correct input file path from app arguments", () => {
    process.argv = ['node', 'app.js', '/files/1/2/input.json'];
    const filePath = getFilePathFromArgv();

    expect(filePath).toEqual('/files/1/2/input.json');
  });

  it("should throw an error to console when no file is provided and then exit", () => {
    const stdOut = jest.spyOn(console, 'error').mockImplementation();
    const exit = jest.spyOn(process, 'exit').mockImplementation();

    process.argv = ['node', 'app.js'];
    getFilePathFromArgv();

    expect(stdOut).toHaveBeenCalledTimes(1);
    expect(exit).toHaveBeenCalledWith(1);

    stdOut.mockRestore();
    exit.mockRestore();
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