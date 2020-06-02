const mock = require("mock-fs");
const input = require("./input");

beforeEach(function () {
  mock({
    testFile: "a\nb",
  });
});
afterEach(mock.restore);

describe("readFileByLine function", () => {
  it("calls the passed function as many times as lines in file", async () => {
    const filePath = "./testFile";
    const callback = jest.fn();

    await input.readFileByLine(filePath, callback);

    expect(callback).toHaveBeenCalledTimes(2);
  });
});
