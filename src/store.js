import { configureStore } from "@reduxjs/toolkit";
import chatSlice from "./feature/chatSlice";
export const store = configureStore({
  reducer: {
    chat: chatSlice,
  },
});
