import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";

interface CounterState {
  value: number;
}

const initialState: CounterState = {
  value: 0,
};

export const storeSlice = createSlice({
  name: "store",
  initialState,
  reducers: {
    registerNewUser: (state) => {
      return state;
    },
  },
});

export const { registerNewUser } = storeSlice.actions;

export default storeSlice.reducer;
