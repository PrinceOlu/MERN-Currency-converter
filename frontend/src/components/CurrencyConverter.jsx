import React, { useState } from "react";
import axios from "axios";
import './CurrencyConverter.css';


//like a dummy database to fetch the currencies
const currencies = [
  { code: "AED", name: "UAE Dirham", country: "United Arab Emirates" },
  { code: "AFN", name: "Afghan Afghani", country: "Afghanistan" },
  { code: "ALL", name: "Albanian Lek", country: "Albania" },
  { code: "AMD", name: "Armenian Dram", country: "Armenia" },
  { code: "USD", name: "United States Dollar", country: "United States" },
  { code: "EUR", name: "Euro", country: "European Union" },
  { code: "NGN", name: "Nigerian Naira", country: "Nigeria" },
  { code: "CAD", name: "Canadian Dollar", country: "Canada" },
];

const CurrencyConverter = () => {
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("NGN");
  const [amount, setAmount] = useState(1);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  // Handler functions for updating all 3 states
  const handleFromChange = (e) => {
    setFrom(e.target.value);
  }
   
  const handleToChange = (e) => {
    setTo(e.target.value);
  }
  const handleAmountChange = (e) => {
    setAmount(e.target.value);
}

  const handleConvert = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/convert", {
        from,
        to,
        amount,
      });
      setResult(response.data);
      setError(null);
    } catch (error) {
      setError("Conversion failed. Please try again.");
    }
  };

  return (
    <div className="converter-container">
      <h1>Currency Converter</h1>
      
      <div className="converter-inputs">
        <select value={from} onChange={handleFromChange}>
          {currencies.map((currency) => (
            <option key={currency.code} value={currency.code}>
              {currency.code} - {currency.name}
            </option>
          ))}
        </select>

        <select value={to} onChange={handleToChange}>
          {currencies.map((currency) => (
            <option key={currency.code} value={currency.code}>
              {currency.code} - {currency.name}
            </option>
          ))}
        </select>

        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={handleAmountChange}
        />
        <button onClick={handleConvert}>Convert</button>
      </div>
      {result && (
        <div className="converter-result">
          <p>
            {amount} {from} = {result.convertedAmount} {to}
          </p>
          <p>Conversion Rate: {result.conversionRate}</p>
        </div>
      )}
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default CurrencyConverter;
