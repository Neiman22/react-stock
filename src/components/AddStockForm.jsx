import { useRef, useState } from "react"
import { Divider, Select, Space, Form, Button, InputNumber, DatePicker, Result } from "antd";
import { useStock } from "../context/stock-context";
import { StockInfo } from "./StockInfo";

const validateMessages = {
  required: '${label} is required!',
  types: {
    number: '${label} in not valid number',
  },
  number: {
    range: '${label} must be between ${min} and ${max}',
  },
};

export const AddStockForm = ({ onClose }) => {
  const [form] = Form.useForm();
  const { stocks, addStock } = useStock();
  const [stock, setStock] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const stockRef = useRef();

  const handleAmountChange = (value) => {
    const price = form.getFieldValue('price');
    form.setFieldsValue({
      total: +(value * price).toFixed(2)
    })
  }

  const handlePriceChange = (value) => {
    const amount = form.getFieldValue('amount');
    form.setFieldsValue({
      total: +(amount * value).toFixed(2)
    })
  }

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

  const onFinish = (values) => {
    const newStock = {
      id: stock[0],
      amount: values.amount,
      price: values.price,
      date: values.date?.$d ?? new Date(),
    }
    console.log(newStock);
    stockRef.current = newStock;
    setSubmitted(true);
    addStock(newStock);
  }

  if (submitted) {
    return (
      <Result
        status="success"
        title="New Stock Added"
        subTitle={`Added ${stockRef.current.amount} of ${stock[0]} by price ${stockRef.current.price}`}
        extra={[
          <Button type="primary" key="console" onClick={onClose}>
            Close
          </Button>,
        ]}
      />
    )
  }

  return (
    <Form
      form={form}
      name="basic"
      labelCol={{
        span: 4,
      }}
      wrapperCol={{
        span: 10,
      }}
      style={{
        maxWidth: 600,
      }}
      initialValues={{
        price: +stock[3].toFixed(2),
      }}
      onFinish={onFinish}
      validateMessages={validateMessages}
    >

    <StockInfo stock={stock} />
    <Divider />

    <Form.Item
      label="Amount"
      name="amount"
      rules={[
        {
          required: true,
          type: 'number',
          min: 0,
        },
      ]}
    >
      <InputNumber 
        placeholder='Enter stock amount...'
        onChange={handleAmountChange}
        style={{ width: '100%' }}
      />
    </Form.Item>

    <Form.Item label="Price" name="price">
      <InputNumber onChange={handlePriceChange} style={{ width: '100%' }} />
    </Form.Item>

    <Form.Item label="Total" name="total">
      <InputNumber disabled style={{ width: '100%' }} />
    </Form.Item>

    <Form.Item label="Date & Time" name="date">
      <DatePicker style={{ width: '100%' }} />
    </Form.Item>

    <Form.Item>
      <Button type="primary" htmlType="submit">
        Add Stock
      </Button>
    </Form.Item>
    </Form>    
  )
}