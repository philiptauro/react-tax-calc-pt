import { calculateTaxByIncomeAndBrackets } from "@/utils/calculateTax";

describe('calculateTax Function', () => {
    const taxBracket_2022 = {
        "tax_brackets": [
            {
                "max": 50197,
                "min": 0,
                "rate": 0.15
            },
            {
                "max": 100392,
                "min": 50197,
                "rate": 0.205
            },
            {
                "max": 155625,
                "min": 100392,
                "rate": 0.26
            },
            {
                "max": 221708,
                "min": 155625,
                "rate": 0.29
            },
            {
                "min": 221708,
                "rate": 0.33
            }
        ]
    }
    const incomeAndTax = [
        [0, 0],
        [50000, 7500],
        [100000, 17739.17],
        [1234567, 385587.65],
    ];
    it.each(incomeAndTax)('when the income is %d returns tax as %d', (income, taxAmount) => {
        expect(calculateTaxByIncomeAndBrackets(income, taxBracket_2022.tax_brackets).toFixed(2)).toBe(taxAmount);
    })

});