// store.js

import { createSlice, configureStore } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLogin: false,
    token: localStorage.getItem("token") || null,
  },
  reducers: {
    login(state, action) {
      state.isLogin = true;
      state.token = action.payload;
      localStorage.setItem("token", action.payload);
    },
    logout(state) {
      state.isLogin = false;
      state.token = null;
      localStorage.removeItem("token");
    },
  },
});

export const authActions = authSlice.actions;

// dispatch an action to set the initial state with the token from local storage
const preloadedState = {
  auth: {
    isLogin: !!localStorage.getItem("token"),
    token: localStorage.getItem("token"),
  },
};

export const store = configureStore({
  reducer: authSlice.reducer,
  preloadedState,
});
