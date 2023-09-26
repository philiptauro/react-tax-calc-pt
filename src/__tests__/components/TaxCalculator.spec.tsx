import { render } from '@testing-library/react'
import TaxCalculator from '@/components/TaxCalculator/TaxCalculator';

describe('TaxCalculator component', () => {
    it('contains TaxForm and DisplayResponse', () => {
        const { getByTestId } = render(<TaxCalculator />);
        expect(getByTestId('tax-form-testid')).toBeTruthy();
        expect(getByTestId('display-response-testid')).toBeTruthy();
    })
});
