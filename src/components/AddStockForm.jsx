import { useState } from "react"
import { Select, Space, Typography } from "antd";
import { useStock } from "../context/stock-context";

export const AddStockForm = () => {
  const [stock, setStock] = useState(null);
  const { stocks } = useStock();

  if(!stock) {
    return (
      <Select
      style={{width: '100%'}}
      onSelect={(v) => setStock(stocks.find(s => s[0] === v))}
      placeholder="Select stock"
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
    )
  }
  return (
    <Typography.Title level={2} style={{ margin: 0 }}>{stock[0]}</Typography.Title>
  )
}