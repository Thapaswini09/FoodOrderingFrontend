import { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import '../css/ListItems.css'

const ListItems = () => {
  const [itemsData, setItemsData] = useState([]);

  const getAdminItemsData = async () => {
    const res = await axios.get('http://localhost:8000/api/admin-get-items', {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
        "x-access-token": Cookies.get('adminToken'),
      }
    });
    setItemsData(res.data.data);
  };

  useEffect(() => {
    getAdminItemsData();
  }, []);

  return (
    <div className="list-items mt-5">
        {/* <h1 className="list-items__title">Menu</h1> */}
        <div className="list-items__container">
          {itemsData.length === 0 ? (
            <p style={{ textAlign: 'center', width: '100%', marginTop: '20px' }}>
              Data not found
            </p>
          ) : (
            itemsData.map((ele, index) => (
              <div key={index} className="list-items__card">
                <h2 className="list-items__restaurant">{ele.resturentName}</h2>
                <h2 className="list-items__name">{ele.foodName}</h2>
                <div className="list-items__image">
                  <img src={ele.foodImage} alt={ele.foodName} />
                </div>
                {/* <p className="list-items__description">{ele.foodDescription}</p> */}
                <p className="list-items__description">
                  {ele.foodDescription.length > 50
                    ? ele.foodDescription.substring(0, 100) + "......."
                    : ele.foodDescription}
                </p>
                <p className="list-items__price">₹{ele.foodPrice}</p>
              </div>
            ))
          )}
        </div>
      </div>

  );
};

export default ListItems;

