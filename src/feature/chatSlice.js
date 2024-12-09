import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  message: [],
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    updated: (state, action) => {
      console.log(action.payload);
      state.message.push(action.payload);
    },
  },
});

export const { updated } = chatSlice.actions;
export default chatSlice.reducer;
