import React from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../../context/cartContext";

export default function CartLink() {
  const { cartItemsCount } = React.useContext(CartContext);

  return (
    <div className="cart-link-container">
      <Link to="/cart">cart</Link>
      <span className="cart-link-total">{cartItemsCount}</span>
    </div>
  );
}
