import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addCurrencyRowTwo, addAmountTwo } from './redux/currencyRowSlice'

export default function CurrencyRowTwo(props) {
  const newCurrency = useSelector((state) => state.currencyRow);
  const [inputValTwo, setInputValTwo] = useState("");
  const {
    currencyOptions,
  } = props

  useEffect(() => {
    if(newCurrency.conversionResult){
      setInputValTwo(newCurrency.conversionResult)
    }
  }, [newCurrency])

  const dispatch = useDispatch();

  const getSelectedTwo = (e) => {
    dispatch(addCurrencyRowTwo(e.target.value))
  }

  const handleInputChange = (e) => {
    setInputValTwo(e.target.value)
    dispatch(addAmountTwo(e.target.value))
  }

  return (
    <>
      <input
        type="number"
        className="input"
        value={inputValTwo}
        onChange={handleInputChange}
      />
      <select onChange={getSelectedTwo}>
        {currencyOptions.map((option, index) => (
          <option key={index} value={option}>{option}</option>
        ))}
      </select>
    </>
  )
}