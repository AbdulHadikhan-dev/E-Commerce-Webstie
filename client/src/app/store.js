import { configureStore } from "@reduxjs/toolkit";
import favoraiteSlice from "../Redux/favoraiteSlice";
import cartSlice from "../Redux/cartSlice";
import searchSlice from "../Redux/searchSlice";
import isAdminSlice from "../Redux/isAdminSlice";
import authenticated from "../Redux/authenticated";

export const store = configureStore({
  reducer: {
    favorites: favoraiteSlice,
    cart: cartSlice,
    search: searchSlice,
    admin: isAdminSlice,
    authenticated: authenticated,
  },
});
