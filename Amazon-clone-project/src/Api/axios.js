import axios from "axios";

const axiosInstance = axios.create({
  // baseURL: "http://127.0.0.1:5001/clone-d2915/us-central1/api",
  baseURL: "https://us-central1-clone-d2915.cloudfunctions.net/api",
});

export { axiosInstance };
