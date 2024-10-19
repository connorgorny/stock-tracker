const express = require('express');
const axios = require('axios');
const path = require('path');
require('dotenv').config();  // Load API keys from .env

const app = express();
const port = process.env.PORT || 3000;

// Serve static files from the 'frontend' directory
app.use(express.static(path.join(__dirname, 'frontend')));

// Route to fetch stock data from Alpaca
app.get('/trades', async (req, res) => {
    const symbol = req.query.symbol.toUpperCase(); // Convert to uppercase for consistency
    const API_KEY = process.env.APCA_API_KEY_ID;
    const API_SECRET = process.env.APCA_API_SECRET_KEY;

    console.log("Fetching data for symbol:", symbol);

    try {
        const response = await axios.get(`https://data.alpaca.markets/v2/stocks/${symbol}/trades/latest`, {
            headers: {
                'APCA-API-KEY-ID': API_KEY,
                'APCA-API-SECRET-KEY': API_SECRET
            }
        });

        console.log("Data fetched:", response.data);  // Log the response from Alpaca
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching trades:', error.response?.data || error.message);
        res.status(500).json({ error: 'Failed to fetch trades', details: error.response?.data });
    }
});

// Catch all other routes and serve index.html
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'index.html'));
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});