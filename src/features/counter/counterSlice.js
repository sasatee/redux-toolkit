import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  count: 0,
};

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment: (state) => {
      // action
      state.count += 1;
    },
    decrement: (state) => {
      state.count -= 1;
    },

    reset:(state) => {
        state.count=0
    },
    incrementByAmount:(state,action)=>{
        state.count += action.payload
    }
  }, // we will define all our actions
});

export const { increment, decrement,reset,incrementByAmount } = counterSlice.actions;// export actions
export default counterSlice.reducer; // export reducer
