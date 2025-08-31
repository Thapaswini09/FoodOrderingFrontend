// import { useEffect, useState } from "react";
// import axios from "axios";
// import Cookies from "js-cookie";
// import "../css/card.css";

// const Dashboard = () => {
//   const API_BASE = "https://foodorderingbackend-v3b3.onrender.com";
//   const [itemsdata, setItemsdata] = useState([]);
//   const [quantity, setQuantity] = useState(1);
//   const [quantities, setQuantities] = useState({});
//   const [search, setSearch] = useState("");
//   const [category, setCategory] = useState("");
//   const [cartNames] = useState([
//     { id: 1, name: "non" },
//     { id: 2, name: "vegetarian" },
//     { id: 3, name: "softdrink" },
//     { id: 4, name: "fastfood" },
//     { id: 5, name: "All" },
//   ]);

//   const getAllItems = async () => {
//     const queryParams = new URLSearchParams();
//     if (search) queryParams.append("search", search);
//     if (category && category !== "All") {
//       queryParams.append("foodType", category);
//     }
//     const res = await axios.get(
//       `${API_BASE}/api/user-getall-items?${queryParams.toString()}`,
//       {
//         withCredentials: true,
//         headers: {
//           "Content-Type": "application/json",
//           "x-access-token": Cookies.get("userToken"),
//         },
//       }
//     );
//     setItemsdata(res.data.data);
//   };
//   //Quantity inc and dec
//   const handleIncrease = (id) => {
//     setQuantities((prev) => {
//       const currentQty = prev[id] || 1;
//       if (currentQty >= 10) {
//         alert("You can't add more than 10 items");
//         return prev;
//       }
//       return {
//         ...prev,
//         [id]: currentQty + 1,
//       };
//     });
//   };

//   const handleDecrease = (id) => {
//     setQuantities((prev) => {
//       const currentQty = prev[id] || 1;
//       if (currentQty <= 1) {
//         alert("You can't add less than 1 item");
//         return prev;
//       }
//       return {
//         ...prev,
//         [id]: currentQty - 1,
//       };
//     });
//   };

//   const addToCartItems = async (id) => {
//     const quantity = quantities[id] || 1;
//     await axios.post(
//       `${API_BASE}/api/user-add-to-cart`,
//       {
//         id,
//         quantity,
//       },
//       {
//         withCredentials: true,
//         headers: {
//           "Content-Type": "application/json",
//           "x-access-token": Cookies.get("userToken"),
//         },
//       }
//     );
//     alert("Added to cart!");
//   };

//   useEffect(() => {
//     getAllItems();
//   }, [search, category]);

//   return (
//     <div
//       style={{
//         backgroundImage: "url('/ChatGPT.png')",
//         backgroundSize: "cover",
//         backgroundAttachment: "fixed",
//         backgroundRepeat: "no-repeat",
//         backgroundPosition: "center",
//         position: "absolute",
//         top: 0,
//         left: 0,
//         width: "100%",
//         minHeight: "100vh",
//         zIndex: -1,
//       }}
//     >
//       <div style={{ position: "relative", zIndex: 1, padding: "20px" }}>
//         <h1>User Dashboard</h1>

//         <form
//           className="d-flex justify-content-between align-items-center flex-wrap "
//           role="search"
//           onSubmit={(e) => e.preventDefault()}
//           style={{ marginBottom: "20px" }}
//         >
//           <div className="d-flex flex-wrap align-items-center">
//             {cartNames.map((ele) => (
//               <button
//                 key={ele.id}
//                 onClick={() => setCategory(ele.name)}
//                 type="button"
//                 style={{
//                   marginRight: "10px",
//                   marginBottom: "5px",
//                   padding: "8px 12px",
//                   backgroundColor:
//                     category === ele.name ? "#007bff" : "#f0f0f0",
//                   color: category === ele.name ? "#fff" : "#000",
//                   border: "none",
//                   borderRadius: "4px",
//                   cursor: "pointer",
//                 }}
//               >
//                 {ele.name === "non" ? "Non-Vegetarian" : ele.name}
//               </button>
//             ))}
//           </div>
//           <div
//             className="d-flex align-items-center gap-2"
//             style={{ marginTop: "10px" }}
//           >
//             <input
//               type="text"
//               placeholder="Search items..."
//               onChange={(e) => setSearch(e.target.value)}
//               style={{ padding: "8px", width: "250px" }}
//             />
//             <button
//               className="btn"
//               type="submit"
//               style={{ backgroundColor: "#c24e1b" }}
//             >
//               Search
//             </button>
//           </div>
//         </form>

