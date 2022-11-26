import React, { useState, useEffect } from "react";
import {
  addCurrencyRow,
  addAmount,
  addAmountTwo,
  addConversionResultTwo,
  removeInputOne,
} from "./Store/currencyRowSlice";
import { useDispatch, useSelector } from "react-redux";

export default function CurrencyRow(props) {
  const newCurrency = useSelector((state) => state.currencyRow);
  const [inputVal, setInputVal] = useState("");
  const { currencyOptions } = props;

  useEffect(() => {
    if (
      newCurrency.amount !== 0 &&
      newCurrency.conversionResult !== "" &&
      newCurrency.inputOne === true
    ) {
      setInputVal("");
    } else if (
      newCurrency.inputOne === true &&
      newCurrency.conversionResultTwo !== "" &&
      newCurrency.conversionResultTwo !== 0 &&
      newCurrency.amountTwo !== ""
    ) {
      setInputVal(newCurrency.conversionResultTwo);
    }else if (newCurrency.inputOne === false &&
      newCurrency.conversionResultTwo !== "" &&
      newCurrency.conversionResultTwo !== 0 &&
      newCurrency.amountTwo !== ""){
        setInputVal(newCurrency.conversionResultTwo);
    }
  }, [newCurrency]);

  const dispatch = useDispatch();

  const getSelected = (e) => {
    if (!e.target.value) {
      dispatch.addCurrencyRow("USD");
      return;
    }
    dispatch(addCurrencyRow(e.target.value));
  };

  const handleInputChange = (e) => {
    setInputVal(e.target.value);
    dispatch(addAmount(e.target.value));
  };
  const handleMouse = (e) => {
    if (newCurrency.amountTwo !== 0 && newCurrency.conversionResultTwo !== 0) {
      dispatch(removeInputOne(false));
      dispatch(addConversionResultTwo(""));
      dispatch(addAmountTwo(0));
    } else if (
      newCurrency.AmountTwo === 0 &&
      newCurrency.conversionResultTwo === 0
    ) {
      dispatch(removeInputOne(false));
    }
  };

  return (
    <>
      <input
        type="number"
        className="input"
        value={inputVal}
        onChange={handleInputChange}
        onMouseDown={handleMouse}
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
