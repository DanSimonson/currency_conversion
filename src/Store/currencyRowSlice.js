import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currencyValue: "",
  currencyValueTwo: "",
  amount: 0,
  amountTwo: 0,
  conversionResult: "",
};

const currencyRowSlice = createSlice({
  name: "currencyRow",
  initialState,
  reducers: {
    addCurrencyRow: (state, action) => {
      state.currencyValue = action.payload;
    },

    addCurrencyRowTwo: (state, action) => {
      state.currencyValueTwo = action.payload;
    },

    addAmount: (state, action) => {
    state.amount = action.payload;
    },

    addAmountTwo: (state, action) => {
      state.amountTwo = action.payload;
    },

    addConversionResult: (state, action) => {
      state.conversionResult = action.payload;
    }
  },
});

export const { addCurrencyRow, addCurrencyRowTwo, addAmount, addAmountTwo, addConversionResult } = currencyRowSlice.actions;

export default currencyRowSlice.reducer;