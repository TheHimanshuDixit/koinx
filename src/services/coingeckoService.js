const axios = require("axios");
const dotenv = require("dotenv");

dotenv.config();

const BASE_URL = process.env.COINGECKO_BASE_URL;
const API_KEY = process.env.COINGECKO_API_KEY;

async function fetchCryptoData() {
  try {
    const { data } = await axios.get(`${BASE_URL}/simple/price`, {
      params: {
        ids: "bitcoin,ethereum,matic-network",
        vs_currencies: "usd",
        include_market_cap: true,
        include_24hr_change: true,
        x_cg_demo_api_key: API_KEY,
      },
    });
    return data;
  } catch (error) {
    console.error("Error fetching data from CoinGecko:", error.message);
    throw error;
  }
}

module.exports = { fetchCryptoData };
