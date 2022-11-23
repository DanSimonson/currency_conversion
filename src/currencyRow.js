import React, { useState, useEffect } from "react";
import { addCurrencyRow, addAmount } from "./Store/currencyRowSlice";
import { useDispatch, useSelector } from "react-redux";

export default function CurrencyRow(props) {
  const newCurrency = useSelector((state) => state.currencyRow);
  const [inputVal, setInputVal] = useState("");
  const {
    currencyOptions,
  } = props;

  useEffect(() => {
    if(newCurrency.conversionResultTwo){
      setInputVal(newCurrency.conversionResultTwo)
    }
  }, [newCurrency])

  const dispatch = useDispatch();

  const getSelected = (e) => {
    if(!e.target.value){
      dispatch.addCurrencyRow('USD')
      return;
    }
    dispatch(addCurrencyRow(e.target.value));
  };

  const handleInputChange = (e) => {
    setInputVal(e.target.value)
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