import axios from "axios";

const localHostUrl = "http://localhost:2000";
const backendURL = "https://memories-app-mern-app.onrender.com";

const baseUrl = window.location.hostname === "localhost" ? localHostUrl : backendURL;

const axiosInstance = axios.create({
	baseURL: `${baseUrl}/api/v1`,
});

axiosInstance.interceptors.request.use((req) => {
	if (localStorage.getItem("profile")) {
		req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem("profile")).token}`;
	}
	return req;
});

export default axiosInstance;
