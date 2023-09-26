// Component that is the container for the Tax Form and Display Response
import { useState } from 'react'
import TaxForm from '@/components/TaxForm/TaxForm';
import TaxContext from '@/context/taxContext';
import DisplayResponse from '@/components/DisplayResponse/DisplayResponse';
import { TaxContextType, TaxContextValues } from '@/types';
import { TAX_YEARS } from '@/utils/constants';
import './TaxCalculator.scss';

function TaxCalculator() {
  const taxContextDefault = {
    year: TAX_YEARS[TAX_YEARS.length - 1],
    isError: false,
    errorMessage: '',
    taxDueAmount: '',
    showTax: false,
    isLoading: false
  };

  const updateTaxContextValues = (newValues: TaxContextValues) => {
    setTaxContextValues(() => ({
      values: newValues,
      updateTaxContextValues
    }))
  }

  const [taxContextValues, setTaxContextValues] = useState<TaxContextType>({
    values: taxContextDefault,
    updateTaxContextValues
  });

  return (
    <div className="tax-calculator">
      <h1>Points - Tax Calculator</h1>
      <TaxContext.Provider value={taxContextValues}>
        <TaxForm />
        <DisplayResponse />
      </TaxContext.Provider>
    </div>
  )
}

export default TaxCalculator
