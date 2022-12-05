import React, { useEffect, useState } from "react";
import "./App.css";
import CurrencyInput from "./CurrencyInput";
import axios from "axios";

export default function App() {
  const [amount1, setAmount1] = useState(1);
  const [amount2, setAmount2] = useState(1);
  const [amount3, setAmount3] = useState(1);
  const [amount4, setAmount4] = useState(1);
  const [currency1, setCurrency1] = useState("USD");
  const [currency2, setCurrency2] = useState("AUD");
  const [currency3, setCurrency3] = useState("PHP");
  const [currency4, setCurrency4] = useState("CAD");
  const [currencyOptions, setCurrencyOptions] = useState([]);

  //return currencies from API using axios
  useEffect(() => {
    axios.get("https://api.exchangerate.host/latest?base=USD").then((res) => {
      // setCurrencyOptions([res.data.base, ...Object.keys(res.data.rates)]);
      setCurrencyOptions(res.data.rates);
    });
  }, []);

  function format(number) {
    return number.toFixed(4);
  }

  function handleAmount1Change(amount1) {
    setAmount2(
      format(
        (amount1 * currencyOptions[currency2]) / currencyOptions[currency1]
      )
    );
    setAmount3(
      format(
        (amount1 * currencyOptions[currency3]) / currencyOptions[currency1]
      )
    );
    setAmount4(
      format(
        (amount1 * currencyOptions[currency4]) / currencyOptions[currency1]
      )
    );

    setAmount1(amount1);
  }

  function handleCurrency1Change(currency1) {
    setAmount2(
      format(
        (amount1 * currencyOptions[currency2]) / currencyOptions[currency1]
      )
    );
    setAmount3(
      format(
        (amount1 * currencyOptions[currency3]) / currencyOptions[currency1]
      )
    );
    setAmount4(
      format(
        (amount1 * currencyOptions[currency4]) / currencyOptions[currency1]
      )
    );
    setCurrency1(currency1);
  }

  function handleAmount2Change(amount2) {
    setAmount1(
      format(
        (amount2 * currencyOptions[currency1]) / currencyOptions[currency2]
      )
    );
    setAmount3(
      format(
        (amount2 * currencyOptions[currency3]) / currencyOptions[currency2]
      )
    );
    setAmount4(
      format(
        (amount2 * currencyOptions[currency4]) / currencyOptions[currency2]
      )
    );
    setAmount2(amount2);
  }

  function handleCurrency2Change(currency2) {
    setAmount1(
      format(
        (amount2 * currencyOptions[currency1]) / currencyOptions[currency2]
      )
    );
    setAmount3(
      format(
        (amount2 * currencyOptions[currency3]) / currencyOptions[currency2]
      )
    );
    setAmount4(
      format(
        (amount2 * currencyOptions[currency4]) / currencyOptions[currency2]
      )
    );
    setCurrency2(currency2);
  }

  function handleAmount3Change(amount3) {
    setAmount1(
      format(
        (amount3 * currencyOptions[currency1]) / currencyOptions[currency3]
      )
    );
    setAmount2(
      format(
        (amount3 * currencyOptions[currency2]) / currencyOptions[currency3]
      )
    );
    setAmount4(
      format(
        (amount3 * currencyOptions[currency4]) / currencyOptions[currency3]
      )
    );

    setAmount3(amount3);
  }
  function handleCurrency3Change(currency3) {
    setAmount1(
      format(
        (amount3 * currencyOptions[currency1]) / currencyOptions[currency3]
      )
    );
    setAmount2(
      format(
        (amount3 * currencyOptions[currency2]) / currencyOptions[currency3]
      )
    );
    setAmount4(
      format(
        (amount3 * currencyOptions[currency4]) / currencyOptions[currency3]
      )
    );

    setCurrency3(currency3);
  }
  function handleAmount4Change(amount4) {
    setAmount1(
      format(
        (amount4 * currencyOptions[currency1]) / currencyOptions[currency4]
      )
    );
    setAmount2(
      format(
        (amount4 * currencyOptions[currency2]) / currencyOptions[currency4]
      )
    );
    setAmount3(
      format(
        (amount4 * currencyOptions[currency3]) / currencyOptions[currency4]
      )
    );

    setAmount4(amount4);
  }
  function handleCurrency4Change(currency4) {
    setAmount1(
      format(
        (amount4 * currencyOptions[currency1]) / currencyOptions[currency4]
      )
    );
    setAmount2(
      format(
        (amount4 * currencyOptions[currency2]) / currencyOptions[currency4]
      )
    );
    setAmount3(
      format(
        (amount4 * currencyOptions[currency3]) / currencyOptions[currency4]
      )
    );
    setCurrency4(currency4);
  }

  return (
    <>
      <h1>Currency Conversion</h1>
      <CurrencyInput
        onAmountChange={handleAmount1Change}
        onCurrencyChange={handleCurrency1Change}
        currencies={Object.keys(currencyOptions)}
        amount={amount1}
        currency={currency1}
      />
      <CurrencyInput
        onAmountChange={handleAmount2Change}
        onCurrencyChange={handleCurrency2Change}
        currencies={Object.keys(currencyOptions)}
        amount={amount2}
        currency={currency2}
      />
      <CurrencyInput
        onAmountChange={handleAmount3Change}
        onCurrencyChange={handleCurrency3Change}
        currencies={Object.keys(currencyOptions)}
        amount={amount3}
        currency={currency3}
      />
      <CurrencyInput
        onAmountChange={handleAmount4Change}
        onCurrencyChange={handleCurrency4Change}
        currencies={Object.keys(currencyOptions)}
        amount={amount4}
        currency={currency4}
      />
    </>
  );
}