//         <div className="container">
//           {itemsdata.length === 0 ? (
//             <div
//               className="text-center"
//               style={{ padding: "100px 0", fontSize: "24px", color: "white" }}
//             >
//               No data found
//             </div>
//           ) : (
//             <div className="row">
//               {itemsdata.map((ele, index) => (
//                 <div
//                   key={index}
//                   className="col-lg-4 col-md-6 col-sm-12 mb-4 d-flex justify-content-center"
//                   style={{ padding: "26px" }}
//                 >
//                   <div
//                     className="card h-100 d-flex flex-column justify-content-between"
//                     style={{
//                       backgroundColor: "#fce09d",
//                       width: "100%",
//                       maxWidth: "320px",
//                     }}
//                   >
//                     <img
//                       src={ele.foodImage}
//                       className="card-img-top"
//                       alt="Not Found"
//                       style={{ objectFit: "cover", height: "180px" }}
//                     />

//                     <div className="card-body d-flex flex-column">
//                       <h5 className="card-title mb-1">
//                         <span style={{ color: "#e28743" }}>Food Name :</span>{" "}
//                         {ele.foodName}
//                       </h5>
//                       <p className="card-text mb-1">
//                         <b>
//                           <span style={{ color: "#e28743" }}>Price :</span> ₹{" "}
//                           {ele.foodPrice}
//                         </b>
//                       </p>
//                       <p className="card-text mb-3">
//                         <span
//                           style={{
//                             color: "#e28743",
//                             fontSize: "18px",
//                             fontWeight: "bold",
//                           }}
//                         >
//                           Resturent Name :
//                         </span>
//                         <b>{ele.resturentName}</b>
//                       </p>
//                       <p className="list-items__description">
//                         {ele.foodDescription.length > 100
//                           ? ele.foodDescription.substring(0, 100) + "..."
//                           : ele.foodDescription}
//                       </p>

//                       <div className="mt-auto">
//                         <div className="d-flex justify-content-center align-items-center gap-4 mb-2">
//                           <button
//                             className="btn"
//                             onClick={() => handleDecrease(ele._id)}
//                             style={{
//                               backgroundColor: "#c24e1b",
//                               borderColor: "rgb(250, 125, 52)",
//                             }}
//                           >
//                             {" "}
//                             -{" "}
//                           </button>
//                           {/* <button
//                             className="btn"
//                             style={{ backgroundColor: "#c24e1b", borderColor: "rgb(250, 125, 52)" }}
//                             onClick={() => {
//                               if (quantity > 1) {
//                                 setQuantity(quantity - 1);
//                               } else {
//                                 alert("You can't add less than 1 item");
//                               }
//                             }}
//                           > - </button> */}

//                           {/* <span style={{ color: 'black' }}>{quantity}</span> */}
//                           <span style={{ color: "black" }}>
//                             {quantities[ele._id] || 1}
//                           </span>
//                           <button
//                             className="btn"
//                             onClick={() => handleIncrease(ele._id)}
//                           >
//                             {" "}
//                             +{" "}
//                           </button>
//                           {/* <button
//                             className="btn"
//                             style={{ backgroundColor: "#c24e1b", borderColor: "rgb(250, 125, 52)" }}
//                             onClick={() => {
//                               if (quantity < 10) {
//                                 setQuantity(quantity + 1);
//                               } else {
//                                 alert("You can't add more than 10 items");
//                               }
//                             }}
//                           > + </button> */}
//                         </div>

//                         <div style={{ textAlign: "center" }}>
//                           <button
//                             className="btn form-control"
//                             style={{
//                               backgroundColor: "#3d3938",
//                               borderColor: "rgb(250, 125, 52)",
//                             }}
//                             onClick={() => addToCartItems(ele._id)}
//                           >
//                             Add to Cart
//                           </button>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;

import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../css/card.css";

toast.configure();

