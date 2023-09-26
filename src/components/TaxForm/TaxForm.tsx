// Component that has the Tax Form
import { FormEvent, useContext, useEffect, useState } from 'react'
import TaxContext from '@/context/taxContext';
import { TaxBracket } from '@/types';
import { getCalculateTaxByYearUrl } from '@/utils/urlGenerator';
import { TAX_YEARS } from '@/utils/constants';
import './TaxForm.scss'

function TaxForm() {
    const years = [...TAX_YEARS];
    const taxContext = useContext(TaxContext);
    const [income, setIncome] = useState('');
    const [year, setYear] = useState<number>(years[years.length - 1]);
    const [taxBrackets, setTaxBrackets] = useState<TaxBracket[]>([]);

    const calculateTax = () => {
        if (!income) {
            taxContext.updateTaxContextValues({ ...taxContext.values, showTax: false });
        }
        if (taxBrackets?.length > 0 && income && !Number.isNaN(income)) {
            const incomeVal = Number(income);
            const selectedBracket = taxBrackets.find((bracket) => {
                if (incomeVal >= bracket.min && (!bracket.max || incomeVal < bracket.max)) {
                    return bracket
                }
            });
            if (selectedBracket) {
                taxContext.updateTaxContextValues({
                    ...taxContext.values,
                    taxDueAmount: formatCurrency(selectedBracket.rate * incomeVal),
                    showTax: true
                });
            }
        }
    }

    useEffect(() => {
        calculateTax();
    }, [taxBrackets])

    const formatCurrency = (amount: Number) => {
        return Number(amount).toLocaleString('en-CA', { style: 'currency', currency: 'CAD' })
    }

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (income) {
            taxContext.updateTaxContextValues({
                ...taxContext.values,
                isError: false
            });
            handleClick();
        } else {
            taxContext.updateTaxContextValues({
                ...taxContext.values,
                isError: true,
                errorMessage: 'Income info needs to be added in!'
            });
        }
    }

    const handleClick = () => { 
        let updatedTaxContextValues = {
            ...taxContext.values,
            isError: false,
            isLoading: true,
            year: year as unknown as typeof TAX_YEARS[number]
        }
        taxContext.updateTaxContextValues({ ...updatedTaxContextValues });
        fetch(getCalculateTaxByYearUrl((year as typeof TAX_YEARS[number])))
            .then(data => data.json())
            .then(data => {
                if (data.errors) {
                    throw new Error(data.errors)
                } else {
                    setTaxBrackets(data.tax_brackets);
                }
            })
            .catch((_e) => {
                updatedTaxContextValues = {
                    ...updatedTaxContextValues,
                    isError: true,
                    errorMessage: 'Oops an error occurred!'
                };
            })
            .finally(() => {
                taxContext.updateTaxContextValues({
                    ...updatedTaxContextValues,
                    isLoading: false
                });
            })
    }

    return (
        <form className="tax-form" onSubmit={handleSubmit} data-testid="tax-form-testid">
            <div className="tax-form__field">
                <label className="tax-form__field__label" htmlFor="income">Income</label>
                <input className="tax-form__field__input" id="income" aria-label="income" value={income} type="number" min="1" max="50000000" onChange={e => setIncome(e.target.value)} />
            </div>
            <div className="tax-form__field">
                <label className="tax-form__field__label" htmlFor="year">Year</label>
                <select className="tax-form__field__input" id="year" aria-label="year" value={year} onChange={e => setYear(Number(e.target.value))}>
                    {
                        years.map(year => (<option key={year} value={year}>{year}</option>))
                    }
                </select>
            </div>
            <div className="tax-form__field">
                <button disabled={!!taxContext.values.isLoading} data-testid="tax-form-button-testid">
                    {!taxContext.values.isLoading && "Calculate"}
                    {!!taxContext.values.isLoading && "Calculating"}
                </button>
            </div>
        </form>
    )
}

export default TaxForm
