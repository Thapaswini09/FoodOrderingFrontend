import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const Cart = () => {
  const [itemsdata, setItemsdata] = useState([]);

  const getCartsData = async () => {
    const res = await axios.get('http://localhost:8000/api/user-get-carts', {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
        "x-access-token": Cookies.get('userToken'),
      }
    });
    setItemsdata(res.data.data);
  };

  useEffect(() => {
    getCartsData();
  }, []);

  const handleCheckout = async () => {
    try {
      const cartIds = itemsdata.flatMap(order => order.carts.map(cart => cart._id));
      if (cartIds.length === 0) return alert("No items to checkout.");

      const res = await axios.post('http://localhost:8000/api/all-order-data', { cartIds }, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
          "x-access-token": Cookies.get('userToken'),
        }
      });

      alert("Order placed successfully!");
      getCartsData();
    } catch (error) {
      console.error("Checkout failed:", error);
      alert("Checkout failed. Please try again.");
    }
  };

  const handleSingleCheckout = async (cartId) => {
    try {
      const res = await axios.post('http://localhost:8000/api/single-order-data', { id: cartId }, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
          "x-access-token": Cookies.get('userToken'),
        }
      });
      alert("Order placed successfully!");
      getCartsData();
    } catch (error) {
      console.error("Checkout failed:", error);
      alert("Checkout failed. Please try again.");
    }
  };

  const handleRemoveItem = async (id) => {
    const res = await axios.delete(`http://localhost:8000/api/user-delete-carts/${id}`, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
        "x-access-token": Cookies.get('userToken'),
      }
    });
    console.log(res.data.message);
    getCartsData();
  };

  return (
    <div className="container my-4">
      <h1 className="text-center mb-4">Your Cart</h1>

      <div className="table-responsive">
        <table className="table table-bordered table-hover text-center align-middle bg-white">
          <thead className="table-dark">
            <tr>
              <th>Food Name</th>
              <th>Restaurant</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Image</th>
              <th>Total</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
              {itemsdata.length === 0 || itemsdata.every(order => order.carts.length === 0) ? (
                <tr>
                  <td colSpan="7" style={{ textAlign: 'center', padding: '20px' }}>
                    Data not found
                  </td>
                </tr>
              ) : (
                itemsdata.map((order, orderIndex) =>
                  order.carts.map((cart, cartIndex) => {
                    const item = cart.adminadditems[0];
                    return (
                      <tr key={`${orderIndex}-${cartIndex}`}>
                        <td>{item.foodName}</td>
                        <td>{item.resturentName}</td>
                        <td>{cart.quantity}</td>
                        <td>₹{item.foodPrice}</td>
                        <td>
                          <img
                            src={item.foodImage}
                            alt={item.foodName}
                            width="80"
                            className="rounded"
                          />
                        </td>
                        <td>₹{item.foodPrice * cart.quantity}</td>
                        <td>
                          <div className="d-flex flex-column gap-2">
                            <button
                              className="btn btn-danger btn-sm"
                              onClick={() => handleRemoveItem(cart._id)}
                            >
                              Remove
                            </button>
                            <button
                              className="btn btn-success btn-sm"
                              onClick={() => handleSingleCheckout(cart._id)}
                            >
                              Checkout
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )
              )}
            </tbody>

        </table>
      </div>

      {itemsdata.length > 0 && (
        <div className="text-center mt-4">
          <button className="btn btn-primary px-4 py-2" onClick={handleCheckout}>
            Checkout All
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
