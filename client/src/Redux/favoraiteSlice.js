import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [],
};

export const counterSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    addToWishList: (state, action) => {
      state.value.push(action.payload);
    },
    removeFavoriteProduct: (state, action) => {
      const newArr = state.value.filter((item) => {
        return item.id !== action.payload.id;
      });
      state.value = newArr;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addToWishList, removeFavoriteProduct } = counterSlice.actions;

export default counterSlice.reducer;
