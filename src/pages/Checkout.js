import React from "react";
// Router
import {Redirect} from 'react-router-dom';
// Context
import {UserContext} from '../context/userContext';

export default function Checkout() {
  const {user} = React.useContext(UserContext);

  return (
    <>
    {user.token? null: <Redirect to='/'/>}
      <h1>hello from checkout page</h1>
    </>
  );
}
