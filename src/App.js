import React, { useEffect, useState } from "react";
import "./App.css";
import CurrencyRow from "./currencyRow";
import CurrencyRowTwo from "./currencyRowTwo";
import axios from "axios";
import { addConversionResult, addConversionResultTwo } from "./Store/currencyRowSlice.js";
import { useSelector, useDispatch } from "react-redux";
// import useStateData from "./CustomHooks/useStateData";
// import store from "./Store/store";
export default function App() {
  let conversion = {};
  let conversionResult = 0;
  const [currencyOptions, setCurrencyOptions] = useState([]);
  const [currencyResult, setCurrencyResult] = useState("");
  const newCurrency = useSelector((state) => state.currencyRow);
  console.log("app newCurrency: ", newCurrency);
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
    console.log("fromCurrency: ", fromCurrency);
    console.log("toCurrency: ", toCurrency);
    console.log("amount: ", amount);
    console.log("newCurrency.amount: ", newCurrency.amount);
    console.log("newCurrency.amountTwo: ", newCurrency.amountTwo);
    if (newCurrency.amount !== 0) {
      let currencyConversion = await convert(fromCurrency, toCurrency, amount);
      let currencyConversionResult = Number(currencyConversion.result);
      dispatch(addConversionResult(currencyConversionResult));
    } else {
      //change for backward conversion
      let currencyConversion = await convert(toCurrency, fromCurrency, newCurrency.amountTwo);
      let currencyConversionResultTwo = Number(currencyConversion.result);
      dispatch(addConversionResultTwo(currencyConversionResultTwo));
    }
  };

  return (
    <>
      <h1>Convert</h1>
      <main id="box">
        <div className="firstCol">
          <CurrencyRow currencyOptions={currencyOptions} />
          {/* <button onClick={getNewCurrency}>convertCurrency</button> */}
        </div>
        <div className="secondCol">
          <div className="equals">=</div>
        </div>
        <div className="thirdCol">
          <CurrencyRowTwo
            currencyOptions={currencyOptions}
            conversionResult={conversionResult}
          />
        </div>
      </main>
    </>
  );
}
