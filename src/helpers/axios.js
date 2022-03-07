import axios from "axios";

const axiosInstance = axios.create({
	baseURL: "https://memories-app-mern-app.herokuapp.com/api/v1",
});

export default axiosInstance;
