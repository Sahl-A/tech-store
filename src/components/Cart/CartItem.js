import React from "react";
import { FaAngleUp, FaAngleDown } from "react-icons/fa";

export default function CartItem({ id, price, title, image, amount }) {
  return (
    <article className="cart-item">
      <img src={image} alt={title} />
      <div>
        <h4>{title}</h4>
        <h5>${price}</h5>
        <button
          type="button"
          className="cart-btn remove-btn"
          onClick={() => {
            console.log("item removed");
          }}
        >
          remove
        </button>
      </div>
      <div>
        <button
          type="button"
          className="cart-btn amount-btn"
          onClick={() => {
            console.log("Amount Increased");
          }}
        >
          <FaAngleUp />
        </button>
        <p className="item-amount">{amount}</p>
        <button
          type="button"
          className="cart-btn amount-btn"
          onClick={() => {
            console.log("Amount Decreased");
          }}
        >
          <FaAngleDown />
        </button>
      </div>
    </article>
  );
}
