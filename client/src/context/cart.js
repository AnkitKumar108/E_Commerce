// to access the context data provided by a parent ContextProvider.
import { useState, useContext, createContext, useEffect } from "react";

//used to share data (in this case, the shopping cart) among different components in application.
const CartContext = createContext();

//a state variable cart and its corresponding updater function setCart are created using 
//the useState hook. This state will store the shopping cart data.
const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

//useEffect hook is used to perform an initial setup when the CartProvider component is mounted
// retrieves the cart data from the browser's localStorage using localStorage.getItem("cart"). 
//If there is data in localStorage with the key "cart," it parses the data and sets it as the initial value
// of the cart state using setCart.
  useEffect(() => {
    let existingCartItem = localStorage.getItem("cart");
    if (existingCartItem) setCart(JSON.parse(existingCartItem));
  }, []);


//component returns JSX. It wraps the children components (which are passed as props) with the CartContext.Provider
  return (
    <CartContext.Provider value={[cart, setCart]}>
      {children}
    </CartContext.Provider>
  );
};

// custom hook.. can be used in other components to access the cart state and setCart function.
const useCart = () => useContext(CartContext);

export { useCart, CartProvider };
