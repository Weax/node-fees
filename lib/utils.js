const fs = require("fs").promises;

exports.removeTrailingCommaJson = (input) => {
  return input.replace(/(.*?),\s*(\}|])/g, "$1$2");
};

exports.roundResult = (d) => {
  return Math.ceil(d*100)/100;
};

exports.readFileAsync = async (filePath) => {
  try {
    const data = await fs.readFile(filePath, "utf8");
    return data;
  } catch (error) {
    console.error(error);
  }
};

//get simple argv without unnecessary packages
exports.getFilePathFromArgv = () => {
  const args = process.argv.slice(2);
  const filePath = args[0];
  if (!filePath) {
    console.error("Please provide a path to the input file.");
    process.exit(1);
  } else {
    return filePath;
  }
};