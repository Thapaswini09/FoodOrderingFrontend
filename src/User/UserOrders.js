import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import '../css/UserOrders.css';

const UserOrders = () => {
const [ordersData, setOrdersData] = useState([]);

const getUserOrderDeatils = async () => {
try {
const res = await axios.get('http://localhost:8000/api/user-get-orders', {
withCredentials: true,
headers: {
"Content-Type": "application/json",
"x-access-token": Cookies.get('userToken'),
}
});
setOrdersData(res.data.data);
} catch (error) {
console.error("Error fetching user orders:", error);
}
};

useEffect(() => {
getUserOrderDeatils();
}, []);

return (
<>
<h1 className="user-orders-title">Order Index</h1>
  <table className="orders-table" border="1" cellPadding="10" style={{ borderCollapse: 'collapse', width: '100%' }}>
        <thead className="orders-table-head">
        <tr className="orders-table-row-header">
        <th className="orders-table-header">Order Index</th>
        <th className="orders-table-header">Restaurant Name</th>
        <th className="orders-table-header">Food Name</th>
        <th className="orders-table-header">Image</th>
        <th className="orders-table-header">Quantity</th>
        <th className="orders-table-header">Price</th>
        <th className="orders-table-header">Total Price</th>
        <th className="orders-table-header">Order Date & Time</th>
        </tr>
        </thead>
        <tbody className="orders-table-body">
          {ordersData.length === 0 || ordersData.every(item => item.orders.length === 0) ? (
            <tr>
              <td colSpan="8" style={{ textAlign: "center", padding: "20px" }}>
                No orders found.
              </td>
            </tr>
          ) : (
            (() => {
              let orderCounter = 1;
              return ordersData.flatMap((item, index) =>
                item.orders.map((order, orderIndex) => {
                  const food = order.adminadditems[0];
                  const totalPrice = food.foodPrice * order.quantity;
                  const date = new Date(order.orderDate).toLocaleString();
                  return (
                    <tr className="orders-table-row" key={`${index}-${orderIndex}`}>
                      <td className="orders-table-data order-index">{orderCounter++}</td>
                      <td className="orders-table-data resturent-name">{food.resturentName}</td>
                      <td className="orders-table-data food-name">{food.foodName}</td>
                      <td className="orders-table-data food-image-cell">
                        <img className="food-image" src={food.foodImage} alt={food.foodName} width="100" />
                      </td>
                      <td className="orders-table-data quantity">{order.quantity}</td>
                      <td className="orders-table-data price">₹{food.foodPrice}</td>
                      <td className="orders-table-data total-price">₹{totalPrice}</td>
                      <td className="orders-table-data order-date">{date}</td>
                    </tr>
                  );
                })
              );
            })()
          )}
        </tbody>

  </table>
</>
);
};

export default UserOrders;