import { configureStore } from "@reduxjs/toolkit";
import tablesReducer from "./tablesSlice";

export const store = configureStore({
  reducer: {
    tables: tablesReducer,
  },
});

export default store;
