import React, { useState, useEffect } from "react";
import Layout from "./../components/Layout/Layout";
import { useCart } from "../context/cart";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { Country} from 'country-state-city';
import "../styles/CartStyles.css";

const CartPage = () => {
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  

  //total price
  const totalPrice = () => {
    try {
      let total = 0;
      cart?.map((item) => {
        total = total + (item.price)* item.quantity;
      });
      return total.toLocaleString("hin-IN", {
        style: "currency",
        currency: "INR",
      });
    } catch (error) {
      console.log(error);
    }
  };
  //detele item
  const removeCartItem = (pid) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === pid);
      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
    } catch (error) {
      console.log(error);
    }
  };

  //get payment gateway token
  // const getToken = async () => {
  //   try {
  //     const { data } = await axios.get("/api/v1/product/braintree/token");
  //     setClientToken(data?.clientToken);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  // useEffect(() => {
  //   getToken();
  // }, [auth?.token]);

  // //handle payments
  // const handlePayment = async () => {
  //   try {
  //     setLoading(true);
  //     const { nonce } = await instance.requestPaymentMethod();
  //     const { data } = await axios.post("/api/v1/product/braintree/payment", {
  //       nonce,
  //       cart,
  //     });
  //     setLoading(false);
  //     localStorage.removeItem("cart");
  //     setCart([]);
  //     navigate("/dashboard/user/orders");
  //     toast.success("Payment Completed Successfully ");
  //   } catch (error) {
  //     console.log(error);
  //     setLoading(false);
  //   }
  // };
  //razorpay order 
  const checkouthandler = async() => {
    try {
      let total = 0;
      let quantity=0;
      cart?.map((item) => {
        quantity = item.quantity
        total = total + (item.price)*quantity;
      });
      const { data: {order} } = await axios.post("/api/v1/product/razorpay/order",{
        amount: total
      })
      const { data: { key } } = await axios.get("http://www.localhost:8080/api/getkey")

      const options = {
        key, // Enter the Key ID generated from the Dashboard
        amount: order.amount, 
        currency: "INR",
        name: "Ecommerce Website",
        description: "MERN stack project ",
        image: "F:/Ecommerce App/client/public/ecommerce.png",
        order_id: order.id, 
        handler: function (response){
          const razorpay_payment_id = response.razorpay_payment_id;
          const razorpay_order_id = response.razorpay_order_id;
          const razorpay_signature = response.razorpay_signature;
          const { data } = axios.post("/api/v1/product//paymentverification", {
            razorpay_payment_id,
            razorpay_order_id,
            razorpay_signature,
            cart,
            quantity
          });
          toast.success("Payment Completed Successfully ");
          localStorage.removeItem("cart");
          setCart([]);
          navigate("/dashboard/user/orders");
          window.location.reload();
      },
        prefill: {
            name: auth?.user?.name,
            email: auth?.user?.email,
            contact: auth?.user?.phone,
        },
        notes: {
            address: "Razorpay Corporate Office"
        },
        theme: {
            color: "#121212"
        }
      };
      const razor = new window.Razorpay(options);
      razor.on('payment.failed', function (response){
        alert("Try Again");
        toast.error("Payment Failed! Try again ");
        // const { data } = axios.post("/api/v1/product//paymentfailure", {
        //     cart,
        //   });
        window.location.reload()
      });
      razor.open();
      
      
    } catch (error) {
      console.log(error)
    }
  }

  // Function to add an item to the cart or increase its quantity
  const addToCart = (product) => {
    const existingItem = cart.find((item) => item._id === product._id);

    if (existingItem) {
      // If the item is already in the cart, increase its quantity
      const updatedCart = cart.map((item) => {
        if (item._id === product._id) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      });

      setCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    } else {
      // If the item is not in the cart, add it with a quantity of 1
      const updatedCart = [...cart, { ...product, quantity: 1 }];
      setCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    }

    toast.success("Item Added to cart");
  };

  // Function to decrease the quantity of a product in the cart
  const decreaseQuantity = (pid) => {
    const updatedCart = cart.map((item) => {
      if (item._id === pid) {
        const newQuantity = Math.max(item.quantity - 1, 0);
        if (newQuantity === 0) {
          // If the quantity reaches 0, remove the item from the cart
          return null;
        }
        return { ...item, quantity: newQuantity };
      }
      return item;
    });

    // Remove items with quantity 0
    const updatedCartWithoutZeroQuantity = updatedCart.filter(
      (item) => item !== null
    );

    setCart(updatedCartWithoutZeroQuantity);
    localStorage.setItem("cart", JSON.stringify(updatedCartWithoutZeroQuantity));
  };

  return (
    <Layout>
      <div className=" cart-page">
        <div className="row">
          <div className="col-md-12">
            <h1 className="text-center bg-light p-2 mb-1">
              {!auth?.user
                ? "Hello Guest👋"
                : `Hello  ${auth?.token && auth?.user?.name}👋`}
              <p className="text-center">
                {cart?.length
                  ? `You Have ${cart.length} items in your cart🛒 ${
                      auth?.token ? "" : "Please login to checkout !"
                    }`
                  : " Your Cart is Empty🛒"}
              </p>
            </h1>
          </div>
        </div>
        <div className="container ">
          <div className="row ">
            <div className="col-md-7  p-0 m-0">
              {cart?.map((p) => (
                <div className="row card flex-row" key={p._id}>
                  <div className="col-md-4">
                    <img
                      src={`/api/v1/product/product-photo/${p._id}`}
                      className="card-img-top"
                      alt={p.name}
                      width="100%"
                      height={"130px"}
                    />
                  </div>
                  <div className="col-md-4">
                    <p>{p.name}</p>
                    <p>{p.description.substring(0, 30)}...</p>
                    <p>Price : ₹{p.price}</p>
                  </div>
                  <div className="col-md-4 cart-remove-btn">
                  <button
              className="btn btn-sm btn-secondary"
              onClick={() => decreaseQuantity(p._id)}
            >
              -
            </button>
            <button
              className="btn btn-sm btn-outline-info"
            >
              <b> {p.quantity} </b>
            </button>
            <button
              className="btn btn-sm btn-secondary"
              onClick={() => addToCart(p)}
            >
              +
            </button>
                  </div>
                </div>
              ))}
              {cart.length ? (
                <div className="col-md-4">
              <button className="btn btn-info" onClick={() => {setCart([])}}>
                Clear Cart
              </button>
            </div>) : ("")}
            </div>
  
            <div className="col-md-5 cart-summary ">
              <h2>Cart Summary</h2>
              <p>Total | Checkout | Payment</p>
              <hr />
              <h4>Total : {totalPrice()} </h4>
              {auth?.user?.address1 ? (
                <>
                  <div className="mb-3">
                    <h4>Current Address</h4>
                    <p>{auth?.user?.address1}, {auth?.user?.address2}</p>
                    <p className="mt-1 md-1">{auth?.user?.address3}, {auth?.user?.city}</p>
                    <p>{auth?.user?.state}, {auth?.user?.country}- {auth?.user?.pincode}</p>
                    <button
                      className="btn btn-outline-warning"
                      onClick={() => navigate("/dashboard/user/profile")}
                    >
                      Update Address
                    </button>
                  </div>
                </>
              ) : (
                <div className="mb-3">
                  {auth?.token ? (
                    <button
                      className="btn btn-outline-warning"
                      onClick={() => navigate("/dashboard/user/profile")}
                    >
                      Update Address
                    </button>
                  ) : (
                    <button
                      className="btn btn-outline-warning"
                      onClick={() =>
                        navigate("/login", {
                          state: "/cart",
                        })
                      }
                    >
                      Plase Login to checkout
                    </button>
                  )}
                </div>
              )}
              <div className="mt-2">
              { !auth?.token || !cart?.length ? (
                  ""
                ) : (
                    <button
                      className="btn btn-primary"
                      onClick={checkouthandler}
                      
                    >
                      Make Payment
                    </button>
                )}   
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;

// import React, { useState, useEffect } from "react";
// import Layout from "./../components/Layout/Layout";
// import { useCart } from "../context/cart";
// import { useAuth } from "../context/auth";
// import { useNavigate } from "react-router-dom";
// import DropIn from "braintree-web-drop-in-react";
// import { AiFillWarning } from "react-icons/ai";
// import axios from "axios";
// import toast from "react-hot-toast";
// import "../styles/CartStyles.css";

// const CartPage = () => {
//   const [auth, setAuth] = useAuth();
  
//   const [cart, setCart] = useCart();
//   const [clientToken, setClientToken] = useState("");
//   const [instance, setInstance] = useState("");
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();


//   // Increase and Decrease Quantity
//   const increaseQuantity = (pid) => {
//     const updatedCart = cart.map((item) => {
//       if (item._id === pid) {
//         return { ...item, quantity: item.quantity + 1 };
//       }
//       return item;
//     });
//     setCart(updatedCart);
//     localStorage.setItem("cart", JSON.stringify(updatedCart));
//   };

//   const decreaseQuantity = (pid) => {
//     const updatedCart = cart.map((item) => {
//       if (item._id === pid && item.quantity > 1) {
//         return { ...item, quantity: item.quantity - 1 };
//       }
//       return item;
//     });
//     setCart(updatedCart);
//     localStorage.setItem("cart", JSON.stringify(updatedCart));
//   };



//   const addItemToCart = (item) => {
//     const existingItem = cart.find((cartItem) => cartItem._id === item._id);
  
//     if (existingItem) {
//       increaseQuantity(item._id); // Item already exists, so increase quantity
//     } else {
//       const updatedCart = [...cart, { ...item, quantity: 1 }];
//       setCart(updatedCart);
//       localStorage.setItem("cart", JSON.stringify(updatedCart));
//     }
//     console.log("Cart after adding item:", cart); // Add this line for debugging
//   };
  

  

//   // Total price
//   const totalPrice = () => {
//     try {
//       let total = 0;
//       cart?.map((item) => {
//         total = total + item.price * item.quantity;
//       });
//       return total.toLocaleString("hin-IN", {
//         style: "currency",
//         currency: "INR",
//       });
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   //detele item
//   const removeCartItem = (pid) => {
//     try {
//       let myCart = [...cart];
//       let index = myCart.findIndex((item) => item._id === pid);
//       myCart.splice(index, 1);
//       setCart(myCart);
//       localStorage.setItem("cart", JSON.stringify(myCart));
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   //get payment gateway token
//   const getToken = async () => {
//     try {
//       const { data } = await axios.get("/api/v1/product/braintree/token");
//       setClientToken(data?.clientToken);
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   useEffect(() => {
//     getToken();
//   }, [auth?.token]);

//   //handle payments
//   const handlePayment = async () => {
//     try {
//       setLoading(true);
//       const { nonce } = await instance.requestPaymentMethod();
//       const { data } = await axios.post("/api/v1/product/braintree/payment", {
//         nonce,
//         cart,
//       });
//       setLoading(false);
//       localStorage.removeItem("cart");
//       setCart([]);
//       navigate("/dashboard/user/orders");
//       //toast.success("Payment Completed Successfully ");
//     } catch (error) {
//       console.log(error);
//       setLoading(false);
//     }
//   };
//   //razorpay order 
//   const checkouthandler = async() => {
//     try {
//       let total = 0;
//       cart?.map((item) => {
//         total = total + item.price;
//       });
//       const { data: {order} } = await axios.post("/api/v1/product/razorpay/order",{
//         amount: total
//       })
//       const { data: { key } } = await axios.get("http://www.localhost:8080/api/getkey")

//       const options = {
//         key, // Enter the Key ID generated from the Dashboard
//         amount: order.amount, 
//         currency: "INR",
//         name: "Ecommerce Website",
//         description: "MERN stack project ",
//         image: "F:/Ecommerce App/client/public/ecommerce.png",
//         order_id: order.id, 
//         handler: function (response){
//           const razorpay_payment_id = response.razorpay_payment_id;
//           const razorpay_order_id = response.razorpay_order_id;
//           const razorpay_signature = response.razorpay_signature;
//           const { data } = axios.post("/api/v1/product//paymentverification", {
//             razorpay_payment_id,
//             razorpay_order_id,
//             razorpay_signature,
//             cart,
//           });
//           //toast.success("Payment Completed Successfully ");
//           window.location.reload()
//       },
//         prefill: {
//             name: auth?.user?.name,
//             email: auth?.user?.email,
//             contact: auth?.user?.phone,
//         },
//         notes: {
//             address: "Razorpay Corporate Office"
//         },
//         theme: {
//             color: "#121212"
//         }
//       };
//       const razor = new window.Razorpay(options);
//       razor.on('payment.failed', function (response){
//         alert(response.error.code);
//         alert(response.error.description);
//         alert(response.error.source);
//         alert(response.error.step);
//         alert(response.error.reason);
//         alert(response.error.metadata.order_id);
//         alert(response.error.metadata.payment_id);
//         toast.error("Payment Failed! Try again ");
//         const { data } = axios.post("/api/v1/product//paymentfailure", {
//             cart,
//           });
//         window.location.reload()
//       });
//       razor.open();
//       localStorage.removeItem("cart");
//       setCart([]);
//       navigate("/dashboard/user/orders");
      
//     } catch (error) {
//       console.log(error)
//     }
//   }

//   return (
//     <Layout>
//       <div className=" cart-page">
//         <div className="row">
//           <div className="col-md-12">
//             <h5 className="text-center bg-light p-2 mb-1">
//               {!auth?.user
//                 ? "Hello Guest"
//                 : `Hello  ${auth?.token && auth?.user?.name}👋`}
//               <p className="text-center">
//                 {cart?.length
//                   ? `You Have ${cart.length} items in your cart ${
//                       auth?.token ? "" : "Please login to checkout !"
//                     }`
//                   : " Your Cart is Empty"}
//               </p>
//             </h5>
//           </div>
//         </div>
//         <div className="container ">
//           <div className="row ">
//             <div className="col-md-7  p-0 m-0">
//               {cart?.map((p) => (
//                 <div className="row card flex-row" key={p._id}>
//                   <div className="col-md-4">
//                     <img
//                       src={`/api/v1/product/product-photo/${p._id}`}
//                       className="card-img-top"
//                       alt={p.name}
//                       width="100%"
//                       height={"130px"}
//                     />
//                   </div>
//                   <div className="col-md-4">
//                     <p>{p.name}</p>
//                     <p>{p.description.substring(0, 30)}</p>
//                     <p>Price : ₹{p.price}</p>
//                     <div className="quantity-control">
//                       <button
//                         className="quantity-button"
//                         onClick={() => decreaseQuantity(p._id)}
//                       >
//                         -
//                       </button>
//                       {p.quantity}
//                       <button
//                         className="quantity-button"
//                         onClick={() => increaseQuantity(p._id)}
//                       >
//                         +
//                       </button>
//                     </div>
//                   </div>
//                   <div className="col-md-4 cart-remove-btn">
//                     <button
//                       className="btn btn-danger"
//                       onClick={() => removeCartItem(p._id)}
//                     >
//                       Remove
//                     </button>
//                   </div>
//                 </div>
//               ))}
//             </div>
//             <div className="col-md-5 cart-summary ">
//               <h4>Cart Summary</h4>
//               <p>Checkout </p>
//               <hr />
//               <h4>Total : {totalPrice()} </h4>
//               {auth?.user?.address ? (
//                 <>
//                   <div className="mb-3">
//                     <h5>Current Address</h5>
//                     <h6>{auth?.user?.address}</h6>
//                     <button
//                       className="btn btn-outline-warning"
//                       onClick={() => navigate("/dashboard/user/profile")}
//                     >
//                       Update Address
//                     </button>
//                   </div>
//                 </>
//               ) : (
//                 <div className="mb-3">
//                   {auth?.token ? (
//                     <button
//                       className="btn btn-outline-warning"
//                       onClick={() => navigate("/dashboard/user/update-profile")}
//                     >
//                       Update Address
//                     </button>
//                   ) : (
//                     <button
//                       className="btn btn-outline-warning"
//                       onClick={() =>
//                         navigate("/login", {
//                           state: "/cart",
//                         })
//                       }
//                     >
//                       Plase Login to checkout
//                     </button>
//                   )}
//                 </div>
//               )}
//               <div className="mt-2">
                

//                     <button
//                       className="btn btn-primary"
//                       onClick={checkouthandler}
                      
//                     >
//                       Make Payment
//                     </button>
                  
                
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </Layout>
//   );
// };

// export default CartPage;







// import React, { useState, useEffect } from "react";
// import Layout from "./../components/Layout/Layout";
// import { useCart } from "../context/cart";
// import { useAuth } from "../context/auth";
// import { useNavigate } from "react-router-dom";
// import DropIn from "braintree-web-drop-in-react";
// import { AiFillWarning } from "react-icons/ai";
// import axios from "axios";
// import toast from "react-hot-toast";
// import "../styles/CartStyles.css";

// const CartPage = () => {
//   const [auth, setAuth] = useAuth();
  
//   const [cart, setCart] = useCart();
//   const [clientToken, setClientToken] = useState("");
//   const [instance, setInstance] = useState("");
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();
  

//   //total price

//   const totalPrice = () => {
//     try {
//       let total = 0;
//       cart?.map((item) => {
//         total = total + item.price;
//       });
//       return total.toLocaleString("hin-IN", {
//         style: "currency",
//         currency: "INR",
//       });
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   //detele item
//   const removeCartItem = (pid) => {
//     try {
//       let myCart = [...cart];
//       let index = myCart.findIndex((item) => item._id === pid);
//       myCart.splice(index, 1);
//       setCart(myCart);
//       localStorage.setItem("cart", JSON.stringify(myCart));
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   //get payment gateway token
//   const getToken = async () => {
//     try {
//       const { data } = await axios.get("/api/v1/product/braintree/token");
//       setClientToken(data?.clientToken);
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   useEffect(() => {
//     getToken();
//   }, [auth?.token]);

//   //handle payments
//   const handlePayment = async () => {
//     try {
//       setLoading(true);
//       const { nonce } = await instance.requestPaymentMethod();
//       const { data } = await axios.post("/api/v1/product/braintree/payment", {
//         nonce,
//         cart,
//       });
//       setLoading(false);
//       localStorage.removeItem("cart");
//       setCart([]);
//       navigate("/dashboard/user/orders");
//       //toast.success("Payment Completed Successfully ");
//     } catch (error) {
//       console.log(error);
//       setLoading(false);
//     }
//   };
//   //razorpay order 
//   const checkouthandler = async() => {
//     try {
//       let total = 0;
//       cart?.map((item) => {
//         total = total + item.price;
//       });
//       const { data: {order} } = await axios.post("/api/v1/product/razorpay/order",{
//         amount: total
//       })
//       const { data: { key } } = await axios.get("http://www.localhost:8080/api/getkey")

//       const options = {
//         key, // Enter the Key ID generated from the Dashboard
//         amount: order.amount, 
//         currency: "INR",
//         name: "Ecommerce Website",
//         description: "MERN stack project ",
//         image: "F:/Ecommerce App/client/public/ecommerce.png",
//         order_id: order.id, 
//         handler: function (response){
//           const razorpay_payment_id = response.razorpay_payment_id;
//           const razorpay_order_id = response.razorpay_order_id;
//           const razorpay_signature = response.razorpay_signature;
//           const { data } = axios.post("/api/v1/product//paymentverification", {
//             razorpay_payment_id,
//             razorpay_order_id,
//             razorpay_signature,
//             cart,
//           });
//           //toast.success("Payment Completed Successfully ");
//           window.location.reload()
//       },
//         prefill: {
//             name: auth?.user?.name,
//             email: auth?.user?.email,
//             contact: auth?.user?.phone,
//         },
//         notes: {
//             address: "Razorpay Corporate Office"
//         },
//         theme: {
//             color: "#121212"
//         }
//       };
//       const razor = new window.Razorpay(options);
//       razor.on('payment.failed', function (response){
//         alert(response.error.code);
//         alert(response.error.description);
//         alert(response.error.source);
//         alert(response.error.step);
//         alert(response.error.reason);
//         alert(response.error.metadata.order_id);
//         alert(response.error.metadata.payment_id);
//         toast.error("Payment Failed! Try again ");
//         const { data } = axios.post("/api/v1/product//paymentfailure", {
//             cart,
//           });
//         window.location.reload()
//       });
//       razor.open();
//       localStorage.removeItem("cart");
//       setCart([]);
//       navigate("/dashboard/user/orders");
      
//     } catch (error) {
//       console.log(error)
//     }
//   }

//   return (
//     <Layout>
//       <div className=" cart-page">
//         <div className="row">
//           <div className="col-md-12">
//             <h5 className="text-center bg-light p-2 mb-1">
//               {!auth?.user
//                 ? "Hello Guest"
//                 : `Hello  ${auth?.token && auth?.user?.name}👋`}
//               <p className="text-center">
//                 {cart?.length
//                   ? `You Have ${cart.length} items in your cart ${
//                       auth?.token ? "" : "Please login to checkout !"
//                     }`
//                   : " Your Cart is Empty"}
//               </p>
//             </h5>
//           </div>
//         </div>
//         <div className="container ">
//           <div className="row ">
//             <div className="col-md-7  p-0 m-0">
//               {cart?.map((p) => (
//                 <div className="row card flex-row" key={p._id}>
//                   <div className="col-md-4">
//                     <img
//                       src={`/api/v1/product/product-photo/${p._id}`}
//                       className="card-img-top"
//                       alt={p.name}
//                       width="100%"
//                       height={"130px"}
//                     />
//                   </div>
//                   <div className="col-md-4">
//                     <p>{p.name}</p>
//                     <p>{p.description.substring(0, 30)}</p>
//                     <p>Price : ₹{p.price}</p>
//                   </div>
//                   <div className="col-md-4 cart-remove-btn">
//                     <button
//                       className="btn btn-danger"
//                       onClick={() => removeCartItem(p._id)}
//                     >
//                       Remove
//                     </button>
//                   </div>
//                 </div>
//               ))}
//             </div>
//             <div className="col-md-5 cart-summary ">
//               <h4>Cart Summary</h4>
//               <p>Checkout </p>
//               <hr />
//               <h4>Total : {totalPrice()} </h4>
//               {auth?.user?.address ? (
//                 <>
//                   <div className="mb-3">
//                     <h5>Current Address</h5>
//                     <h6>{auth?.user?.address}</h6>
//                     <button
//                       className="btn btn-outline-warning"
//                       onClick={() => navigate("/dashboard/user/profile")}
//                     >
//                       Update Address
//                     </button>
//                   </div>
//                 </>
//               ) : (
//                 <div className="mb-3">
//                   {auth?.token ? (
//                     <button
//                       className="btn btn-outline-warning"
//                       onClick={() => navigate("/dashboard/user/update-profile")}
//                     >
//                       Update Address
//                     </button>
//                   ) : (
//                     <button
//                       className="btn btn-outline-warning"
//                       onClick={() =>
//                         navigate("/login", {
//                           state: "/cart",
//                         })
//                       }
//                     >
//                       Plase Login to checkout
//                     </button>
//                   )}
//                 </div>
//               )}
//               <div className="mt-2">
                

//                     <button
//                       className="btn btn-primary"
//                       onClick={checkouthandler}
                      
//                     >
//                       Make Payment
//                     </button>
                  
                
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </Layout>
//   );
// };

// export default CartPage;