import { render } from '@testing-library/react'
import TaxContext from '@/context/taxContext';
import DisplayResponse from '@/components/DisplayResponse/DisplayResponse';
import { TaxContextType } from '@/types';
import { TAX_YEARS } from '@/utils/constants';

const taxContextTemplate: TaxContextType = {
    values: {
        year: TAX_YEARS[TAX_YEARS.length - 1],
        isError: false,
        errorMessage: '',
        taxDueAmount: '',
        showTax: false,
        isLoading: false
    },
    updateTaxContextValues: () => { }
}

describe('DisplayResponse component', () => {
    it('shows info message when TaxContext\'s isError and showTax are false', () => {
        const taxContextDefault = {
            ...taxContextTemplate,
            values: {
                ...taxContextTemplate.values,
                isError: false,
                showTax: false
            }
        }
        const { getByTestId } = render(
            <TaxContext.Provider value={taxContextDefault}>
                <DisplayResponse />
            </TaxContext.Provider>);
        expect(getByTestId('display-response-testid')).toMatchInlineSnapshot(`
<div
  class="display-response"
  data-testid="display-response-testid"
>
  Enter your income and year to calculate the tax due.
</div>
`);
    })

    it('shows Calculating when isLoading is true', () => {
        const taxContextWithTaxAmount = {
            ...taxContextTemplate,
            values: {
                ...taxContextTemplate.values,
                isLoading: true,
                isError: false
            }
        }
        const { getByTestId } = render(
            <TaxContext.Provider value={taxContextWithTaxAmount}>
                <DisplayResponse />
            </TaxContext.Provider>);
        expect(getByTestId('display-response-testid')).toMatchInlineSnapshot(`
<div
  class="display-response"
  data-testid="display-response-testid"
>
  Calculating!
</div>
`);
    })

    it('shows Tax Info on TaxContext\'s showTax being true and isError is false', () => {
        const taxContextWithTaxAmount = {
            ...taxContextTemplate,
            values: {
                ...taxContextTemplate.values,
                year: 2022 as unknown as typeof TAX_YEARS[number],
                taxDueAmount: '$1,000.00',
                showTax: true,
            }
        }
        const { getByTestId } = render(
            <TaxContext.Provider value={taxContextWithTaxAmount}>
                <DisplayResponse />
            </TaxContext.Provider>);
        expect(getByTestId('display-response-testid')).toMatchInlineSnapshot(`
<div
  class="display-response"
  data-testid="display-response-testid"
>
  The Tax amount due for the year 2022 is $1,000.00.
</div>
`);
    })

    it('shows errorMessage on TaxContext\'s isError is true', () => {
        const taxContextError = {
            ...taxContextTemplate,
            values: {
                ...taxContextTemplate.values,
                year: 2022 as typeof TAX_YEARS[number],
                isError: true,
                errorMessage: 'Oops, an error occured in calculation',
            }
        }
        const { getByTestId } = render(
            <TaxContext.Provider value={taxContextError}>
                <DisplayResponse />
            </TaxContext.Provider>);
        expect(getByTestId('display-response-testid')).toMatchInlineSnapshot(`
<div
  class="display-response"
  data-testid="display-response-testid"
>
  Oops, an error occured in calculation
</div>
`);
    })
});
