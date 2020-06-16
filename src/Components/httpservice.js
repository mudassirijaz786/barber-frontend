import axios from "axios";
import { toast } from "react-toastify";
//import logger from "./logService";

axios.interceptors.response.use(null, (error) => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

  if (!expectedError) {
    //  logger.log(error);
    toast.error("An unexpected error occurrred.");
  }

  return Promise.reject(error);
});

function setJwt(jwt) {
  axios.defaults.headers.common["x-auth-token"] = jwt;
}
// function setHeader() {
//   axios.defaults.headers.common["x-auth-token"] =
//     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTc3YWQ5YjVkNDE1MDIxMDRlOTc2NWEiLCJuYW1lIjoiTmFlZW0gSGFzc2FuICIsImVtYWlsIjoiYWJjZEBnb29nbGUuY29tIiwiaXNBZG1pbiI6dHJ1ZSwiaWF0IjoxNTg0OTc0MjgwfQ.NyZM5h0DXh7WHpPWkYdlNnyyh5EuyYGRsUSHluEJxPw";
// }
export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  setJwt,
};
