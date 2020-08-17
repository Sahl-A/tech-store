import React from "react";
import { useParams, useHistory } from "react-router-dom";
import { ProductContext } from "../context/products";
import { CartContext } from "../context/cartContext";
import Loading from "../components/Loading";

export default function ProductDetails() {
  // Get the products from the products context
  const { products } = React.useContext(ProductContext);
  // Get the addToCar from the CartContext context
  const { addToCart } = React.useContext(CartContext);
  // Get the history to push the page to cart page
  const history = useHistory();
  // Get the id using when routing to this page
  const { id } = useParams();
  // Get current product from all products
  const currProduct = products.find((item) => item.id === parseInt(id));
  // Check if the products array is empty.
  // It happens when we open the ProductDetails page directly
  if (!products.length) return <Loading />;
  // Destruct the needed items from current product
  const {
    image,
    price,
    description,
    title,
  } = currProduct;
  return (
    <section className="single-product">
      <img src={image} alt={title} className="single-product-image" />
      <article>
        <h1>{title}</h1>
        <h2>${price}</h2>
        <p>{description}</p>
        <button
          className="btn btn-primary btn-block"
          onClick={() => {
            // add to cart
            addToCart(currProduct);
            // push to cart page
            history.push("/cart");
          }}
        >
          add to cart
        </button>
      </article>
    </section>
  );
}
