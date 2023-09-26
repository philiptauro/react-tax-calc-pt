import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import TaxForm from '@/components/TaxForm/TaxForm';
import TaxContext from '@/context/taxContext';
import '@testing-library/jest-dom'
import { TaxBracket } from '@/types';
import { TAX_YEARS } from '@/utils/constants';

const taxContextDefault = {
  values: {
    year: TAX_YEARS[TAX_YEARS.length - 1],
    isError: false,
    errorMessage: '',
    taxDueAmount: '',
    showTax: false,
    isLoading: false
  },
  updateTaxContextValues: jest.fn(),
}

interface FetchTaxBrackets {
  tax_brackets: TaxBracket[];
}
const taxBrackets: FetchTaxBrackets = { "tax_brackets": [{ "max": 48535, "min": 0, "rate": 0.15 }, { "max": 97069, "min": 48535, "rate": 0.205 }, { "max": 150473, "min": 97069, "rate": 0.26 }, { "max": 214368, "min": 150473, "rate": 0.29 }, { "min": 214368, "rate": 0.33 }] }

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve(taxBrackets),
  }),
) as jest.Mock;

const setup = () => {
  const utils = render(<TaxContext.Provider value={taxContextDefault}><TaxForm /></TaxContext.Provider>);
  const inputIncome = screen.getByLabelText('income');
  const inputYear = screen.getByLabelText('year');
  return {
    inputIncome,
    inputYear,
    ...utils,
  }
}

describe('TaxForm component', () => {
  it('renders the form', () => {
    setup();
    expect(screen.getByTestId('tax-form-testid')).toBeTruthy();
  })
  it('has the field - Income and Year that accepts only numbers', () => {
    const { inputIncome } = setup();
    const incomeField = (inputIncome as HTMLSelectElement);
    expect(screen.getByLabelText('Income')).toBeTruthy();
    fireEvent.change(inputIncome, { target: { value: '48000' } });
    expect(incomeField.value).toBe('48000');
    fireEvent.change(inputIncome, { target: { value: 'abcd' } });
    expect(incomeField.value).toBe('');
  })
  it('has the field - Year that accepts only numbers in options', () => {
    const { inputYear } = setup();
    const yearField = (inputYear as HTMLSelectElement);
    expect(screen.getByLabelText('Year')).toBeTruthy();
    fireEvent.change(inputYear, { target: { value: '2022' } });
    expect(yearField.value).toBe('2022');
    fireEvent.change(inputYear, { target: { value: '1900' } });
    expect(yearField.value).toBe((yearField.options[0].value));
  })
  it('has the button with text Calculate and inputs allow number', async () => {
    const { inputIncome, inputYear } = setup();
    const taxFromButton = screen.getByTestId("tax-form-button-testid");
    await waitFor(() => {
      expect(taxFromButton).toBeTruthy();
      expect(taxFromButton).toHaveTextContent('Calculate');
      fireEvent.change(inputIncome, { target: { value: '48000' } });
      fireEvent.change(inputYear, { target: { value: '2022' } });
      fireEvent.click(taxFromButton)
      expect(taxContextDefault.updateTaxContextValues).toHaveBeenCalled();
    });
  })
});
