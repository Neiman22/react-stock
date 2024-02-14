import { Layout, Card, Statistic, List, Tag } from 'antd';
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import { useContext } from 'react';
import StockContext from '../../context/stock-context';

const siderStyle = {
  padding: '1rem'
};

export const AppSider = () => {
  const {assets} = useContext(StockContext);

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
            {title: 'Количество', value: asset.amount.to, units: 'шт.'},
            {title: 'Цена', value: asset.currentPrice.toLocaleString(), units: '₽'},
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