import React from "react";
// Router
import { Switch, Route } from "react-router";
// Pages
import About from "./pages/About";
import Cart from "./pages/Cart";
import Error from "./pages/Error";
import Home from "./pages/Home";
import Login from "./pages/Login";
import ProductDetails from "./pages/ProductDetails";
import Products from "./pages/Products";
// Components
import Header from "./components/Header";
import StripeWrapper from "./components/StripeWrapper";
import ScrollButton from './components/ScrollButton';
// Contexts Providers
import { ProductProvider } from "./context/products";
import { CartProvider } from "./context/cartContext";
import { UserProvider } from "./context/userContext";

function App() {
  return (
    <UserProvider>
      <ProductProvider>
        <CartProvider>
          <Header />
          <ScrollButton />
          <Switch>
            <Route exact path="/about">
              <About />
            </Route>
            <Route exact path="/cart">
              <Cart />
            </Route>
            <Route exact path="/checkout">
              <StripeWrapper />
            </Route>
            <Route exact path="/login">
              <Login />
            </Route>
            <Route exact path="/products">
              <Products />
            </Route>
            <Route exact path="/products/:id">
              <ProductDetails />
            </Route>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="*">
              <Error />
            </Route>
          </Switch>
        </CartProvider>
      </ProductProvider>
    </UserProvider>
  );
}

export default App;
