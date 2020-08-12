import React from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/logo.svg";
import CartLink from "../components/Cart/CartLink";
// Context Consumers
import { UserContext } from "../context/userContext";

export default function Header() {
  const { user, userLogout } = React.useContext(UserContext);
  return (
    <header className="header">
      <img src={Logo} alt="vintage tech logo" className="logo" />
      <nav>
        <ul>
          <div>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/products">Products</Link>
            </li>
            {user.token ? (
              <li>
                <Link to="/checkout">Checkout</Link>
              </li>
            ) : null}
          </div>
          <div>
            <li>
              {user.token ? (
                <Link to="/" onClick={userLogout}>
                  Logout
                </Link>
              ) : (
                <Link to="/login">Login</Link>
              )}
            </li>
            <li>
              <CartLink />
            </li>
          </div>
        </ul>
      </nav>
    </header>
  );
}
