# Cryptocurrency Data Fetcher

This project is a Node.js-based server application that fetches cryptocurrency data from the CoinGecko API, stores it in MongoDB, and provides APIs for retrieving the data. It includes functionality for fetching the current price, market cap, and 24-hour change of specific cryptocurrencies and calculating the standard deviation of the price over the last 100 records.

## Features

1. **Background Service**:
   - Fetches the current price, market cap, and 24-hour change for Bitcoin, Ethereum, and Matic every 2 hours.
   - Stores this data in a MongoDB database.

2. **APIs**:
   - `/stats`: Fetch the latest data for a specific cryptocurrency.
   - `/deviation`: Calculate the standard deviation of the last 100 price records for a specific cryptocurrency.

---

## Prerequisites

1. **Node.js**: Ensure you have Node.js installed (version 16 or above is recommended).
2. **MongoDB**: A running instance of MongoDB.
3. **CoinGecko API Key**: Sign up at [CoinGecko](https://www.coingecko.com) and obtain an API key (if required).

---

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/cryptocurrency-data-fetcher.git
   cd cryptocurrency-data-fetcher
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   - Create a `.env` file in the root directory.
   - Add the following variables:
     ```env
     PORT=3000
     MONGODB_URI=mongodb://localhost:27017/cryptoDB
     COINGECKO_API_KEY=your-api-key-here
     ```

4. Start the server:
   ```bash
   npm start
   ```

   The server will start on `http://localhost:3000`.

5. (Optional) Run background jobs manually for testing:
   ```bash
   npm run job
   ```

---

## API Endpoints

### 1. `/stats`
Fetch the latest data for a specific cryptocurrency.

- **Method**: `GET`
- **Query Parameters**:
  - `coin`: The cryptocurrency ID (`bitcoin`, `ethereum`, or `matic-network`).

- **Example Request**:
  ```bash
  curl "http://localhost:3000/api/stats?coin=bitcoin"
  ```

- **Sample Response**:
  ```json
  {
    "price": 40000,
    "marketCap": 800000000,
    "24hChange": 3.4
  }
  ```

### 2. `/deviation`
Calculate the standard deviation of the last 100 price records for a specific cryptocurrency.

- **Method**: `GET`
- **Query Parameters**:
  - `coin`: The cryptocurrency ID (`bitcoin`, `ethereum`, or `matic-network`).

- **Example Request**:
  ```bash
  curl "http://localhost:3000/api/deviation?coin=bitcoin"
  ```

- **Sample Response**:
  ```json
  {
    "deviation": 4082.48
  }
  ```

---

## Folder Structure
```
cryptocurrency-data-fetcher/
├── src/
│   ├── models/
│   │   └── Crypto.js        # Mongoose schema for storing cryptocurrency data
│   ├── routes/
│   │   └── index.js         # API routes
│   ├── jobs/
│   │   └── fetchData.js     # Background job for fetching cryptocurrency data
│   ├── utils/
│   │   └── apiClient.js     # Utility for making API calls to CoinGecko
│   └── app.js               # Express app configuration
├── .env                     # Environment variables
├── package.json             # Project metadata and dependencies
├── README.md                # Project documentation
└── server.js                # Entry point for the server
```

---

## Running Tests

To test the APIs:
1. Use a tool like Postman or cURL to send requests to the server.
2. Verify the responses for `/stats` and `/deviation` endpoints.
3. Check the database records to ensure data is being stored correctly by the background job.

---

## Troubleshooting

- **MongoDB Connection Issues**:
  Ensure MongoDB is running and the `MONGODB_URI` in `.env` is correct.

- **CoinGecko API Issues**:
  Check if your API key is valid and you haven't exceeded the rate limits.

- **Server Not Starting**:
  Verify all dependencies are installed and the `.env` file is correctly configured.

---

## Future Enhancements

1. Add user authentication for accessing APIs.
2. Enhance error handling for API calls and database operations.
3. Implement additional cryptocurrency statistics (e.g., volume, historical data).
