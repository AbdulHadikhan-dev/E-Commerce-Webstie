import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [],
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setAllProduct: (state, action) => {
      state.value = action.payload
    },
    addProduct: (state, action) => {
      state.value.push(action.payload)
    },
    updateProduct: (state, action) => {
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
    removeProduct: (state, action) => {
      const newArr = state.value.filter((item) => {
        return item.id !== action.payload.id;
      });
      state.value = newArr;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setAllProduct,
  addProduct,
  updateProduct,
  removeProduct,
} = productSlice.actions;

export default productSlice.reducer;
