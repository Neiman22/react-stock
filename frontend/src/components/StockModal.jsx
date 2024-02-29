import { Divider, Flex, Tag, Typography } from "antd";
export const StockModal = ({ stock }) => {
  const changePrice = (stock[3] - stock[15]) / stock[15];
  return (
    <>
      <Flex align="center">
        <Typography.Title level={2} style={{margin: 0}}>({stock[0]}) {stock[2]}</Typography.Title>
      </Flex> 
      <Divider></Divider>
      <Typography.Paragraph>
        <Typography.Text strong>Changes per day: </Typography.Text>
        <Tag color={changePrice > 0 ? 'green' : 'red'}>{changePrice.toFixed(2)}%</Tag>
      </Typography.Paragraph>
      <Typography.Paragraph>
        <Typography.Text strong>Price: {stock[3]} ₽</Typography.Text>
      </Typography.Paragraph>
    </>

  )
}