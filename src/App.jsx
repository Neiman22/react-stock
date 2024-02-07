import { Layout } from 'antd';
import { AppHeader } from './components/layout/AppHeader';
import { AppSider } from './components/layout/AppSider';
import { AppContent } from './components/layout/AppContent';
import { StockContextProvider } from './context/stock-context';

export default function App() {
  return (
    <StockContextProvider>
      <Layout>
        <AppHeader />
        <Layout>
          <AppSider />
          <AppContent />
        </Layout>
      </Layout>
    </StockContextProvider>
  )
}
