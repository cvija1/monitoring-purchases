import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import purchaseReducer from "../features/purchases/purchaseSlice";
import noteReducer from "../features/notes/noteSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    purchases: purchaseReducer,
    notes: noteReducer,
  },
});
