import React, { useState, useEffect, useReducer } from "react";
import { addCurrencyRow, addAmount, addConversionResult } from "./Store/currencyRowSlice";
import { useDispatch, useSelector } from "react-redux";

export default function CurrencyRow(props) {
  const newCurrency = useSelector((state) => state.currencyRow);
  const [inputVal, setInputVal] = useState("");
  const [rerender, setRerender] = useState(false);
  let x;
  const [ignored, forceUpdate] = useReducer(x = x + 1, 0)
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
  const handleMouse = (e) => {
    // setRerender(!rerender);
    setInputVal('');
    dispatch(addAmount(0))
    dispatch(addConversionResult(''))
    /*now set inputValTwo = '' and see 
    what happens */
    
  }

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