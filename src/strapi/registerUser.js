import axios from "axios";
import url from "../utils/URL";

export default async ({ username, email, password }) => {
  // Post the data to the server
  const response = await axios
    .post(`${url}/auth/local/register`, {
      username,
      email,
      password,
    })
    .catch((err) =>  alert(`Error:${err}`));
  return response;
};
