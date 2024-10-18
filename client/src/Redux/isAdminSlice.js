import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: false,
};

export const counterSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    createdAdmin: (state) => {
      state.value = true;
    },
  },
});

// Action creators are generated for each case reducer function
export const { createdAdmin } = counterSlice.actions;

export default counterSlice.reducer;
