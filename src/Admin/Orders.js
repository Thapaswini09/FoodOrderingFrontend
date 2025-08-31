import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import '../css/Orders.css';


const Orders = () => {
  const [ordersData, setOrdersData] = useState([]);

  const getAdminOrderDeatils = async () => {
    try {
      const res = await axios.get('http://localhost:8000/api/admin-order-details', {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
          "x-access-token": Cookies.get('adminToken'),
        }
      });
      console.log(res.data.data);
      
      setOrdersData(res.data.data);
    } catch (error) {
      console.error('Failed to fetch admin orders:', error);
    }
  };

  useEffect(() => {
    getAdminOrderDeatils();
  }, []);

  return (
    <div className = "orders-page">
      <h2>Admin Orders</h2>
      <div className="table-container">
      <table>
        <thead>
          <tr>
            <th colSpan="4" >User Details</th>
            <th colSpan="6" >Order Details</th>
          </tr>
          <tr>
            <th>User Name</th>
            <th>Gender</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Food Name</th>
            <th>Food Image</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total Price</th>
          </tr>
        </thead>
        <tbody>
            {ordersData.length === 0 ? (
              <tr>
                <td colSpan="9" style={{ textAlign: 'center', padding: '20px' }}>
                  Data not found
                </td>
              </tr>
            ) : (
              ordersData.map((order) => {
                const user = order.userDetails;
                const item = order.itemDetails;
                const total = item.foodPrice * order.quantity;

                return (
                  <tr key={order._id}>
                    <td>{user.name}</td>
                    <td>{user.gender}</td>
                    <td>{user.email}</td>
                    <td>{user.phonenumber}</td>
                    <td>{item.foodName}</td>
                    <td>
                      <img src={item.foodImage} alt={item.foodName} width="100" />
                    </td>
                    <td>{item.foodPrice}</td>
                    <td>{order.quantity}</td>
                    <td>{total}</td>
                  </tr>
                );
              })
            )}
          </tbody>

      </table>
    </div>
    </div>
  );
};

export default Orders;