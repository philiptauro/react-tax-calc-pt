// Keeping types in a single file as they are not many
// In an ideal world, this would be split into relevant files

import { TAX_YEARS } from "@/utils/constants";

// Structure and Values that can be stored in the TaxContext's values field
export interface TaxContextValues {
    year:  typeof TAX_YEARS[number];
    isError: boolean;
    errorMessage: string;
    taxDueAmount: string;
    showTax: boolean;
    isLoading: boolean;
}

// Structure of the TaxContext
export interface TaxContextType {
    values: TaxContextValues, 
    updateTaxContextValues: (arg0: TaxContextValues) => void
}

// Structure of the TaxBracket Object
export interface TaxBracket {
    max?: number;
    min: number;
    rate: number;
}
