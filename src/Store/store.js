import { configureStore } from "@reduxjs/toolkit";
import currencyRowReducer from "./currencyRowSlice";

export default configureStore({
  reducer: {
    currencyRow: currencyRowReducer,
  },
});
