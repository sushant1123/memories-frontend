import * as api from "../../api/index.api";
import { USER_AUTH } from "../constants/auth.constants";

//action creators
export const signup = (formData, navigate) => async (dispatch) => {
	try {
		//signup the user
		const { data } = await api.signUp(formData);

		dispatch({ type: USER_AUTH, payload: data });
		//navigate to the home page
		navigate("/");
	} catch (error) {
		console.log(error);
	}
};

export const signin = (formData, navigate) => async (dispatch) => {
	try {
		//signin the user
		const { data } = await api.signIn(formData);
		dispatch({ type: USER_AUTH, payload: data });

		//navigate to the home page
		navigate("/");
	} catch (error) {
		console.log(error);
	}
};
