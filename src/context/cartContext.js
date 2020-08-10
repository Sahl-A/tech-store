import React from "react";
import localCart from "../utils/localCart";

export const CartContext = React.createContext();

export const CartProvider = ({ children }) => {
  // Set the needed values
  const [cart, setCart] = React.useState(localCart);
  const [totalPrice, setTotalPrice] = React.useState(0);
  const [cartItems, setCartItems] = React.useState(0);

  // Calculate the totalPrice & the cartItems after each render when cart changes
  React.useEffect(() => {
    // calculate the cartItems
    const newcartItems = cart.reduce(
      (total, cartItem) => (total += cartItem.amount),
      0
    );
    setCartItems(newcartItems);

    // Calculate the totalPrice
    const price = cart.reduce(
      (total, cartItem) => (total += cartItem.amount * cartItem.price),
      0
    );
    setTotalPrice(parseFloat(price.toFixed(2)));
  }, [cart]);
  // set the methods to be used
  // Remove item
  const removeItem = (id) => {};
  // increase amout
  const increaseAmount = (id) => {};
  // decrease amout
  const decreaseAmount = (id) => {};
  // Add to cart
  const addToCart = (product) => {};
  // Clear Cart
  const clearCart = () => {};

  return (
    <CartContext.Provider value={{ cart, totalPrice, cartItems }}>
      {children}
    </CartContext.Provider>
  );
};
