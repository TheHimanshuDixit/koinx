const app = require("./app");
const { scheduleJob } = require("./jobs/fetchCryptoData");

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  scheduleJob();
});
