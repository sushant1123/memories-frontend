import axios from "axios";

const localHostUrl = "http://localhost:2000";
const herokuhosturl = "https://memories-app-mern-app.herokuapp.com";

const baseUrl = window.location.hostname === "localhost" ? localHostUrl : herokuhosturl;

const axiosInstance = axios.create({
	baseURL: `${baseUrl}/api/v1`,
});

export default axiosInstance;
