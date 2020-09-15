import axios from "axios";

export default axios.create({
    baseURL: "http://ip/",
    /*headers:{ authorization: "JWT fefege..",
        Accept:  "multipart/form-data" ,
        "Content-Type": "multipart/form-data" }*/
    headers: {
        "Content-type": "application/json"
    }
});