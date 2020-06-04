const calculate = require("./processOperation");

const mockFees = () => {
  const feesCashIn = {
    percents: 0.03,
    max: {
      amount: 5,
      currency: "EUR",
    },
  };

  const feesCashOutNatural = {
    percents: 0.3,
    week_limit: {
      amount: 1000,
      currency: "EUR",
    },
  };

  const feesCashOutLegal = {
    percents: 0.3,
    min: {
      amount: 0.5,
      currency: "EUR",
    },
  };

  return { feesCashIn, feesCashOutNatural, feesCashOutLegal };
};

const mockCashIn1 = {
  date: "2016-01-05",
  user_id: 1,
  user_type: "natural",
  type: "cash_in",
  operation: { amount: 200.0, currency: "EUR" },
};
const mockCashIn2 = {
  date: "2016-01-05",
  user_id: 1,
  user_type: "natural",
  type: "cash_in",
  operation: { amount: 20000000.0, currency: "EUR" },
};
const mockCashoutJuridical1 = {
  date: "2016-01-06",
  user_id: 2,
  user_type: "juridical",
  type: "cash_out",
  operation: { amount: 300.0, currency: "EUR" },
};
const mockCashoutJuridical2 = {
  date: "2016-01-06",
  user_id: 2,
  user_type: "juridical",
  type: "cash_out",
  operation: { amount: 3.0, currency: "EUR" },
};
const mockCashOutNatural1 = {
  date: "2016-01-07",
  user_id: 1,
  user_type: "natural",
  type: "cash_out",
  operation: { amount: 100.0, currency: "EUR" },
};
const mockCashOutNatural2 = {
  date: "2016-01-07",
  user_id: 1,
  user_type: "natural",
  type: "cash_out",
  operation: { amount: 1000.0, currency: "EUR" },
};
const mockCashOutNatural3 = {
  date: "2016-01-07",
  user_id: 2,
  user_type: "natural",
  type: "cash_out",
  operation: { amount: 30000.0, currency: "EUR" },
};
const mockCashOutNatural4 = {
  date: "2016-01-07",
  user_id: 2,
  user_type: "natural",
  type: "cash_out",
  operation: { amount: 1000.0, currency: "EUR" },
};
const mockCashOutNatural5 = {
  date: "2016-01-07",
  user_id: 1,
  user_type: "natural",
  type: "cash_out",
  operation: { amount: 1.0, currency: "EUR" },
};

describe("processOperation", () => {
  describe("Cash In", () => {
    it("calculates fee (0.03% of 200)", () => {
      const res = calculate(mockCashIn1, mockFees());
      expect(res).toBe(0.06);
    });

    it("calculates fee limiting to max value of 5", () => {
      const res = calculate(mockCashIn2, mockFees());
      expect(res).toBe(5);
    });
  });

  describe("Cash Out", () => {
    describe("juridical", () => {
      it("calculates fee (0.3% of 300)", () => {
        const res = calculate(mockCashoutJuridical1, mockFees());
        expect(res).toBe(0.9);
      });

      it("calculates fee with min value of 0.5", () => {
        const res = calculate(mockCashoutJuridical2, mockFees());
        expect(res).toBe(0.5);
      });
    });

    describe("natural", () => {
      describe("user1", () => {
        it("calculates fee of first 100 eur accrding to free week limit of 1000", () => {
          const res = calculate(mockCashOutNatural1, mockFees());
          expect(res).toBe(0);
        });

        it("calculates fee of second same week 1000 cash out (0.3% of (1100 - 1000))", () => {
          const res = calculate(mockCashOutNatural2, mockFees());
          expect(res).toBe(0.3);
        });

        it("calculates fee of another same week 1 cash out (0.3% of 1)", () => {
          const res = calculate(mockCashOutNatural5, mockFees());
          expect(res).toBe(0.003);
        });
      });
      describe("user2", () => {
        it("calculates fee of first 30000 cash out (0.3% of (30000 - 1000))", () => {
          const res = calculate(mockCashOutNatural3, mockFees());
          expect(res).toBe(87);
        });

        it("calculates fee of second same week 1000 cash out (0.3% of 1000)", () => {
          const res = calculate(mockCashOutNatural4, mockFees());
          expect(res).toBe(3);
        });
      });
    });
  });
});
