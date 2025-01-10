const express = require("express");
const Crypto = require("../models/Crypto");

const router = express.Router();

router.get("/cryptos", async (req, res) => {
  try {
    const data = await Crypto.find().sort({ createdAt: -1 }).limit(10);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch data" });
  }
});

router.get("/stats", async (req, res) => {
  const { coin } = req.query;

  if (!coin || !["bitcoin", "ethereum", "matic-network"].includes(coin)) {
    return res.status(400).json({
      error:
        "Invalid or missing coin parameter. Allowed values: bitcoin, ethereum, matic-network.",
    });
  }

  try {
    // Find the latest entry for the specified coin
    const cryptoData = await Crypto.findOne({ coinId: coin }).sort({
      createdAt: -1,
    });

    if (!cryptoData) {
      return res
        .status(404)
        .json({ error: "No data found for the specified coin." });
    }

    // Respond with the required fields
    res.json({
      price: cryptoData.price,
      marketCap: cryptoData.marketCap,
      "24hChange": cryptoData.change24h,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch data" });
  }
});

router.get("/deviation", async (req, res) => {
  const { coin } = req.query;

  if (!coin || !["bitcoin", "ethereum", "matic-network"].includes(coin)) {
    return res.status(400).json({
      error:
        "Invalid or missing coin parameter. Allowed values: bitcoin, ethereum, matic-network.",
    });
  }

  try {
    // Fetch the last 100 records for the requested coin
    const records = await Crypto.find({ coinId: coin })
      .sort({ createdAt: -1 })
      .limit(100)
      .select("price");

    if (records.length === 0) {
      return res
        .status(404)
        .json({ error: "No data found for the specified coin." });
    }

    // Extract prices from the records
    const prices = records.map((record) => record.price);

    // Calculate mean
    const mean = prices.reduce((sum, price) => sum + price, 0) / prices.length;

    // Calculate standard deviation
    const variance =
      prices.reduce((sum, price) => sum + Math.pow(price - mean, 2), 0) /
      prices.length;
    const deviation = Math.sqrt(variance);

    // Respond with the standard deviation
    res.json({
      deviation: deviation.toFixed(2), // Round to 2 decimal places
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to calculate deviation" });
  }
});

module.exports = router;
