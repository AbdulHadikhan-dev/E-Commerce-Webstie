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
        return item.id === action.payload.existingProduct.id;
      });
      if (index !== -1) {
        console.log(action.payload);
        state.value[index].quantity += action.payload.quantity;
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
        return item.id !== action.payload.id;
      });
      state.value = newArr;
    },
    updateQuantity: (state, action) => {
      const index = state.value.findIndex((item) => {
        return item.id === action.payload.item.id;
      });
      if (index !== -1) {
        state.value[index].quantity = action.payload.newQuantity;
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  addProduct,
  addQuantity,
  decrement,
  increment,
  removeProduct,
  updateQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
