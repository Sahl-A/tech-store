import React from "react";
import useLocalStorageReducer from "../hooks/useLocalStorageReducer";

import cartReducer from "../reducers/cartReducer";
import {
  increase,
  decrease,
  remove,
  addTooCart,
  clearAllCart,
} from "../actions/cartActions";

export const CartContext = React.createContext();

export const CartProvider = ({ children }) => {
  // Set the needed values

  // Use the localStorage hook to set the cart
  const [cart, dispatch] = useLocalStorageReducer(cartReducer, "cart", []);
  const [totalPrice, setTotalPrice] = React.useState(0);
  const [cartItemsCount, setCartItemsCount] = React.useState(0);

  // Calculate the totalPrice & the cartItems after each render when cart changes
  React.useEffect(() => {
    // calculate the cartItems
    const newcartItemsCount = cart.reduce(
      (total, cartItem) => (total += cartItem.amount),
      0
    );
    setCartItemsCount(newcartItemsCount);

    // Calculate the totalPrice
    const price = cart.reduce(
      (total, cartItem) => (total += cartItem.amount * cartItem.price),
      0
    );
    setTotalPrice(parseFloat(price.toFixed(2)));
  }, [cart]);
  // Use useReducer instead of regular context.
  // const [state, dispatch] = React.useReducer(cartReducer, [])
  // set the methods to be used

  // Remove item
  const removeItem = (id) => {
    dispatch({ type: remove, id });
  };
  // increase amout
  const increaseAmount = (id) => {
    dispatch({ type: increase, id });
  };
  // decrease amout
  const decreaseAmount = (id) => {
    dispatch({ type: decrease, id });
  };
  // Add to cart
  const addToCart = (product) => {
    dispatch({ type: addTooCart, product });
  };
  // Clear Cart
  const clearCart = () => {
    dispatch({ type: clearAllCart });
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        totalPrice,
        cartItemsCount,
        removeItem,
        increaseAmount,
        decreaseAmount,
        addToCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
