import React, { useEffect, useState, useForceUpdate, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCurrencyRowTwo, addAmountTwo } from "./Store/currencyRowSlice";

export default function CurrencyRowTwo(props) {
  const newCurrency = useSelector((state) => state.currencyRow);
  const [inputValTwo, setInputValTwo] = useState("");
  const [rerender, setRerender] = useState(false);
  const { currencyOptions } = props;

  useEffect(() => {
    console.log('in useEffect rowTwo newCurrency ConversionResult: ', newCurrency)
    if (newCurrency.conversionResult) {
      setInputValTwo(newCurrency.conversionResult);
    }
  }, [newCurrency]);

  const dispatch = useDispatch();

  const getSelectedTwo = (e) => {
    dispatch(addCurrencyRowTwo(e.target.value));
  };

  const handleInputChange = (e) => {
    setInputValTwo(e.target.value);
    dispatch(addAmountTwo(e.target.value));
  };

  const handleMouse = (e) => {
    setInputValTwo("");
  };
  

  return (
    <>
      <input
        type="number"
        className="input"
        value={inputValTwo}
        onChange={handleInputChange}
        onMouseDown={handleMouse}
      />
      <select onChange={getSelectedTwo}>
        {currencyOptions.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </>
  );
}
