import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: false,
};

export const authenticatedSlice = createSlice({
  name: "authenticated",
  initialState,
  reducers: {
    Login: (state) => {
      state.value = true;
    },
    Logout: (state) => {
      state.value = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { Login, logout } = authenticatedSlice.actions;

export default authenticatedSlice.reducer;
