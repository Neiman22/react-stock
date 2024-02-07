import { Layout } from 'antd';
import { fetchStock } from '../../api';

const contentStyle = {
  textAlign: 'center',
  minHeight: 'calc(100vh - 60px)',
  color: '#fff',
  backgroundColor: '#001259',
  padding: '1rem',
};

export const AppContent = () => {
  fetchStock();

  return (
    <Layout.Content style={contentStyle}>Content</Layout.Content>
  )
}