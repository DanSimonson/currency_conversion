import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addCurrencyRowTwo,
  addAmountTwo,
  addAmount,
  addConversionResult,
  removeInputOne,
} from "./Store/currencyRowSlice";

export default function CurrencyRowTwo(props) {
  const newCurrency = useSelector((state) => state.currencyRow);
  const [inputValTwo, setInputValTwo] = useState("");
  const { currencyOptions } = props;

  useEffect(() => {
    
    if (newCurrency.amount !== 0 && newCurrency.conversionResult !== "") {
      setInputValTwo(newCurrency.conversionResult);
    }
    if (
      newCurrency.amount !== 0 &&
      (newCurrency.conversionResult !== "") & (newCurrency.inputOne === true)
    ) {
      setInputValTwo("");
    }
    if (newCurrency.conversionResultTwo !== "" && newCurrency.amountTwo !== 0) {
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
    if (newCurrency.amount !== 0 && newCurrency.conversionResult !== "") {
      dispatch(addAmountTwo(0));
      dispatch(addAmount(0));
      dispatch(addConversionResult(""));
      dispatch(removeInputOne(true));
    }
  };

  return (
    <>
      <input
        type="number"
        className="input"
        value={inputValTwo}
        onChange={handleInputChange}
        onMouseEnter={handleMouse}
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
