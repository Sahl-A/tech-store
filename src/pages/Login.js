import React from "react";

export default function Login() {
  // Set the state values
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [username, setUsername] = React.useState("default");
  const [isMember, setIsMember] = React.useState(true);

  // Handle when submitted
  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  // When click to toggle member
  const toggleMember = (e) => {
    e.preventDefault();
    setIsMember(!isMember);
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
            onChange={(e) => e.target.value}
          />
        </div>
        <div className="form-control">
          <label htmlFor="password">password</label>
          <input
            type="text"
            id="password"
            value={password}
            onChange={(e) => e.target.value}
          />
        </div>
        {isMember ? null : (
          <div className="form-control">
            <label htmlFor="username">username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => e.target.value}
            />
          </div>
        )}
        <p className="form-empty">Please fill out all the form fields</p>
        {/* Submit button */}
        {isMember ? (
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
              <button onClick={toggleMember}>
                Click Here
              </button>
            </p>
          </>
        ) : (
          <>
            <p className="register-link">
              Need to register
              <button onClick={toggleMember}>
                Click Here
              </button>
            </p>
          </>
        )}
      </form>
    </section>
  );
}
