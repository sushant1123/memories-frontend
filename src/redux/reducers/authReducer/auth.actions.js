import * as api from "../../../api/index.api.js";
import { getUserAuth } from "./auth.slice";

//action creators
export const signup = (formData, navigate) => async (dispatch) => {
  try {
    //signup the user
    const { data } = await api.signUp(formData);

    dispatch(getUserAuth(data));
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
    dispatch(getUserAuth(data));

    //navigate to the home page
    navigate("/");
  } catch (error) {
    console.log(error);
  }
};
