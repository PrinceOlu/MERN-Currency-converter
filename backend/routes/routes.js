const express = require("express");
const Router = express.Router();
const axios = require("axios");
const API_URL = 'https://v6.exchangerate-api.com/v6';
const API_KEY = process.env.EXCHANGE_RATE_API;

Router.post("/convert", async (req, res) => {
    try {
        const { from, to, amount } = req.body;
        console.log({ from, to, amount });
        
        // construct the API URL
        const url = `${API_URL}/${API_KEY}/pair/${from}/${to}/${amount}`;
        
        // Fetch conversion data
        const response = await axios.get(url);
        
        if (response.data && response.data.result === 'success') {
            return res.json({
                base: from,
                target: to,
                conversionRate: response.data.conversion_rate,
                convertedAmount: response.data.conversion_result,
            });
        } else {
            return res.json({
                message: "Error Converting currency",
                details: response.data,
            });
        }
    } catch (error) {
        console.error(error); // Log the error for debugging
        return res.status(500).send("Something went wrong!");
    }
});

module.exports = Router;
