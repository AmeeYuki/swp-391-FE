import Search from "antd/es/input/Search";
import "./MakeSell.css";
import { Button, Col, ConfigProvider, Row, notification } from "antd";
import CustomerSpace from "./CustomerSpace";
import ProductSpace from "./ProductSpace";
import { useAddOrderMutation } from "../../../../services/orderAPI";
import { useState } from "react";
import { useSelector } from "react-redux";
import { selectAuth } from "../../../../slices/auth.slice";
import { useNavigate } from "react-router-dom";

export default function MakeSell({}) {
  const [addOrder, { isLoading }] = useAddOrderMutation();
  // const [loading, isLoading] = useState(false);
  const auth = useSelector(selectAuth);
  const navigate = useNavigate();

  const [orderData, setOrderData] = useState({
    orderRequests: [
      {
        quantity: 0,
        product_id: 0,
        unit_price: 0,
      },
    ],
    orderDTO: {
      date: new Date().toISOString(), // Lấy ngày hiện tại
      discount: 0,
      created_by: auth.name,
      type: "sell",
      customer_id: 0,
      user_id: auth.id,
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrderData((prevState) => ({
      ...prevState,
      orderDTO: {
        ...prevState.orderDTO,
        [name]: value,
      },
    }));
  };

  // const handleSubmit = async (e) => {
  //   try {
  //     console.log("Submitting order data:", orderData); // Log dữ liệu trước khi gọi mutation
  //     const response = await addOrder(orderData); // Gọi mutation để thêm đơn hàng
  //     console.log("Added order:", data);
  //     notification.success({
  //       message: "Maker Order Successfully",
  //     });
  //     notification;
  //     navigate("/order");
  //   } catch (error) {
  //     console.error("Error adding order:", error);
  //     notification.error({
  //       message: "Maker Order Successfully",
  //     });
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    try {
      const response = await addOrder(orderData); // Call the mutation to add the order and unwrap the response
      console.log(response);
      if (response) {
        notification.success({
          message: "Order made successfully",
        });
        navigate("/order");
      } else {
        throw new Error(`Unexpected status code: ${response.status}`);
      }
    } catch (error) {
      console.error("Error adding order:", error);
      notification.error({
        message: "Error making order",
        description: error.message,
      });
    }
  };

  const handleCustomerInfoChange = (customerInfo) => {
    // Cập nhật thông tin khách hàng vào state orderData
    console.log("Customer info changed:", customerInfo?.id); // Log dữ liệu khi thông tin khách hàng thay đổi
    setOrderData((prevData) => ({
      ...prevData,
      orderDTO: {
        ...prevData.orderDTO,
        customer_id: customerInfo?.id,
        // Cập nhật các trường thông tin khác nếu cần
      },
    }));
  };

  const handleProductChange = (productData) => {
    // Xử lý dữ liệu sản phẩm tại đây, ví dụ: cập nhật state, log, hoặc thực hiện các hành động khác
    console.log("Product data changed:", productData);

    // Tạo một mảng mới chứa order requests dựa trên productData
    const newOrderRequests = productData.map((product) => ({
      quantity: product.quantity,
      product_id: product.id,
      unit_price: product.totalPrice / product.quantity,
    }));

    // Cập nhật orderRequests trong orderData
    setOrderData((prevData) => ({
      ...prevData,
      orderRequests: newOrderRequests,
    }));
  };

  return (
    <div className="make-sell-page">
      <div className="header">
        <h1 className="title">Make Sell</h1>
      </div>
      <div className="body">
        <div className="customer-space">
          <CustomerSpace onCustomerInfoChange={handleCustomerInfoChange} />
        </div>
        <div className="product-space">
          <ProductSpace onProductChange={handleProductChange} />
        </div>
        <div className="d-flex-center" style={{ marginTop: 20 }}>
          <div></div>
          <div>
            <Button
              type="primary"
              size="large"
              onClick={handleSubmit}
              loading={isLoading}
            >
              Make Order
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
