import { useState } from "react"
import { Divider, Select, Space, Typography, Form, Button, InputNumber, DatePicker } from "antd";
import { useStock } from "../context/stock-context";

export const AddStockForm = () => {
  const [form] = Form.useForm();
  const [stock, setStock] = useState(null);
  const { stocks } = useStock();

  const validateMessages = {
    required: "${label} is required!",
    types: {
      number: "${label} is not valid number"
    },
    number: {
      range: "${label} must be between ${min} and ${max}"
    }
  };

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
    console.log('finish: ', values)
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

    <Typography.Title level={2} style={{ margin: 0 }}>{stock[0]}</Typography.Title>
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