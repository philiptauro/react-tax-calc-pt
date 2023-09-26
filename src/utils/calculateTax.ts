import { TaxBracket } from "@/types";

// Steps for calculation of tax based on marginal rate.
export const calculateTaxByIncomeAndBrackets = (incomeVal: number = 0, taxBrackets: TaxBracket[]): number => {
    if (incomeVal === 0) return 0;
    let prevMax = 0;
    let tax = 0;
    taxBrackets.forEach((bracket) => {
        if (bracket.max && incomeVal >= bracket.max) {
            tax += bracket.rate * (bracket.max - prevMax)
            // console.log("Taxable Diff = ", (bracket.max - prevMax), bracket.rate)
            prevMax = bracket.max;
        }
        else if (incomeVal >= bracket.min && (!bracket.max || incomeVal < bracket.max)) {
            tax += bracket.rate * (incomeVal - bracket.min)
            // console.log("Taxable Diff Final = ", (incomeVal - bracket.min))
        }
    });
    return tax;
}