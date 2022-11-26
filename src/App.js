import React, { useEffect, useState } from "react";
import "./App.css";
import CurrencyRow from "./currencyRow";
import CurrencyRowTwo from "./currencyRowTwo";
import axios from "axios";
import {
  addConversionResult,
  addConversionResultTwo,
} from "./Store/currencyRowSlice.js";
import { useSelector, useDispatch } from "react-redux";

export default function App() {
  const [currencyOptions, setCurrencyOptions] = useState([]);
  // const [currencyResult, setCurrencyResult] = useState("");
  const newCurrency = useSelector((state) => state.currencyRow);
  const dispatch = useDispatch();

  useEffect(() => {
    axios.get("https://api.exchangerate.host/latest?base=USD").then((res) => {
      setCurrencyOptions([res.data.base, ...Object.keys(res.data.rates)]);
    });
  }, []);
  useEffect(() => {
    getNewCurrency();
  }, [newCurrency]);

  const convert = async (from, to, amount) => {
    const API_URL = `https://api.exchangerate.host/convert?from=${from}&to=${to}&amount=${amount}`;
    let result = await axios.get(API_URL);
    return result.data;
  };
  const getNewCurrency = async () => {
    try {
      if (
        newCurrency.currencyValue === "" &&
        newCurrency.currencyValueTwo !== ""
      ) {
        convertAndStore(
          currencyOptions[0],
          newCurrency.currencyValueTwo,
          Number(newCurrency.amount)
        );
      } else if (
        newCurrency.currencyValue !== "" &&
        newCurrency.currencyValueTwo === ""
      ) {
        convertAndStore(
          newCurrency.currencyValue,
          currencyOptions[0],
          Number(newCurrency.amount)
        );
      } else if (
        newCurrency.currencyValue !== "" &&
        newCurrency.currencyValueTwo !== ""
      ) {
        convertAndStore(
          newCurrency.currencyValue,
          newCurrency.currencyValueTwo,
          Number(newCurrency.amount)
        );
      } else if (
        newCurrency.currencyValue === "" &&
        newCurrency.currencyValueTwo === ""
      ) {
        convertAndStore(
          currencyOptions[0],
          currencyOptions[0],
          Number(newCurrency.amount)
        );
      }
    } catch (error) {
      console.log("error: ", error.message);
    }
  };

  const convertAndStore = async (fromCurrency, toCurrency, amount) => {
    if (newCurrency.amount !== 0) {
      let currencyConversion = await convert(fromCurrency, toCurrency, amount);
      let currencyConversionResult = Number(currencyConversion.result);
      dispatch(addConversionResult(currencyConversionResult));
    } else {
      //change for backward conversion
      let currencyConversion = await convert(
        toCurrency,
        fromCurrency,
        newCurrency.amountTwo
      );
      let currencyConversionResultTwo = Number(currencyConversion.result);
      dispatch(addConversionResultTwo(currencyConversionResultTwo));
    }
  };

  return (
    <>
      <h1>Currency Conversion</h1>
      <main id="box">
        <div className="firstCol">
          <CurrencyRow currencyOptions={currencyOptions} />
        </div>
        <div className="secondCol">
          <div className="equals">=</div>
        </div>
        <div className="thirdCol">
          <CurrencyRowTwo currencyOptions={currencyOptions} />
        </div>
      </main>
    </>
  );
}
