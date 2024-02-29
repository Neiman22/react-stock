import { Layout, Typography } from 'antd';
import { useStock } from '../../context/stock-context';
import { PortfolioChart } from '../PortfolioChart';
import { AssetsTable } from '../AssetsTable';

const contentStyle = {
  textAlign: 'center',
  minHeight: 'calc(100vh - 60px)',
  color: '#fff',
  backgroundColor: '#001259',
  padding: '1rem',
};

export const AppContent = () => {
  const { assets, stocks } = useStock();

  return (
    <Layout.Content style={contentStyle}>
      <Typography.Title level={3} style={{textAlign: 'left', color:'#fff'}}>
        Portfolio: {assets.map(asset => {
          const stock = stocks.find(s => s[0] === asset.id)
          return asset.amount * stock[3];
        }).reduce((acc, v) => acc += v,0 ).toFixed(2)}₽
      </Typography.Title>
      <PortfolioChart />
      <AssetsTable />
    </Layout.Content>
  )
}