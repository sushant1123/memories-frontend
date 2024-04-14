import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = {
  authData: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    getUserAuth(state, action) {
      localStorage.setItem("profile", JSON.stringify({ ...action?.payload }));
      return { ...state, authData: action?.payload };
    },
    logoutUser(state, action) {
      localStorage.removeItem("profile");
      return { ...state, authData: null };
    },
  },
});

// `createSlice` automatically generated action creators with these names.
// export them as named exports from this "slice" file
export const { getUserAuth, logoutUser } = authSlice.actions;

// Export the slice reducer as the default export
export default authSlice.reducer;
