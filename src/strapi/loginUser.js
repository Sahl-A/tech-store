import axios from "axios";
import url from "../utils/URL";

export default async ({ email, password }) => {
  // Post the data to the server
  const response = await axios
    .post(`${url}/auth/local`, {
      identifier: email,
      password,
    })
    .catch((err) => alert(`Error:${err}`));
  return response;
};
