import { createSlice } from "@reduxjs/toolkit";

interface IState {
  data: any[];
}

const initialState: IState = {
  data: [],
};

const chatSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setChatData: (state, action) => {
      state.data = action.payload;
    },
  },
});

export default chatSlice.reducer;
export const { setChatData } = chatSlice.actions;
