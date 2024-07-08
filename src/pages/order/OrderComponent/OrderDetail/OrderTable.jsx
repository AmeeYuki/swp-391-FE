import React from "react";
import { Flex, Table } from "antd";

export default function OrderTable({ products, order }) {
  const columns = [
    {
      title: "No.",
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
      dataIndex: "product_barcode",
      key: "product_barcode",
    },
    {
      title: "Type",
      dataIndex: "product_type",
      key: "product_type",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price) => `${price.toLocaleString()} VNĐ`,
    },
    {
      title: "Total",
      dataIndex: "total_price",
      key: "total_price",
      render: (total_price) => `${total_price.toLocaleString()} VNĐ`,
    },
  ];

  const data = products.map((item, index) => ({
    key: index,
    product_name: item.product.productName,
    product_image: item.product.imageUrl,
    product_barcode: item.product.barcode,
    product_type: item.product.type.type,
    quantity: item.quantity,
    price: item.unitPrice,
    total_price: item.unitPrice * item.quantity,
  }));

  const subtotal = data.reduce((sum, item) => sum + item.total_price, 0);
  let total = subtotal - order.discount;
  if (total < 0) {
    total = 0;
  }

  return (
    <div style={{ marginTop: 10 }}>
      <h3 style={{ fontWeight: 400 }}>Product</h3>
      <hr />
      <Table columns={columns} dataSource={data} pagination={false} />
      <br />
      <div className="border-total-detail">
        <Flex align="center" justify="space-between">
          <div>Sub total:</div>
          <div>{subtotal.toLocaleString()} VNĐ</div>
        </Flex>
        <Flex align="center" justify="space-between">
          <div>Discount: </div>
          <div>{order.discount.toLocaleString()} VNĐ</div>
        </Flex>
        <Flex style={{ color: "red" }} align="center" justify="space-between">
          <div>Total:</div>
          <div>{total.toLocaleString()} VNĐ</div>
        </Flex>
      </div>
    </div>
  );
}
