import React from "react";
import { Card, Table, Col, Row, Button } from "antd";

const OrderProducts = ({ products, addToCart }) => {
  const orderColumns = [
    {
      title: "No.",
      dataIndex: "no",
      key: "no",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Product Name",
      dataIndex: "product_name",
      key: "product_name",
      render: (_, record) => (
        <div style={{ display: "flex", alignItems: "center" }}>
          <img
            src={record.product_image}
            alt={record.product_name}
            style={{ width: "50px", height: "50px", marginRight: "10px" }}
          />
          <span>{record.product_name}</span>
        </div>
      ),
    },
    {
      title: "Barcode",
      dataIndex: "barcode",
      key: "barcode",
    },
    {
      title: "Price",
      dataIndex: "totalPriceSell",
      key: "price",
      render: (totalPriceSell) => `${totalPriceSell.toLocaleString()} VNĐ`,
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Total Price",
      dataIndex: "unitPrice",
      key: "unitPrice",
      render: (price) => `${price.toLocaleString()} VNĐ`,
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Button onClick={() => addToCart(record)} type="primary">
          Add to Cart
        </Button>
      ),
    },
  ];

  const calculateTotalPrice = (
    priceProcessing,
    priceStone,
    weight,
    sellPricePerGram
  ) => {
    return priceProcessing + priceStone + weight * sellPricePerGram;
  };

  const calculateTotalBuyPrice = (
    priceProcessing,
    priceStone,
    weight,
    sellPricePerGram
  ) => {
    return priceProcessing + priceStone + weight * sellPricePerGram;
  };
  const orderData = products.map((item, index) => ({
    key: index,
    no: index + 1,
    product_name: item.product.productName,
    product_id: item.product.id,
    product_image: item.product.imageUrl,
    quantity: item.quantity,
    weight: item.product.weight,
    weightUnit: item.product.weightUnit,
    unitPrice: item.unitPrice,
    barcode: item.product.barcode,
    priceProcessing: item.product.priceProcessing,
    priceStone: item.product.priceStone,
    buy_price_per_gram: item.product.type.buy_price_per_gram,
    sell_price_per_gram: item.product.type.sell_price_per_gram,
    type: item.product.type.type,
    totalPriceSell: calculateTotalPrice(
      item.product.priceProcessing,
      item.product.priceStone,
      item.product.weight,
      item.product.type.sell_price_per_gram
    ),
    totalPriceBuy: calculateTotalBuyPrice(
      item.product.priceProcessing,
      item.product.priceStone,
      item.product.weight,
      item.product.type.buy_price_per_gram
    ),
  }));

  return (
    <Row gutter={[16, 16]}>
      <Col span={24}>
        <h6 className="sub-title">Order Products</h6>
        <hr />
        <Table
          columns={orderColumns}
          dataSource={orderData}
          pagination={false}
        />
      </Col>
    </Row>
  );
};

export default OrderProducts;