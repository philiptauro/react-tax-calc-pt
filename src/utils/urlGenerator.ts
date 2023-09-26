import { API_BASE_URL, TAX_YEARS } from "./constants";

// Returns the Base URL for the application's APIs
export const generateBaseURL = () => {
    return API_BASE_URL;
}

// Returns the CalculateTaxByYear URL
export const getCalculateTaxByYearUrl = (year: typeof TAX_YEARS[number]) => {
    return `${generateBaseURL()}tax-calculator/tax-year/${year}`
}