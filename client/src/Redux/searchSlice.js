import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: "",
};

export const counterSlice = createSlice({
  name: "seacrh",
  initialState,
  reducers: {
    change: (state, action) => {
      state.value = action.payload;
    },
    reset: (state) => {
      state.value = "";
    },
  },
});

// Action creators are generated for each case reducer function
export const { change, reset } = counterSlice.actions;

export default counterSlice.reducer;
