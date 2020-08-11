import React from "react";
import URL from "../utils/URL";
import axios from "axios";
import { featuredProducts, flattenImageUrl } from "../utils/helpers";

export const ProductContext = React.createContext();

export const ProductProvider = ({ children }) => {
  // Set the needed values
  const [loading, setLoading] = React.useState(false);
  const [products, setProducts] = React.useState([]);
  const [featured, setFeatured] = React.useState([]);

  // Get the data from the server
  React.useEffect(() => {
    setLoading(true);
    axios.get(`${URL}/products`).then((res) => {
      const flattendData = flattenImageUrl(res.data);
      setProducts(flattendData);
      setFeatured(featuredProducts(flattendData));
      setLoading(false);
    });
    return () => {};
  }, []);
//   console.log(`rendering... [ProductProvider]`)
  return (
    <ProductContext.Provider value={{ loading, products, featured }}>
      {children}
    </ProductContext.Provider>
  );
};
