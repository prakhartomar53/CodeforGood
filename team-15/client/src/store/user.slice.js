import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    isLoggedIn: false,
    isLoading: false,
    error: null,
    token: null,
    type: null,
  },
  reducers: {
    loginUser: (state, action) => {
      console.log(action);
      state.userData = action.payload.userData;
      state.token = action.payload.token;
      state.isLoggedIn = true;
      state.type = action.payload.type;
    },
    logoutUser: (state) => {
      state.user = null;
      state.isLoggedIn = false;
    },
  },
});

export const { loginUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;
