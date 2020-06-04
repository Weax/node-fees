const { getFilePathFromArgv, readFileAsync, removeTrailingCommaJson: jsonFix, roundResult } = require("./lib/utils");
const getFees = require("./common/getFeesFromApi");
const calculate = require("./common/processOperation");

(async () => {
  try {
    //read input.json
    const data = await readFileAsync(getFilePathFromArgv());
    const dataJson = JSON.parse(jsonFix(data));

    //get Commission Fees from API
    const fees = await getFees();

    //process input data
    dataJson.forEach((obj) => {
      let commission = calculate(obj, fees);
      commission = roundResult(commission);

      //print result formatted as currency
      console.log(commission.toFixed(2));
    });
  } catch (error) {
    console.error(error);
  }
})();
