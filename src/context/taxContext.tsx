import { TaxContextType, TaxContextValues } from '@/types'
import { createContext } from 'react'

// Tax Context that is shared by multiple components
const TaxContext = createContext<TaxContextType>({
    values: {
        year: 2022,
        isError: false,
        errorMessage: '',
        taxDueAmount: '',
        showTax: false,
        isLoading: false
    },
    updateTaxContextValues: (_arg0: TaxContextValues) => { }
})

export default TaxContext