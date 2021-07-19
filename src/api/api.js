import axios from "axios";

axios.defaults.withCredentials = true; //This is what helps browser to get the cookie

export default axios.create({
  // baseURL: "http://localhost:5000",
  baseURL: "https://pearl-admin.herokuapp.com",
  // baseURL: "https://my-json-server.typicode.com/suhailsajahan/pearlDB",
});
