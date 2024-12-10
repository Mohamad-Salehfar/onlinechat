import { createSlice } from "@reduxjs/toolkit";

const loadUser = () => {
  const savedUser = localStorage.getItem("getUser");
  return (
    JSON.parse(savedUser) || {
      message: [],
      userName: "guest",
    }
  );
};
const saveUser = (user) => {
  localStorage.setItem("getUser", JSON.stringify(user));
};

const initialState = {
  user: loadUser(),
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    updated: (state, action) => {
      state.user.message.push(action.payload);
      saveUser(state.user);
    },
    deleteMessage: (state, action) => {
      const messageId = action.payload;
      state.user.message = state.user.message.filter(
        (msg) => msg.id !== messageId
      );
      saveUser(state.user);
    },
    addUserName: (state, action) => {
      state.user.userName = action.payload;
      saveUser(state.user);
    },
  },
});

export const { updated, deleteMessage, addUserName } = chatSlice.actions;
export default chatSlice.reducer;
