import React from "react";
import { CartContext } from "../context/cartContext";

export default function Cart() {
  const { cart, total, cartItems } = React.useContext(CartContext);
  return <h1>hello from cart page</h1>;
}
