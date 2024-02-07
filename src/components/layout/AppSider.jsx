import { Layout, Card, Statistic, List, Spin, Tag } from 'antd';
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { fetchStock, fetchAssets } from '../../api';
import { percentDifference } from '../../utils/utils';

const siderStyle = {
  padding: '1rem'
};

export const AppSider = () => {
  const [loading, setLoading] = useState(false);
  const [stocks, setStocks]= useState([]);
  const [assets, setAssets]= useState([]);

  useEffect(() => {
    const preload = async () => {
      setLoading(true);
      const { data } = await fetchStock();
      const assets = await fetchAssets();

      setStocks(data);
      setAssets(assets.map(asset => {
        const stock = data.find(st => st[0] === asset.id);
        return {
          grow: asset.price < stock[3],
          growPercent: percentDifference(asset.price, stock[3]),
          totalAmount: asset.amount * stock[3],
          totalProfit: asset.amount * (stock[3] - asset.price),
          ...asset
        }
      }));
      setLoading(false);
    }
    preload();
  }, []);

  if (loading) {
    return <Spin fullscreen />
  }

  return (
    <Layout.Sider width="25%" style={siderStyle}>
    {assets.map(asset => (
      <Card key={asset.id} style={{ marginBottom: '1rem' }}>
        <Statistic
          title={asset.id}
          value={asset.totalProfit}
          precision={2}
          valueStyle={{ color: asset.grow ? '#3f8600' : '#cf1322' }}
          prefix={asset.grow ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
          suffix="₽"
        />
        <List
          size="small"
          dataSource={[
            {title: 'Количество', value: asset.amount.toLocaleString(), units: 'шт.'},
            {title: 'Стоимость активов', value: asset.totalAmount.toLocaleString(), units: '₽'},
            {title: asset.grow ? 'Прибыль' : 'Убыток', value: asset.growPercent, units: '%', withTag: true},
          ]}
          renderItem={(item) => (
            <List.Item>
              <span>{item.title}</span>
              <span>
                {!item.withTag && `${item.value} ${item.units}`}
                {item.withTag && <Tag color={asset.grow ? 'green' : 'red'}>{`${item.value} ${item.units}`}</Tag>
                }
              </span>
            </List.Item>
          )}
        />
      </Card>
    ))}
    </Layout.Sider>
  )
}