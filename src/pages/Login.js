import React from "react";
// strapi functions
import registerUser from "../strapi/registerUser";
import loginUser from "../strapi/loginUser";
// context
import { UserContext } from "../context/userContext";
import { useHistory } from "react-router-dom";

export default function Login() {
  // Get the context value
  const { userLogin } = React.useContext(UserContext);

  // Get the history
  const history = useHistory();

  // Set the state values
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [username, setUsername] = React.useState("default");
  const [isMember, setIsMember] = React.useState(true);

  // check validation if fields are empty
  const isEmpty = !email || !password || !username;

  // Handle when submitted
  const handleSubmit = async (e) => {
    e.preventDefault();
    let response;
    // Handle https request
    if (isMember) {
      // run login logic
      response = await loginUser({ email, password });
    } else {
      // run register logic
      response = await registerUser({ username, password, email });
    }
    // Handle response
    if (response) {
      console.log("success", response);
      const {
        jwt: token,
        user: { username },
      } = response.data;
      // Pass the user data to the context
      userLogin({ token, username });
      // Direct the page to /products
      history.push('/products')
    } else {
      // alert Error
    }
  };

  // When click to toggle member
  const toggleMember = (e) => {
    e.preventDefault();
    setIsMember(!isMember);
    // Remove the default value if user is not member
    isMember ? setUsername("") : setUsername("default");
  };

  return (
    <section className="form section">
      <h2 className="section-title">{isMember ? "sign in" : "register"}</h2>
      <form className="login-form">
        {/* Single input */}
        <div className="form-control">
          <label htmlFor="email">email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-control">
          <label htmlFor="password">password</label>
          <input
            type="text"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {isMember ? null : (
          <div className="form-control">
            <label htmlFor="username">username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
        )}
        {/* Show validation msg if fields are empty */}
        {isEmpty ? (
          <p className="form-empty">Please fill out all the form fields</p>
        ) : null}
        {/* Submit button */}
        {!isEmpty ? (
          <button
            className="btn btn-primary btn-block"
            type="submit"
            onClick={handleSubmit}
          >
            Submit
          </button>
        ) : null}
        {/* Check wheather a member */}
        {isMember ? (
          <>
            <p className="register-link">
              Already A member
              <button onClick={toggleMember}>Click Here</button>
            </p>
          </>
        ) : (
          <>
            <p className="register-link">
              Need to register
              <button onClick={toggleMember}>Click Here</button>
            </p>
          </>
        )}
      </form>
    </section>
  );
}
