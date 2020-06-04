const axios = require("axios");

const getFees = async () => {
  const baseUrl = "http://private-38e18c-uzduotis.apiary-mock.com/config";
  const cashInApiUrl = `${baseUrl}/cash-in`;
  const cashOutNaturalApiUrl = `${baseUrl}/cash-out/natural`;
  const cashOutLegalApiUrl = `${baseUrl}/cash-out/juridical`;

  try {
    const { data: feesCashIn } = await axios.get(cashInApiUrl);
    const { data: feesCashOutNatural } = await axios.get(cashOutNaturalApiUrl);
    const { data: feesCashOutLegal } = await axios.get(cashOutLegalApiUrl);

    return { feesCashIn, feesCashOutNatural, feesCashOutLegal };
  } catch (error) {
    console.error(error);
  }
};

module.exports = getFees;
