import axios from "axios";

export default axios.create({
    baseURL: "http://ip/",
    mode: 'no-cors'
});