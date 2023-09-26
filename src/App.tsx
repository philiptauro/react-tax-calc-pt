import TaxCalculator from '@/components/TaxCalculator/TaxCalculator';
import ErrorBoundary from '@/components/ErrorBoundary/ErrorBoundary';

function App() {
  return (
    <ErrorBoundary>
      <TaxCalculator />
    </ErrorBoundary>
  )
}

export default App
