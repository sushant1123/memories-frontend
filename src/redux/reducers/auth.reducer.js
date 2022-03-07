import { USER_AUTH, USER_LOGOUT } from "../constants/auth.constants";

const initialAuthState = {
	authData: null,
};

const authReducer = (state = initialAuthState, action) => {
	switch (action.type) {
		case USER_AUTH:
			console.log(action?.payload);
			localStorage.setItem("profile", JSON.stringify({ ...action?.payload }));
			return { ...state, authData: action?.payload };

		case USER_LOGOUT:
			localStorage.removeItem("profile");
			return { ...state, authData: null };

		default:
			return state;
	}
};

export default authReducer;
