import React, { useState } from "react";
import { addCurrencyRow, addAmount } from "./Store/currencyRowSlice";
import { useDispatch } from "react-redux";

export default function CurrencyRow(props) {
  const [inputVal, SetInputVal] = useState("");
  const {
    currencyOptions,
  } = props;

  const dispatch = useDispatch();

  const getSelected = (e) => {
    if(!e.target.value){
      dispatch.addCurrencyRow('USD')
      return;
    }
    dispatch(addCurrencyRow(e.target.value));
  };

  const handleInputChange = (e) => {
    SetInputVal(e.target.value)
    dispatch(addAmount(e.target.value))
  }

  return (
    <>
      <input
        type="number"
        className="input"
        value={inputVal}
        onChange={handleInputChange}
      />
      <select onChange={getSelected}>
        {currencyOptions.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </>
  );
}