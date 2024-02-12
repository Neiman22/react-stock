import { Layout, Spin } from 'antd';
import { AppHeader } from './AppHeader';
import { AppSider } from './AppSider';
import { AppContent } from './AppContent';
import { useContext } from 'react';
import StockContext from '../../context/stock-context';

export const AppLayout = () => {
  const {loading} = useContext(StockContext);

  if (loading) {
    return <Spin fullscreen />
  }

  return (
      <Layout>
        <AppHeader />
        <Layout>
          <AppSider />
          <AppContent />
        </Layout>
      </Layout>
  )
}