const Dashboard = () => {
  const API_BASE = process.env.REACT_APP_API_BASE;

  const [itemsdata, setItemsdata] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  const cartNames = [
    { id: 1, name: "non" },
    { id: 2, name: "vegetarian" },
    { id: 3, name: "softdrink" },
    { id: 4, name: "fastfood" },
    { id: 5, name: "All" },
  ];

  // Fetch all items
  const getAllItems = async () => {
    try {
      const queryParams = new URLSearchParams();
      if (search) queryParams.append("search", search);
      if (category && category !== "All")
        queryParams.append("foodType", category);

      const res = await axios.get(
        `${API_BASE}/api/user-getall-items?${queryParams.toString()}`,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
            "x-access-token": Cookies.get("userToken"),
          },
        }
      );
      setItemsdata(res.data.data);
    } catch (error) {
      console.error("Failed to fetch items:", error);
      toast.error("Failed to fetch items. Please try again.");
    }
  };

  // Increase quantity
  const handleIncrease = (id) => {
    setQuantities((prev) => {
      const currentQty = prev[id] || 1;
      if (currentQty >= 10) {
        toast.warning("You can't add more than 10 items");
        return prev;
      }
      return { ...prev, [id]: currentQty + 1 };
    });
  };

  // Decrease quantity
  const handleDecrease = (id) => {
    setQuantities((prev) => {
      const currentQty = prev[id] || 1;
      if (currentQty <= 1) {
        toast.warning("You can't add less than 1 item");
        return prev;
      }
      return { ...prev, [id]: currentQty - 1 };
    });
  };

  // Add item to cart
  const addToCartItems = async (id) => {
    try {
      const quantity = quantities[id] || 1;
      await axios.post(
        `${API_BASE}/api/user-add-to-cart`,
        { id, quantity },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
            "x-access-token": Cookies.get("userToken"),
          },
        }
      );
      toast.success("Added to cart!");
    } catch (error) {
      console.error("Failed to add to cart:", error);
      toast.error("Failed to add to cart. Please try again.");
    }
  };

  useEffect(() => {
    getAllItems();
  }, [search, category]);

  return (
    <div
      style={{
        backgroundImage: "url('/ChatGPT.png')",
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        minHeight: "100vh",
        zIndex: -1,
      }}
    >
      <div style={{ position: "relative", zIndex: 1, padding: "20px" }}>
        <h1>User Dashboard</h1>

        <form
          className="d-flex justify-content-between align-items-center flex-wrap"
          role="search"
          onSubmit={(e) => e.preventDefault()}
          style={{ marginBottom: "20px" }}
        >
          <div className="d-flex flex-wrap align-items-center">
            {cartNames.map((ele) => (
              <button
                key={ele.id}
                onClick={() => setCategory(ele.name)}
                type="button"
                style={{
                  marginRight: "10px",
                  marginBottom: "5px",
                  padding: "8px 12px",
                  backgroundColor:
                    category === ele.name ? "#007bff" : "#f0f0f0",
                  color: category === ele.name ? "#fff" : "#000",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                {ele.name === "non" ? "Non-Vegetarian" : ele.name}
              </button>
            ))}
          </div>
          <div
            className="d-flex align-items-center gap-2"
            style={{ marginTop: "10px" }}
          >
            <input
              type="text"
              placeholder="Search items..."
              onChange={(e) => setSearch(e.target.value)}
              style={{ padding: "8px", width: "250px" }}
            />
            <button
              className="btn"
              type="submit"
              style={{ backgroundColor: "#c24e1b" }}
            >
              Search
            </button>
          </div>
        </form>

        <div className="container">
          {itemsdata.length === 0 ? (
            <div
              className="text-center"
              style={{ padding: "100px 0", fontSize: "24px", color: "white" }}
            >
              No data found
            </div>
          ) : (
            <div className="row">
              {itemsdata.map((ele, index) => (
                <div
                  key={index}
                  className="col-lg-4 col-md-6 col-sm-12 mb-4 d-flex justify-content-center"
                  style={{ padding: "26px" }}
                >
                  <div
                    className="card h-100 d-flex flex-column justify-content-between"
                    style={{
                      backgroundColor: "#fce09d",
                      width: "100%",
                      maxWidth: "320px",
                    }}
                  >
                    <img
                      src={ele.foodImage}
                      className="card-img-top"
                      alt="Not Found"
                      style={{ objectFit: "cover", height: "180px" }}
                    />

                    <div className="card-body d-flex flex-column">
                      <h5 className="card-title mb-1">
                        <span style={{ color: "#e28743" }}>Food Name :</span>{" "}
                        {ele.foodName}
                      </h5>
                      <p className="card-text mb-1">
                        <b>
                          <span style={{ color: "#e28743" }}>Price :</span> ₹
                          {ele.foodPrice}
                        </b>
                      </p>
                      <p className="card-text mb-3">
                        <span
                          style={{
                            color: "#e28743",
                            fontSize: "18px",
                            fontWeight: "bold",
                          }}
                        >
                          Restaurant Name :
                        </span>
                        <b>{ele.resturentName}</b>
                      </p>
                      <p className="list-items__description">
                        {ele.foodDescription.length > 100
                          ? ele.foodDescription.substring(0, 100) + "..."
                          : ele.foodDescription}
                      </p>

                      <div className="mt-auto">
                        <div className="d-flex justify-content-center align-items-center gap-4 mb-2">
                          <button
                            className="btn"
                            onClick={() => handleDecrease(ele._id)}
                            style={{
                              backgroundColor: "#c24e1b",
                              borderColor: "rgb(250, 125, 52)",
                            }}
                          >
                            -
                          </button>

                          <span style={{ color: "black" }}>
                            {quantities[ele._id] || 1}
                          </span>

                          <button
                            className="btn"
                            onClick={() => handleIncrease(ele._id)}
                            style={{
                              backgroundColor: "#c24e1b",
                              borderColor: "rgb(250, 125, 52)",
                            }}
                          >
                            +
                          </button>
                        </div>

                        <div style={{ textAlign: "center" }}>
                          <button
                            className="btn form-control"
                            style={{
                              backgroundColor: "#3d3938",
                              borderColor: "rgb(250, 125, 52)",
                            }}
                            onClick={() => addToCartItems(ele._id)}
                          >
                            Add to Cart
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
