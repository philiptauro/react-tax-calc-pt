// component to display the Tax Info.
import { useContext } from 'react'
import TaxContext from '@/context/taxContext';
import './DisplayResponse.scss';

function DisplayResponse() {
  const taxContext = useContext(TaxContext);

  return (
    <div className="display-response" data-testid="display-response-testid">
      {!!taxContext.values.isLoading && 'Calculating!'}
      {!taxContext.values.isError && !taxContext.values.isLoading && !taxContext.values.showTax && 'Enter your income and year to calculate the tax due.'}
      {!taxContext.values.isError && !taxContext.values.isLoading && !!taxContext.values.showTax && `The Tax amount due for the year ${taxContext.values.year} is ${taxContext.values.taxDueAmount}.`}
      {!!taxContext.values.isError && taxContext.values.errorMessage}
    </div>
  )
}

export default DisplayResponse
