import { Layout, Select, Space, Button, Modal, Drawer } from 'antd';
import { useStock } from '../../context/stock-context';
import { useEffect, useState } from 'react';
import { StockModal } from '../StockModal';
import { AddStockForm } from '../AddStockForm';

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
  const [stock, setStock] = useState(null);
  const [modal, setModal] = useState(false);
  const [drawer, setDrawer] = useState(false);
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
    setStock(stocks.find(s => s[0] === value));
    setModal(true);
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
  <Button type="primary" onClick={() => setDrawer(true)}>Add Stock</Button>

  <Modal
    open={modal} 
    onOk={() => setModal(false)} 
    onCancel={() => setModal(false)}
    footer={null}
  >
    <StockModal stock={stock}/>
  </Modal>

  <Drawer width={600} title="Add Stock" onClose={() => setDrawer(false)} open={drawer} destroyOnClose>
    <AddStockForm />
  </Drawer>

  </Layout.Header>)
}