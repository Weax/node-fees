//get using native node functionality
const httpRequest = require("../lib/httpRequest");

const getFees = async () => {
  const baseUrl = "http://private-38e18c-uzduotis.apiary-mock.com/config";
  const cashInApiUrl = `${baseUrl}/cash-in`;
  const cashOutNaturalApiUrl = `${baseUrl}/cash-out/natural`;
  const cashOutLegalApiUrl = `${baseUrl}/cash-out/juridical`;

  try {
    const { body: feesCashIn } = await httpRequest("get", cashInApiUrl);
    const { body: feesCashOutNatural } = await httpRequest(
      "get",
      cashOutNaturalApiUrl
    );
    const { body: feesCashOutLegal } = await httpRequest(
      "get",
      cashOutLegalApiUrl
    );

    return { feesCashIn, feesCashOutNatural, feesCashOutLegal };
  } catch (error) {
    console.error(error);
  }
};

module.exports = getFees;
