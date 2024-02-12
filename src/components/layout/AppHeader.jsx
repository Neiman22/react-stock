import { Layout, Select, Space, Button } from 'antd';
import { useStock } from '../../context/stock-context';
import { useEffect, useState } from 'react';

const headerStyle = {
  width: '100%',
  textAlign: 'center',
  height: 60,
  padding: '1rem',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
};

export const AppHeader = () => {
  const [select, setSelect] = useState(false);
  const { stocks } = useStock();

  useEffect(() => {
    const keypress = event => {
      if (event.key === '/') {
        setSelect((prev) => !prev);
      }
    }
    document.addEventListener('keypress', keypress);
    return () => document.removeEventListener('keypress', keypress);
  }, [])

  const handleSelect = (value) => {
    console.log(value);
  }

  return (<Layout.Header style={headerStyle}>
    <Select
      style={{ width: 250 }}
      open={select}
      onSelect={handleSelect}
      onClick={() => setSelect((prev) => !prev)}
      value="press / to open"
      options={stocks.map(stock => ({
        label: stock[2],
        value: stock[0]
      }))}
      optionRender={(option) => (
        <Space style={{ display: 'flex', justifyContent: 'space-between'}}>
          <span>{option.label}</span>
          <span>{option.value}</span>
        </Space>
      )}
    />
  <Button type="primary">Add Stock</Button>
  </Layout.Header>)
}