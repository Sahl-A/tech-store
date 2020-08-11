import React from "react";
import useLocalStorage from "../hooks/useLocalStorage";

export const CartContext = React.createContext();

export const CartProvider = ({ children }) => {
  // Set the needed values
  // Use the localStorage hook to set the cart
  const [cart, setCart] = useLocalStorage("cart", []);
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
  // set the methods to be used
  // Remove item
  const removeItem = (id) => {
    const newCart = cart.filter((item) => item.id !== id);
    setCart(newCart);
  };
  // increase amout
  const increaseAmount = (id) => {
    const newCart = cart.map((item) =>
      item.id === id ? { ...item, amount: item.amount + 1 } : { ...item }
    );
    setCart(newCart);
  };
  // decrease amout
  const decreaseAmount = (id) => {
    const newCart = cart.map((item) =>
      item.id === id ? { ...item, amount: item.amount - 1 } : { ...item }
    );
    setCart(newCart);
  };
  // Add to cart
  const addToCart = (product) => {
    // Destruct the properties of the received product
    const { title, price, id, image } = product;
    // If the item is in the cart, increment the amount by 1
    const item = cart.find((item) => item.id === id);
    if (item) {
      increaseAmount(id);
      return;
    }
    // Add the Item to the cart
    const newCart = [
      ...cart,
      { title, price, id, amount: 1, image },
    ];
    setCart(newCart);
  };
  // Clear Cart
  /* const clearCart = () => {
    setCart([]);
  }; */

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
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
