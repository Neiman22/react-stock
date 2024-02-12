import { StockContextProvider } from './context/stock-context';
import { AppLayout } from './components/Layout/AppLayout';

export default function App() {
  return (
    <StockContextProvider>
      <AppLayout />
    </StockContextProvider>
  )
}
