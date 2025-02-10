import { createSlice } from '@reduxjs/toolkit';

export const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    value: 0,
  },
  reducers: {
    ADD: (state) => {
      state.value += 1;
    },
    SUBTRACT: (state) => {
      state.value -= 1;
    },
  },
});

export const { ADD, SUBTRACT } = counterSlice.actions;
