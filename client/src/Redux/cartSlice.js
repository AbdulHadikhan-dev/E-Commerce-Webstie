import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProduct: (state, action) => {
      state.value.push(action.payload);
    },
    addQuantity: (state, action) => {
      const index = state.value.findIndex((item) => {
        return item._id === action.payload._id;
      });
      if (index !== -1) {
        console.log(action.payload);
        state.value[index].quantity += action.payload.quantity[0];
      } else {
        state.value.push(action.payload);
      }
    },
    clearCart: (state) => {
      state.value = [];
    },
    decrement: (state, action) => {
      const index = state.value.findIndex((item) => {
        return item._id === action.payload._id;
      });
      if (index !== -1 && state.value[index].quantity > 1) {
        state.value[index].quantity -= 1;
      }
    },
    increment: (state, action) => {
      const index = state.value.findIndex((item) => {
        return item._id === action.payload._id;
      });
      if (index !== -1) {
        state.value[index].quantity += 1;
      }
    },
    removeProduct: (state, action) => {
      const newArr = state.value.filter((item) => {
        return item._id !== action.payload._id;
      });
      state.value = newArr;
    },
    updateQuantity: (state, action) => {
      const index = state.value.findIndex((item) => {
        return item._id === action.payload._id;
      });
      if (index !== -1) {
        state.value[index].quantity = action.payload.newQuantity;
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const { addProduct, addQuantity, decrement, increment, removeProduct, updateQuantity } =
  cartSlice.actions;

export default cartSlice.reducer;
