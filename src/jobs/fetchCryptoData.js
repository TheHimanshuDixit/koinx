const schedule = require("node-schedule");
const { fetchCryptoData } = require("../services/coingeckoService");
const Crypto = require("../models/Crypto");

async function job() {
  console.log("Running job to fetch crypto data...");
  try {
    const data = await fetchCryptoData();

    const coins = Object.keys(data);
    for (const coin of coins) {
      const crypto = new Crypto({
        coinId: coin,
        price: data[coin].usd,
        marketCap: data[coin].usd_market_cap,
        change24h: data[coin].usd_24h_change,
      });
      await crypto.save();
    }

    console.log("Crypto data saved successfully.");
  } catch (error) {
    console.error("Error in job:", error.message);
  }
}

function scheduleJob() {
  console.log("Scheduling job to run every 2 hours...");
  schedule.scheduleJob("0 */2 * * *", job); // Runs every 2 hours
}

module.exports = { scheduleJob };
